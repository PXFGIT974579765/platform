<template>
  <div class="home">
    <div class="header">
      <div class="search-header">
        <search />
        <button class="qrcode">
          <span class="iconfont">&#xe746;</span>
        </button>
      </div>

      <person-desc />

      <hr />

      <div class="score">
        <div>
          我的积分
          <span>1724</span>
        </div>
        <div>
          排名
          <span>450</span>
        </div>
      </div>

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
    </div>

    <div class="notice">
      <span class="iconfont">&#xe728;</span>HI 别忘了参加今天的活动哦！
    </div>

    <div class="block">
      <div class="block-header">
        <div class="block-title">活动推荐</div>
        <router-link to="/activity" class="block-header-link"
          >最新活动</router-link
        >
      </div>
      <div class="block-content swipe-wrap">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item class="swipe-item">1</van-swipe-item>
          <van-swipe-item class="swipe-item">2</van-swipe-item>
          <van-swipe-item class="swipe-item">3</van-swipe-item>
          <van-swipe-item class="swipe-item">4</van-swipe-item>
        </van-swipe>
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
import Search from '@/components/Search'
import PersonDesc from '@/components/PersonDesc'
import NewItem from '@/components/NewItem'

export default {
  components: {
    Search,
    PersonDesc,
    NewItem,
  },

  data() {
    return {
      value: '',
    }
  },

  methods: {
    onSearch() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  background: #fff;
}

.header {
  padding: 15px 15px 73px;
  background-image: linear-gradient(90deg, #06bcbf 0%, #07c2af 100%);
}

.search-header {
  position: relative;
  display: flex;
  align-items: center;
}

.search {
  flex: 1;
  margin-right: 18px;
}

.qrcode {
  border: 0;
  background: transparent;
  outline: 0;
  .iconfont {
    font-size: 26px;
    color: #fff;
  }
}

.person-desc {
  margin-top: 20px;
}

hr {
  height: 1px;
  margin: 22px 0 26px;
  border: 0;
  background-image: linear-gradient(#5ceae2, #5ceae2),
    linear-gradient(#feceb7, #feceb7);
  opacity: 0.41;
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
  position: absolute;
  left: 15px;
  right: 15px;
  transform: translateY(40%);
  display: flex;
  align-items: center;
  text-align: center;
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
  margin: 50px 15px 42px;
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

.van-swipe {
  height: 150px;
}

.swipe-item {
  height: 150px;
  color: #fff;
  background-color: #9f70ea;
}

.rec-app {
  margin-top: 45px;
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
