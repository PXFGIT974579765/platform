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
      @change="onTabClick"
    >
      <van-tab
        v-for="item in statusList"
        :key="item.value"
        :title="item.name"
        :name="`${item.value}`"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
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

const pageSize = 10

export const status = [
  {
    name: '全部',
    value: -1,
  },
  {
    name: '待付款',
    value: 6,
  },
  {
    name: '进行中',
    value: 0,
  },
  {
    name: '已取消',
    value: 7,
  },
  {
    name: '已完成',
    value: 2,
  },
]

export default {
  components: {
    Search,
    OrderItem,
  },

  data() {
    return {
      statusList: status,
      name: status[0].name,
      active: status[0].value,
      status: status[0].value,
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      orders: [],
    }
  },

  created() {
    this.fetchList(this.page)
  },

  methods: {
    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.orders = []
    },

    startLoading() {
      this.loading = true
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, orders } = this
      if (orders.length >= count) {
        this.finished = true
      }
    },

    fetchList(pageIndex = 1) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/runner/findDistritionOrderPage', {
          pageIndex,
          pageSize,
          status: this.status === -1 ? undefined : this.status,
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
          this.orders = this.orders.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.endLoading()
        })
    },

    onLoad() {
      this.fetchList(this.page + 1)
    },

    onTabClick(_, title) {
      if (this.name == title) return

      this.init()
      this.name = title
      this.status = status.find(item => item.name == title).value

      this.fetchList()
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
