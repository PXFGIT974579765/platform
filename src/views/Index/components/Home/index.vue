<template>
  <div class="home">
    <info-card :paddingBottom="60" />

    <nav>
      <router-link to="/my/sign">
        <span class="iconfont nav-score">&#xe77b;</span>
        <div>赚积分</div>
      </router-link>
      <router-link to="/point">
        <span class="iconfont nav-small">&#xe776;</span>
        <div>积分商城</div>
      </router-link>
      <router-link to="/my/order-first">
        <span class="iconfont nav-order">&#xe72d;</span>
        <div>我的订单</div>
      </router-link>
    </nav>

    <div class="notice">
      <span class="iconfont">&#xe728;</span>HI 别忘了参加今天的活动哦！
    </div>

    <div class="activity">
      <div class="block-header">
        <div class="block-title">活动推荐</div>
        <router-link to="/activity" class="block-header-link"
          >最新活动</router-link
        >
      </div>
      <div class="block-content">
        <swiper v-if="activity.length > 0" :options="swiperOption">
          <swiper-slide v-for="a in activity" :key="a.id">
            <router-link :to="`/activity/detail/${a.id}`">
              <img :src="a.itemPicUrl" alt />
            </router-link>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>

    <div class="block rec-app">
      <div class="block-header">
        <div class="block-title">推荐应用</div>
      </div>
      <div class="block-content">
        <a
          class="rec-app-item"
          v-for="app in apps"
          :href="app.appUrl"
          :key="app.setId"
          :style="{ 'background-image': `url(${app.appImg})` }"
        >
          <div class="app-name">{{ app.appName }}</div>
          <div class="app-desc">{{ app.appDescribe }}</div>
        </a>
      </div>
    </div>

    <div class="block news">
      <div class="block-header">
        <div class="block-title">动态</div>
        <router-link to="/index/news" class="block-header-link"
          >更多动态</router-link
        >
      </div>
      <div class="block-content">
        <router-link
          v-for="d in dynamicNews"
          :key="d.contentId"
          :to="`/index/news/${d.contentId}`"
          class="new-link"
        >
          <new-item
            :title="d.title"
            :date="d.releaseDate"
            :read="452"
            :image="d.headerImage.split('@')[0]"
          />
        </router-link>
      </div>
    </div>

    <div class="block group">
      <div class="block-header">
        <div class="block-title">最新拼团</div>
        <router-link to="/group" class="block-header-link">更多</router-link>
      </div>
      <van-grid :gutter="15" :column-num="2" class="block-content">
        <van-grid-item
          v-for="g in groups"
          :key="g.id"
          :to="`/group/detail/${g.id}`"
        >
          <div class="group-item">
            <img :src="g.picUrl" alt />
            <div class="group-name van-ellipsis">{{ g.name }}</div>
            <div class="group-price">¥ {{ g.price }}</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="rec-block-wrap">
      <a :href="ad.link" class="rec-block">
        <div class="rec-block-title">{{ ad.title }}</div>
        <img :src="ad.adImg" alt />
      </a>
    </div>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'
import InfoCard from '@/components/InfoCard'

export default {
  components: {
    NewItem,
    InfoCard,
  },

  data() {
    return {
      value: '',
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
      dynamicNews: [],
      groups: [],
      apps: [],
      activity: [],
      ad: {
        link: '',
      },
    }
  },

  created() {
    this.$http
      .get('/api-wxmp/cxxz/topics/findRecommendTopic')
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.activity = data.datas
        }
      })

    this.$http.get('/api-media/news-anon/news/dynamicNews').then(({ data }) => {
      if (data.resp_code === 0) {
        this.dynamicNews = data.datas
      }
    })

    this.$http
      .get('/api-wxmp/cxxz/assemble/findNewestList')
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.groups = data.datas
        }
      })

    this.$http
      .get('/api-wxmp/cxxz/app/findAppList', { params: { isDefault: 1 } })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.apps = data.datas
        }
      })

    this.$http
      .get('/api-media/news-anon/news/pageAd', { params: { isDefault: 1 } })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.ad = data.datas
        }
      })
  },

  methods: {
    onSearch() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-slide {
  width: 80%;

  img {
    width: 100%;
  }
}

.home {
  padding-bottom: 50px;
  background: #fff;
}

.score {
  display: flex;
  font-size: 14px;
  color: #fff;

  div {
    flex: 1;
    text-align: center;
  }

  span {
    margin-left: 4px;
    font-size: 19px;
  }
}

nav {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  text-align: center;
  margin: -40px 15px 0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);

  a {
    flex: 1;
    padding: 15px 0;
    color: #565656;
  }

  .iconfont {
    font-size: 18px;
  }

  div {
    margin-top: 6px;
  }

  .nav-score {
    color: #a880f8;
  }

  .nav-small {
    color: #ffba00;
  }

  .nav-order {
    color: #678fda;
  }
}

.notice {
  margin: 18px 15px 42px;
  padding: 15px;
  font-size: 16px;
  color: #ff9600;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  .iconfont {
    margin-right: 10px;
    color: #fdddb0;
  }
}

.block {
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

.block-header-link {
  color: #a4a4a3;
}

.activity {
  .block-header {
    padding: 0 15px;
  }

  .block-content {
    position: relative;
  }
}

.van-swipe {
  height: 150px;
}

.swipe-item {
  height: 150px;
  color: #fff;
  background-color: #9f70ea;
}

.rec-app {
  margin-top: 56px;
  .block-content {
    display: flex;
  }
}

.rec-app-item {
  flex: 1;
  height: 34vw;
  margin-right: 14px;
  padding: 13px;
  border-radius: 6px;
  background-size: 100% 100%;

  &:last-child {
    margin: 0;
  }

  .app-name {
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #2d2d2d;
  }

  .app-desc {
    line-height: 1.4;
    font-size: 12px;
    color: #767676;
  }
}

.news {
  margin-top: 50px;
}

.van-grid-item,
/deep/ .van-grid-item__content {
  overflow: hidden;
}

.group {
  margin-top: 36px;
  padding: 0;
  .block-header {
    padding: 0 15px;
  }
  .group-item {
    padding: 15px 15px 15px;
    border-radius: 4px;
    background: #effffe;
  }
  img {
    display: block;
    width: 100%;
    height: 80px;
    margin: 0 auto 18px;
  }
  .group-name {
    margin-bottom: 10px;
    font-size: 15px;
    color: #373737;
  }
  .group-price {
    color: #ff1e1d;
  }
}

.rec-block-wrap {
  margin-top: 40px;
  padding-top: 10px;
  background: #f6f6f6;
}
.rec-block {
  display: block;
  padding: 15px;
  font-size: 10px;
  color: #626262;
  background: #fff;
  img {
    display: block;
    margin-top: 7px;
    width: 100%;
  }
}
</style>
