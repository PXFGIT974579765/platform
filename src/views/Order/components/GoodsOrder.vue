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
      <van-tab v-for="item in statusList" :key="item.value" :title="item.name">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="good in goods" :key="good.id" class="goods-item">
            <Card :goods="good" @cancelOrder="cancelOrder" />
          </div>
        </van-list>
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
      finished: false,
      loading: true,
      name: '全部',
      statusList: [
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
          value: 3,
        },
      ],
      goods: [],
    }
  },
  created() {
    this.fetchList({ pageIndex: this.page })
  },
  methods: {
    startFetch() {
      this.finished = false
      this.loading = true
    },
    endFetch() {
      this.finished = true
      this.loading = false
    },
    // 拉去商品信息
    fetchList({ pageIndex = 1, pageSize = 10, status }) {
      this.startFetch()
      this.$http
        .post('/api-wxmp/cxxz/order/pagePTSC', {
          pageIndex,
          pageSize,
          status,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.endFetch()
            this.goods = []
            this.goods = data.datas.data
          }
        })
    },
    // 上拉加载更多
    onLoad() {
      this.fetchList({ pageIndex: this.page + 1 })
    },
    onClick(_, title) {
      if (this.name == title) {
        return
      }
      this.name = title
      const status = this.statusList.find(item => item.name == title).value
      if (status == -1) {
        this.fetchList({})
      } else {
        this.fetchList({ status })
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

  .goods-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
