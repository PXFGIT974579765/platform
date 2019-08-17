<template>
  <div class="exchange">
    <div class="filter">
      <div class="filter-title">商品筛选</div>
      <div class="methods">
        <div
          v-for="c in category"
          :key="c.categoryId"
          class="method"
          @click="onFilter(c)"
        >
          {{ c.name }}
        </div>
      </div>
    </div>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-grid :gutter="15" :column-num="2" class="list">
        <van-grid-item
          v-for="l in list"
          :key="l.id"
          :to="`/point/detail/${l.id}`"
        >
          <div class="list-item">
            <img :src="l.picUrl" alt />
            <div class="name ellipsis-2">{{ l.name }}</div>
            <div class="point">
              <span class="count">{{ l.score }}</span
              >积分
              <div v-if="l.price > 0" class="money">+￥{{ l.price }}元</div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script>
const initFilter = { categoryId: undefined, name: '' }

export default {
  data() {
    return {
      category: [],
      filter: { ...initFilter },
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      list: [],
    }
  },

  created() {
    this.$http.get('/api-wxmp/cxxz/category/types').then(({ data }) => {
      if (data.resp_code === 0) {
        this.category = data.datas
      }
    })

    this.fetchList(this.page)
  },

  methods: {
    onFilter(filter) {
      this.filter =
        filter.categoryId !== this.filter.categoryId
          ? filter
          : { ...initFilter }
      this.init()
      this.fetchList()
    },

    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.list = []
    },

    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, list } = this
      if (list.length >= count) {
        this.finished = true
      }
    },

    fetchList(pageIndex = 1, pageSize = 10) {
      this.startLoading()

      this.$http
        .get('/api-wxmp/cxxz/goods/score/page', {
          params: {
            pageIndex,
            pageSize,
            categoryId: this.filter.categoryId,
          },
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
          this.list = this.list.concat(data.datas.data)

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
.filter {
  display: flex;
  padding: 14px 15px;
  color: #585858;
  background: #fff;
}

.filter-title {
  flex: 1;
}

.methods {
  display: flex;
}

.method {
  margin-left: 25px;

  &:first {
    margin: 0;
  }
}

.list {
  margin: 15px 0;

  &-item {
    text-align: center;
    background-color: #ffffff;
    border-radius: 4px;
  }

  img {
    height: 165px;
    border-radius: 4px 4px 0px 0px;
  }

  .name {
    height: 3.1em;
    margin: 8px 8px 8px;
    line-height: 1.5;
    font-size: 16px;
    color: #4e4e4e;
  }

  .point {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 8px;
    color: #646464;
  }

  .count {
    margin-right: 6px;
    font-size: 15px;
    color: #ff6c00;
  }

  .money {
    margin-left: 5px;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    background: #ff4b4b;
  }
}
</style>
