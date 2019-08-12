<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <van-tabs
      v-model="active"
      color="#07bfb6"
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
          <div v-for="order in orders" :key="order.id" class="goods-item">
            <order-item :order="order" />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import OrderItem from './components/OrderItem'

export default {
  components: {
    Search,
    OrderItem,
  },

  data() {
    return {
      active: -1,
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
          name: '进行中',
          value: 1,
        },
        {
          name: '已取消',
          value: 2,
        },
        {
          name: '已完成',
          value: 3,
        },
      ],
      orders: [],
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
    // 拉去列表信息
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
            this.orders = []
            this.orders = data.datas.data
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
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 13px 20px;
  background: #fff;
}

.van-tab__pane {
  padding: 10px 15px 150px;
}
</style>
