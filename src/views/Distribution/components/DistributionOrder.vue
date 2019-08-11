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
    >
      <van-tab v-for="item in statusList" :key="item.value" :title="item.name">
        <div
          v-for="order in distributionsFilter(item.value)"
          :key="order.id"
          class="goods-item"
        >
          <!-- <router-link :to="'/order/goods-detail/' + good.orderNo"> -->
          <Card :order="order" />
          <!-- </router-link> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './DistributionOrderCard'

export default {
  components: {
    Search,
    Card,
  },
  data() {
    return {
      active: '0',
      keyword: '',
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
      distributions: [],
    }
  },
  created() {
    this.fetchList({})
  },
  methods: {
    // 拉去订单信息
    fetchList({ pageIndex = 1, pageSize = 10 }) {
      this.$http
        .post('/api-wxmp/cxxz/distriButtion/order/findMyDistriOrderPage', {
          params: {
            pageIndex,
            pageSize,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.distributions = data.datas.data
          }
        })
    },
    distributionsFilter(status) {
      return status === -1
        ? this.distributions
        : this.distributions.filter(item => item.status === status)
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

  .goods-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
