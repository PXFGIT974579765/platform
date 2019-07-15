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
    >
      <van-tab v-for="item in statusList" :key="item.value" :title="item.name">
        <div
          v-for="obj in activeFilter(item.value)"
          :key="obj.id"
          class="active-item"
        >
          <router-link :to="'/order/active-detail/' + obj.activeNo">
            <Card :active="obj" />
          </router-link>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Card from './ActiveOrderCard'

export default {
  components: {
    Search,
    Card,
  },
  data() {
    return {
      activeTab: '0',
      keyword: '',
      statusList: [
        {
          name: '全部',
          value: -1,
        },
        {
          name: '进行中',
          value: 0,
        },
        {
          name: '已结束',
          value: 1,
        },
        {
          name: '已取消',
          value: 2,
        },
        {
          name: '待评价',
          value: 3,
        },
      ],
      active: [
        {
          activeNo: '557879582',
          imgUrl: require('../images/active1.jpg'),
          title: '刀剑2贵州赛区英雄争霸赛',
          tag: 'race',
          price: 20,
          time: 1500000000,
          address: '贵州大学城师范学院 同心路15号 （创星校园实训中心）',
          signStatus: 0, // 签到状态  0 未签到 1 已签到
          status: 0,
        },
        {
          activeNo: '557879583',
          imgUrl: require('../images/active2.jpg'),
          title: '分红公益跑 关爱先行 分红行动',
          tag: 'pg',
          price: 20,
          time: 1500000000,
          address: '贵州大学城师范学院',
          signStatus: 1, // 签到状态  0 未签到 1 已签到
          status: 2,
        },
        {
          activeNo: '557879584',
          imgUrl: require('../images/active3.jpg'),
          title: '贵州杯',
          tag: 'pg',
          price: 20,
          time: 1500000000,
          address: '贵州大学城师范学院 同心路15号 （创星校园实训中心）',
          signStatus: 0, // 签到状态  0 未签到 1 已签到
          status: 0,
        },
      ],
    }
  },
  methods: {
    onLoad() {},
    activeFilter(status) {
      return status === -1
        ? this.active
        : this.active.filter(item => item.status === status)
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

  .active-item {
    margin: 10px 0;
    width: 100%;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
