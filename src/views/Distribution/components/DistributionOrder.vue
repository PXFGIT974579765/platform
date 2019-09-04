<template>
  <div class="page-order-distribution" v-wechat-title="$route.meta.title">
    <div class="search-block">
      <search placeholder="请输入关键字搜索" v-model="keyword" :light="true" />
    </div>
    <van-tabs
      v-model="active"
      title-active-color="#06bcbf"
      color="#06bcbf"
      background="#f4f4f4"
      line-height="1px"
      :border="false"
      :swipe-threshold="5"
      @click="onClick"
    >
      <van-tab
        v-for="item in statusList"
        :key="item.value"
        :title="item.name"
        :name="item.value"
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
            <div
              v-for="order in distributions"
              :key="order.id"
              class="goods-item"
            >
              <Card :order="order" @onShowDialog="onShowDialog" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <AppraiseDialog
      :showDialog="showDialog"
      :tags="tags"
      :info="appraise"
      @onCancel="onCancel"
    />
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './DistributionOrderCard'
import AppraiseDialog from './AppraiseDialog'

export default {
  components: {
    Search,
    Card,
    AppraiseDialog,
  },
  data() {
    return {
      active: -1,
      showDialog: false,
      keyword: '',
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      name: '全部',
      statusList: [
        {
          name: '全部',
          value: -1,
        },
        {
          name: '取货中',
          value: 0,
        },
        {
          name: '派送中',
          value: 1,
        },
        {
          name: '已完成',
          value: 2,
        },
        {
          name: '待评价',
          value: 3,
        },
      ],
      tags: [],
      distributions: [],
      appraise: {
        createTime: '',
        commContent: '',
        rates: 0,
      }, // 评价对象
    }
  },
  created() {
    this.fetchList({ pageIndex: this.page })
    this.fetchTags()
  },
  methods: {
    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.distributions = []
    },
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, distributions } = this
      if (distributions.length >= count) {
        this.finished = true
      }
    },
    fetchTags() {
      this.$http.get('/api-wxmp/cxxz/comment/tag/list').then(({ data }) => {
        if (data.resp_code === 0) {
          this.tags = data.datas.tags.map(t => ({ tag: t, selected: false }))
        }
      })
    },
    // 拉去订单信息
    fetchList({ pageIndex = 1, pageSize = 10, status }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/distriButtion/order/findMyDistriOrderPage', {
          pageIndex,
          pageSize,
          status,
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
          this.distributions = this.distributions.concat(data.datas.data)

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

      const orderStatus = this.statusList.find(item => item.name == this.name)
        .value
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
      const status = this.statusList.find(item => item.name == title).value

      if (status == -1) {
        this.fetchList({})
      } else {
        this.fetchList({ status })
      }
    },

    // 关掉评价窗口
    onCancel() {
      this.showDialog = false
    },
    // 点击查看评价
    onShowDialog(id) {
      this.$http
        .get('/api-wxmp/cxxz/comment/findComment', {
          params: {
            orderId: id,
          },
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.appraise = {
              ...data.datas,
              commContent: JSON.parse(data.datas.commContent),
            }
            this.showDialog = true
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-distribution {
  .search-block {
    width: 100%;
    height: 55px;
    padding: 13px 20px;
    background-color: #fff;
  }

  .van-pull-refresh {
    overflow: unset;
  }

  .goods-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
