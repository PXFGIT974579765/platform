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
        <div
          v-for="order in distributionsFilter(item.value)"
          :key="order.id"
          class="goods-item"
        >
          <Card :order="order" @onShowDialog="onShowDialog" />
        </div>
      </van-tab>
    </van-tabs>

    <AppraiseDialog
      :showDialog="showDialog"
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
      distributions: [],
      appraise: {
        createTime: '',
        commContent: '',
        rates: 0,
      }, // 评价对象
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
    onClick(name, title) {
      this.name = title
      console.log(this.name)
    },
    distributionsFilter(status) {
      return status === -1
        ? this.distributions
        : this.distributions.filter(item => item.status === status)
    },
    // 关掉评价窗口
    onCancel() {
      this.showDialog = false
    },
    // 点击查看评价
    onShowDialog(orderId) {
      this.$http
        .get('/api-wxmp/cxxz/distriButtion/order/findDistriOrderComment', {
          params: {
            id: orderId,
          },
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.appraise = data.datas
            this.showDialog = true
          } else {
            alert(data.resp_msg)
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

  .goods-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
