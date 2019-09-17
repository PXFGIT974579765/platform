<template>
  <div>
    <div class="header">
      <search light />

      <ul class="clearfix category">
        <li v-for="c in category" :key="c.categoryId" @click="onFilter(c)">
          <img :src="c.iconUrl" alt />
          <div class="name">{{ c.name }}</div>
        </li>
      </ul>
    </div>

    <div v-if="ticket.id || ad.adId" class="ticket">
      <a v-if="ad.adId" :href="ad.extUrl || ad.link">
        <img
          :class="['banner-img', { 'max-width': !ticket.id }]"
          :src="ad.adImg"
          alt
        />
      </a>

      <div v-if="ticket.id" :class="['ticket-info', { 'max-width': !ad.adId }]">
        <div class="ticket-name">{{ ticket.name }}</div>
        <div class="ticket-value">
          ￥
          <span>{{ ticket.typeMoney }}</span>
        </div>
        <button @click="getTicket(ticket.id)">立即领取</button>
      </div>
    </div>

    <div class="block list">
      <div class="block-header">
        <div class="block-title">
          {{ filter.categoryId ? filter.name : '最新拼团' }}
        </div>
      </div>

      <div class="block-content">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <div class="van-clearfix">
            <div class="list-item-wrap" v-for="l in list" :key="l.id">
              <router-link :to="`/group/detail/${l.id}`" class="list-item">
                <div
                  class="image"
                  :style="{ backgroundImage: `url(${l.picUrl})` }"
                />
                <div class="name ellipsis-2">{{ l.name }}</div>
                <div class="detail">
                  <div class="price">
                    ￥
                    <span>{{ l.price }}</span
                    >.00
                  </div>
                  <div class="count">
                    {{ l.limitMinSize }}-{{ l.limitMaxSize }}人团
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'

const initFilter = { categoryId: undefined, name: '' }

export default {
  components: {
    Search,
  },

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
      ticket: {},
      ad: {},
    }
  },

  created() {
    this.fetchCategory()
    this.fetchList(this.page)
    this.fetchTicket()
    this.fetchAd()
  },

  methods: {
    fetchCategory() {
      this.$http.get('/api-wxmp/cxxz/category/ptTypes').then(({ data }) => {
        if (data.resp_code === 0) {
          this.category = data.datas
        }
      })
    },

    fetchTicket() {
      this.$http.get('/api-wxmp/cxxz/coupon/findCoupon').then(({ data }) => {
        if (data.resp_code === 0) {
          this.ticket = data.datas
        }
      })
    },

    getTicket(id) {
      this.$http
        .post('/api-wxmp/cxxz/coupon/gainCoupon', { id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$toast(data.resp_msg)
          } else {
            this.$toast(data.resp_msg)
          }
        })
    },

    fetchAd() {
      this.$http.get('/api-media/news-anon/news/ptAd').then(({ data }) => {
        if (data.resp_code === 0) {
          this.ad = data.datas
        }
      })
    },

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
        .get('/api-wxmp/cxxz/assemble/pageList', {
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
.header {
  margin-bottom: 10px;
  padding: 13px 20px 0;
  background: #fff;
}

.category {
  text-align: center;
  margin-top: 23px;

  li {
    float: left;
    width: 25%;
    margin-bottom: 20px;
  }

  img {
    max-width: 22px;
  }

  .name {
    margin-top: 10px;
    font-size: 13px;
    color: #565656;
  }
}

.ticket {
  display: flex;
  padding: 15px;
  background: #fff;

  .banner-img {
    width: 60%;
    &.max-width {
      width: 100%;
    }
  }

  .ticket-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 11px;
    padding: 13px 14px;
    color: #fff;
    background: url(~@/assets/images/group_print.png) 0 0 no-repeat;
    background-size: 100% 100%;

    &.max-width {
      height: 110px;
      margin-left: 0;
    }
  }

  .ticket-name {
    font-size: 15px;
    line-height: 1.5;
  }

  .ticket-value span {
    font-size: 24px;
  }

  button {
    width: 62px;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 10px;
    background-color: #c70300;
  }
}

.block {
  margin-top: 21px;
  padding: 0 15px;
}

.block-header {
  display: flex;
  margin-bottom: 15px;
}

.block-title {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
}

.list {
  margin-bottom: 10px;
}

.list-item-wrap {
  width: 50%;
  float: left;
  margin-bottom: 15px;
  &:nth-child(2n + 1) {
    padding-right: 7.5px;
  }
  &:nth-child(2n) {
    padding-left: 7.5px;
  }
}

.list-item {
  display: block;
  text-align: center;
  border-radius: 4px;
  background: #fff;

  .image {
    height: 165px;
    border-radius: 4px 4px 0 0;
    background-color: #fff;
    background-position: 50% 50%;
    background-size: cover;
  }

  .name {
    text-align: left;
    margin-bottom: 3px;
    padding: 6px 7px;
    line-height: 1.5;
    height: 3.5em;
    font-size: 16px;
    color: #4e4e4e;
  }

  .detail {
    display: flex;
    align-items: center;
    padding: 0 6px 15px;
  }

  .price {
    flex: 1;
    text-align: left;
    font-size: 12px;
    color: #ff2d2d;
    span {
      font-size: 17px;
    }
  }

  .count {
    width: 43px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 11px;
    border-radius: 2px;
    background: #f94141;
    color: #fff;
  }
}
</style>
