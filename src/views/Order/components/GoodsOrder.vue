<template>
  <div class="page-order-goods" v-wechat-title="$route.meta.title">
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
            <div v-for="good in goods" :key="good.id" class="goods-item">
              <Card :goods="good" @cancelOrder="cancelOrder" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './GoodsOrderCard'

export default {
  components: {
    Search,
    Card,
  },
  data() {
    return {
      active: -1,
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
          name: '待付款',
          value: 0,
        },
        {
          name: '待配送',
          value: 1,
        },
        {
          name: '待提货',
          value: 2,
        },
        {
          name: '待评价',
          value: 50,
        },
      ],
      goods: [],
    }
  },
  created() {
    this.fetchList({ pageIndex: this.page })
  },
  methods: {
    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.goods = []
    },
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, goods } = this
      if (goods.length >= count) {
        this.finished = true
      }
    },
    // 拉去商品信息
    fetchList({ pageIndex = 1, pageSize = 10, status, orderStatus }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/order/pageJFSC', {
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
          this.goods = this.goods.concat(data.datas.data)

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
    // 取消订单
    cancelOrder(orderId) {
      this.$router.push(`/order/goods-detail/${orderId}`)
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-goods {
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
