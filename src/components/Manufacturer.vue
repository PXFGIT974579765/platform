<template>
  <div class="manufacturer">
    <div class="header">
      <div class="title">厂商：{{ name }}</div>
      <div class="desc">往期拼团</div>
    </div>

    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="o in orders" :key="o.id" class="item">
          <img :src="o.picUrl" alt />
          <div class="detail">
            <div class="name">{{ o.name }}</div>
            <div class="other">
              <div class="count">
                {{ o.limitMinSize }}-{{ o.limitMaxSize }}人团
              </div>
              <div class="result">拼团成功</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'visible'],

  data() {
    return {
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      orders: [],
    }
  },

  created() {
    this.fetchList()
  },

  methods: {
    // init() {
    //   this.page = 1
    //   this.count = 0
    //   this.error = false
    //   this.finished = false
    //   this.orders = []
    // },

    startLoading() {
      this.loading = true
      this.error = false
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

    fetchList(pageIndex = 1, pageSize = 10) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/order/pageBrandPT', {
          goodsBrandId: this.id,
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
          this.stopLoading()
        })
    },

    onLoad() {
      this.fetchList(this.page + 1)
    },
  },
}
</script>

<style lang="less" scoped>
.manufacturer {
  padding: 0 15px;
}

.header {
  display: flex;
  padding: 14px 0;
  font-size: 12px;
  color: #888;
}

.title {
  flex: 1;
}

.desc {
  color: #ff4444;
}

.list {
  max-height: 70vh;
}

.item {
  display: flex;
  padding: 20px 0;
  border-top: solid 1px #dcdcdc;
}

.detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  width: 100px;
  height: 100px;
  margin-right: 12px;
  border-radius: 3px;
}

.name {
  line-height: 1.5;
  font-size: 18px;
  color: #222222;
}

.other {
  display: flex;
  align-items: center;
}

.count {
  width: 62px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 2px;
  font-size: 13px;
  color: #fff;
  background-image: linear-gradient(#f94141, #f94141),
    linear-gradient(#ff4444, #ff4444);
}

.result {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: #ff4444;
}
</style>
