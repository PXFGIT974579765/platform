<template>
  <div class="home">
    <info-card :paddingBottom="60" />

    <nav>
      <router-link to="/my/sign">
        <span class="iconfont nav-score">&#xe72c;</span>
        <div>赚积分</div>
      </router-link>
      <router-link to="/point">
        <span class="iconfont nav-small">&#xe72c;</span>
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
        <swiper :options="swiperOption">
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
          <swiper-slide>Slide 4</swiper-slide>
          <swiper-slide>Slide 5</swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
      </div>
    </div>

    <div class="block rec-app">
      <div class="block-header">
        <div class="block-title">推荐应用</div>
      </div>
      <div class="block-content">
        <div class="rec-app-item">
          <div class="app-name">共享打印</div>
          <div class="app-desc">一键发送 送货上门</div>
        </div>
        <div class="rec-app-item">
          <div class="app-name">在线拼团</div>
          <div class="app-desc">还有比这里价更低</div>
        </div>
        <div class="rec-app-item">
          <div class="app-name">租赁服务</div>
          <div class="app-desc">随租随还 再租不难</div>
        </div>
      </div>
    </div>

    <div class="block news">
      <div class="block-header">
        <div class="block-title">动态</div>
        <router-link to="/news" class="block-header-link">更多动态</router-link>
      </div>
      <div class="block-content">
        <new-item
          :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
          :date="'01.25'"
          :read="452"
          :image="require('@/assets/images/new.png')"
        />
        <new-item
          :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
          :date="'01.25'"
          :read="452"
          :image="require('@/assets/images/new.png')"
        />
        <new-item
          :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
          :date="'01.25'"
          :read="452"
          :image="require('@/assets/images/new.png')"
        />
      </div>
    </div>

    <div class="block group">
      <div class="block-header">
        <div class="block-title">最新拼团</div>
        <router-link to="/group" class="block-header-link">更多</router-link>
      </div>
      <van-grid :gutter="15" :column-num="2" class="block-content">
        <van-grid-item to="/group/detail/1">
          <div class="group-item">
            <img src="./images/shop.png" alt />
            <div class="group-name">植护纯木抽纸</div>
            <div class="group-price">¥ 50.45</div>
          </div>
        </van-grid-item>
        <van-grid-item to="/group/detail/1">
          <div class="group-item">
            <img src="./images/shop.png" alt />
            <div class="group-name">植护纯木抽纸</div>
            <div class="group-price">¥ 50.45</div>
          </div>
        </van-grid-item>
        <van-grid-item to="/group/detail/1">
          <div class="group-item">
            <img src="./images/shop.png" alt />
            <div class="group-name">植护纯木抽纸</div>
            <div class="group-price">¥ 50.45</div>
          </div>
        </van-grid-item>
        <van-grid-item to="/group/detail/1">
          <div class="group-item">
            <img src="./images/shop.png" alt />
            <div class="group-name">植护纯木抽纸</div>
            <div class="group-price">¥ 50.45</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="rec-block-wrap">
      <div class="rec-block">
        <div class="rec-block-title">AD 英语六级 视频听力训练</div>
        <img src="./images/ad.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'
import InfoCard from '@/components/InfoCard'
import http from '@/lib/http'

export default {
  components: {
    NewItem,
    InfoCard,
  },

  data() {
    return {
      value: '',
      swiperOption: {
        initialSlide: 2,
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
    http
      .post('/wxmp-anon/client/wxUrl', {
        sign: '9ae4934e5068f95e05975669eb182ce7',
        url: 'http://anthour.natapp1.cc/accept',
      })
      .then(({ data }) => {
        location.href = data.datas.url
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
  height: 175px;
  width: 80%;
  background: url(~@/assets/images/swipe.png) 0 0;
  background-size: 100% 100%;
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
  margin-right: 14px;
  padding: 13px;
  border-radius: 6px;
  background-color: #ffeedb;

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

.group {
  margin-top: 36px;
  padding: 0;
  .block-header {
    padding: 0 15px;
  }
  .group-item {
    padding: 25px 15px 15px;
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
  padding: 15px;
  font-size: 10px;
  color: #626262;
  background: #fff;
  img {
    display: block;
    margin-top: 7px;
    width: 100%;
    height: 108px;
  }
}
</style>
