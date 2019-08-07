<template>
  <div class="page-order-group" v-wechat-title="$route.meta.title">
    <div class="search-block">
      <search placeholder="请输入关键字搜索" v-model="keyword" :light="true" />
    </div>
    <van-tabs
      v-model="active"
      title-active-color="#06bcbf"
      color="#06bcbf"
      background="#f4f4f4"
      :swipe-threshold="5"
    >
      <van-tab v-for="item in statusList" :key="item.value" :title="item.name">
        <div
          v-for="group in groupsFilter(item.value)"
          :key="group.id"
          class="gruup-item"
        >
          <!-- <router-link :to="'/order/goods-detail/' + good.orderNo"> -->
          <Card :group="group" />
          <!-- </router-link> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './GroupOrderCard'

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
      groups: [
        {
          orderNo: '557879582',
          imgUrl: require('../images/good.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 4,
        },
        {
          orderNo: '557879583',
          imgUrl: require('../images/good.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 5,
        },
        {
          orderNo: '557879584',
          imgUrl: require('../images/good.png'),
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 4,
        },
      ],
    }
  },
  created() {
    this.fetchOrders({})
  },
  methods: {
    // 拉去商品信息
    fetchOrders({ pageIndex = 1, pageSize = 10 }) {
      this.$http
        .post('/api-wxmp/cxxz/order/pagePT', {
          pageIndex,
          pageSize,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.groups = data.datas.data
          }
        })
    },
    groupsFilter(status) {
      return status === -1
        ? this.groups
        : this.groups.filter(item => item.status === status)
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-group {
  .search-block {
    width: 100%;
    height: 55px;
    padding: 13px 20px;
    background-color: #fff;
  }

  .gruup-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
