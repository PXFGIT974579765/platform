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
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
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
      page: 1,
      finished: false,
      loading: true,
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
    // 拉去订单信息
    fetchList({ pageIndex = 1, pageSize = 10, status = -1 }) {
      this.startFetch()
      this.$http
        .post('/api-wxmp/cxxz/distriButtion/order/findMyDistriOrderPage', {
          params: {
            pageIndex,
            pageSize,
            status,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.endFetch()
            this.distributions = []
            this.distributions = data.datas.data
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
      this.fetchList({ status })
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
            this.appraise = data.datas
            this.showDialog = true
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

  .goods-item {
    margin: 10px 0;
    width: 100%;
    height: 243px;
    padding: 21px 15px;
    background-color: #fff;
  }
}
</style>
