<template>
  <div class="page-order-active" v-wechat-title="$route.meta.title">
    <div class="search-block">
      <search placeholder="请输入关键字搜索" v-model="keyword" :light="true" />
    </div>
    <van-tabs
      v-model="activeTab"
      title-active-color="#06bcbf"
      color="#06bcbf"
      background="#f4f4f4"
      line-height="1px"
      :border="false"
      :swipe-threshold="5"
      @click="onClick"
    >
      <van-tab
        v-for="item in orderStatusList"
        :key="item.value"
        :title="item.name"
      >
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <div v-for="obj in active" :key="obj.id" class="active-item">
              <Card
                :active="obj"
                @cancelOrder="cancelOrder"
                @qrCodeSign="qrCodeSign"
              />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './ActiveOrderCard'

const DEBUG = process.env.VUE_APP_WX_DEBUG === 'true' ? true : false

// 进行签名的时候  Android 不用使用之前的链接， ios 需要
let signUrl = window.location.href.split('#')[0]
if (window.wechaturl !== undefined) {
  signUrl = window.wechaturl
}

export default {
  components: {
    Search,
    Card,
  },
  data() {
    return {
      activeTab: -1,
      isConfiged: false,
      tryCounts: 0,
      keyword: '',
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      name: '全部',
      orderStatusList: [
        {
          name: '全部',
          value: -1,
        },
        {
          name: '进行中',
          value: 1,
        },
        {
          name: '已结束',
          value: 2,
        },
        {
          name: '已取消',
          value: 90,
        },
        {
          name: '待评价',
          value: 50,
        },
      ],
      active: [],
    }
  },
  created() {
    this.fetchList({})
    this.configWx(window.location.href)
  },
  methods: {
    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.active = []
    },
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, active } = this
      if (active.length >= count) {
        this.finished = true
      }
    },
    // 微信 jssdk 配置
    configWx(url) {
      this.tryCounts += 1
      this.$http
        .post('/api-wxmp/cxxz/wx/getMpConfig', {
          url,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            wx.config({
              debug: DEBUG,
              jsApiList: ['scanQRCode', 'chooseWXPay'],
              appId: data.datas.appId,
              timestamp: data.datas.timestamp,
              nonceStr: data.datas.nonceStr,
              signature: data.datas.signature,
            })
            wx.ready(() => {
              this.isConfiged = true
              this.tryCounts = 0
            })
          }
        })
    },
    // 扫码签到
    qrCodeSign(active) {
      if (!this.isConfiged) {
        if (this.tryCounts >= 2) {
          this.$toast.fail('请返回首页进行扫码')
          return
        }

        this.configWx(signUrl)
        return
      }

      wx.checkJsApi({
        jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: res => {
          if (res.errMsg == 'checkJsApi:ok' && res.checkResult['scanQRCode']) {
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
              success: res1 => {
                if (res1 && res1.errMsg == 'scanQRCode:ok') {
                  const result = res1.resultStr // 当needResult 为 1 时，扫码返回的结果
                  const curGoodsId = result.split('?')[1].split('=')[1]
                  this.submitSign(curGoodsId, active)
                }
              },
            })
          } else {
            this.$toast.fail('当前版本不支持')
          }
        },
      })
    },
    // 提交签到信息
    submitSign(curGoodsId, active) {
      if (curGoodsId != active.goodsId) {
        this.$toast.fail('签到活动不一致')
        return
      } else {
        this.$http
          .post('/api-wxmp/cxxz/order/scanOrderHD', {
            goodsId: curGoodsId,
          })
          .then(({ data }) => {
            if (data.resp_code == 0) {
              this.$toast.success('签到成功')
              this.$router.push(`/order/active-detail/${active.orderId}`)
              return
            } else if (data.resp_msg) {
              this.$toast.fail(data.resp_msg)
            } else {
              this.$toast.fail('系统繁忙')
            }
          })
      }
    },
    // 拉去活动信息
    fetchList({ pageIndex = 1, pageSize = 10, status, orderStatus }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/order/pageHD', {
          pageIndex,
          pageSize,
          status,
          orderStatus,
        })
        .then(({ data }) => {
          this.stopLoading()

          if (data.resp_code !== 0) {
            this.error = true
            return
          }

          const { pageIndex, count } = data.datas
          this.page = pageIndex
          this.count = count
          this.active = this.active.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.stopLoading()
        })
    },
    // 上拉加载更多
    onLoad() {
      this.fetchList({ pageIndex: this.page + 1 })
    },

    // 下拉刷新
    onRefresh() {
      this.init()

      const orderStatus = this.orderStatusList.find(
        item => item.name == this.name
      ).value
      this.page = 1

      if (orderStatus == -1) {
        this.fetchList({ pageIndex: this.page })
      } else {
        this.fetchList({ pageIndex: this.page, orderStatus })
      }
    },
    onClick(_, title) {
      if (this.name == title) return

      this.init()
      this.name = title
      const orderStatus = this.orderStatusList.find(item => item.name == title)
        .value

      if (orderStatus == -1) {
        this.fetchList({})
      } else {
        this.fetchList({ orderStatus })
      }
    },
    // 取消活动
    cancelOrder(orderId) {
      this.$router.push(`/order/active-detail/${orderId}`)
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-active {
  .search-block {
    width: 100%;
    height: 55px;
    padding: 13px 20px;
    background-color: #fff;
  }

  .van-pull-refresh {
    overflow: unset;
  }

  .active-item {
    margin: 10px 0;
    width: 100%;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
