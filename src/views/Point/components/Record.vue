<template>
  <div class="record">
    <router-link
      v-for="good in goods"
      :key="good.orderId"
      :to="`/order/goods-detail/${good.orderId}`"
      class="item"
    >
      <img :src="good.goodsImg" alt />
      <div class="content">
        <div class="name">{{ good.goodsName }}</div>
        <div class="status success">
          {{ orderStatusList[good.orderStatus] }}
        </div>
        <div class="others">
          <div class="date">{{ good.createTime }}</div>
          <div class="count">-{{ good.score }}积分</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      goods: [],
      orderStatusList: {
        0: '待付款',
        1: '待配送',
        2: '待提货',
        3: '兑换成功',
      },
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

    fetchList({ pageIndex = 1, pageSize = 10 }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/order/pageJFSC', {
          pageIndex,
          pageSize,
          isScoreOrder: 1,
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

    onLoad() {
      this.fetchList({ pageIndex: this.page + 1 })
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  margin-bottom: 10px;
  padding: 22px 15px;
  font-size: 15px;
  background: #fff;
}

img {
  width: 92px;
  height: 92px;
  margin-right: 13px;
  border-radius: 4px;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  line-height: 1.5;
  color: #000;
}

.status {
  &.success {
    color: #07c2af;
  }
}

.others {
  display: flex;
  align-items: center;
}

.date {
  flex: 1;
  font-size: 13px;
  color: #a4a4a4;
}

.count {
  color: #fe5454;
}
</style>
