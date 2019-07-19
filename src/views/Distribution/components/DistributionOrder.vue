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
      distributions: [
        {
          orderNo: '557879582',
          imgUrl: require('../images/goods.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 0,
        },
        {
          orderNo: '557879583',
          imgUrl: require('../images/goods.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 1,
        },
        {
          orderNo: '557879584',
          imgUrl: require('../images/goods.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 1,
        },
      ],
    }
  },
  methods: {
    onLoad() {},
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
