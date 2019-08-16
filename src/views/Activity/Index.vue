<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <div class="rec">
      <div class="title">推荐活动</div>

      <div class="activities">
        <swiper v-if="activity.length > 0" :options="swiperOption">
          <swiper-slide v-for="a in activity" :key="a.id">
            <router-link :to="`/activity/detail/${a.id}`">
              <img :src="a.itemPicUrl" alt />

              <div class="content">
                <div class="name">
                  <div class="tag">比赛</div>
                  刀剑2贵州赛区英雄争霸赛
                </div>

                <div class="detail">
                  <div class="date">
                    <span>6月13日</span>
                    <span>星期六</span>
                    <span>09:00 - 12:00</span>
                  </div>
                  <div class="address">贵州师范大学</div>
                </div>

                <div class="others">
                  <div class="price">免费参加</div>
                  <div class="count">
                    <span>274人报名</span>
                    <span>限额300人</span>
                  </div>
                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>

        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>

    <activity-nav :topics="topics" />

    <div class="hot">
      <div class="title">热门活动</div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <activity-item v-for="l in list" :key="l.id" :data="l" />
      </van-list>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import ActivityNav from './components/ActivityNav'
import ActivityItem from './components/ActivityItem'

export default {
  components: {
    Search,
    ActivityNav,
    ActivityItem,
  },

  data() {
    return {
      topics: [],
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      list: [],
      activity: [],
      swiperOption: {
        initialSlide: 0,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 11,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },

  created() {
    this.fetchCategory()
    this.fetchRec()
    this.fetchList(this.page)
  },

  methods: {
    fetchCategory() {
      this.$http.get('/api-wxmp/cxxz/topics/banners').then(({ data }) => {
        if (data.resp_code === 0) {
          this.topics = data.datas
        }
      })
    },

    fetchRec() {
      this.$http
        .get('/api-wxmp/cxxz/topics/findRecommendTopic')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.activity = data.datas
          }
        })
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
        .get('/api-wxmp/cxxz/topics/pageTopics', {
          params: {
            pageIndex,
            pageSize,
          },
        })
        .then(({ data }) => {
          this.stopLoading()

          if (data.resp_code !== 0) {
            this.error = true
            return
          }

          this.page = pageIndex
          this.count = data.datas.count
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
  padding: 10px 18px;
  background: #fff;
}

.title {
  padding: 15px 0;
  font-size: 17px;
}

.rec {
  margin-bottom: 8px;
  padding: 13px 15px 40px;
  background: #fff;

  img {
    border-radius: 3px 3px 0 0;
  }

  .title {
    margin-bottom: 5px;
  }

  .activities {
    position: relative;
    background-color: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(136, 136, 136, 0.3);
    border-radius: 0px 0px 3px 3px;
  }

  .swiper-pagination {
    bottom: -25px;
  }

  .content {
    padding: 12px 13px 15px;
  }

  .name {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 16px;
    color: #2d2d2d;
  }

  .tag {
    width: 35px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 8px;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    background-image: linear-gradient(#16b459, #16b459),
      linear-gradient(#ff3434, #ff3434);
  }

  .detail {
    display: flex;
    font-size: 12px;
    color: #b2b2b2;
  }

  .date {
    flex: 1;
    margin-bottom: 14px;

    span {
      margin-right: 12px;
    }
  }

  .others {
    display: flex;
    font-size: 12px;
    color: #ff9000;
  }

  .price {
    flex: 1;
  }

  .count span:last-child {
    margin-left: 10px;
    color: #565656;
  }
}

.hot {
  padding: 0 15px 10px;
  background: #fff;
}
</style>
