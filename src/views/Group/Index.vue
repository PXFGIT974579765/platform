<template>
  <div>
    <div class="header">
      <search light />

      <ul class="clearfix">
        <li>
          <span class="iconfont">&#xe733;</span>
          <div class="name">时尚服饰</div>
        </li>
        <li>
          <span class="iconfont">&#xe735;</span>
          <div class="name">学习用品</div>
        </li>
        <li>
          <span class="iconfont">&#xe732;</span>
          <div class="name">食品超市</div>
        </li>
        <li>
          <span class="iconfont">&#xe734;</span>
          <div class="name">手机数码</div>
        </li>
        <li>
          <span class="iconfont">&#xe733;</span>
          <div class="name">生活用品</div>
        </li>
        <li>
          <span class="iconfont">&#xe731;</span>
          <div class="name">零食小吃</div>
        </li>
        <li>
          <span class="iconfont">&#xe736;</span>
          <div class="name">电子产品</div>
        </li>
        <li>
          <span class="iconfont">&#xe738;</span>
          <div class="name">图书资料</div>
        </li>
      </ul>
    </div>

    <div class="ticket">
      <img src="~@/assets/images/group_ad.png" alt />
      <div class="ticket-info">
        <div class="ticket-name">打印专用抵扣券</div>
        <div class="ticket-value">
          ￥
          <span>10</span>
        </div>
        <button>立即领取</button>
      </div>
    </div>

    <div class="block list">
      <div class="block-header">
        <div class="block-title">最新拼团</div>
      </div>
      <div class="block-content clearfix">
        <div class="list-item-wrap">
          <router-link to="/group/detail/1" class="list-item">
            <img src="~@/assets/images/group_item.png" alt />
            <div class="name">JIEMO小众波点连衣裙法式复古</div>
            <div class="detail">
              <div class="price">
                ￥
                <span>235</span>.00
              </div>
              <div class="count">2-3人团</div>
            </div>
          </router-link>
        </div>
        <div class="list-item-wrap">
          <router-link to="/group/detail/1" class="list-item">
            <img src="~@/assets/images/group_item.png" alt />
            <div class="name">JIEMO小众波点连衣裙法式复古</div>
            <div class="detail">
              <div class="price">
                ￥
                <span>235</span>.00
              </div>
              <div class="count">2-3人团</div>
            </div>
          </router-link>
        </div>
        <div class="list-item-wrap">
          <router-link to="/group/detail/1" class="list-item">
            <img src="~@/assets/images/group_item.png" alt />
            <div class="name">JIEMO小众波点连衣裙法式复古</div>
            <div class="detail">
              <div class="price">
                ￥
                <span>235</span>.00
              </div>
              <div class="count">2-3人团</div>
            </div>
          </router-link>
        </div>
        <div class="list-item-wrap">
          <router-link to="/group/detail/1" class="list-item">
            <img src="~@/assets/images/group_item.png" alt />
            <div class="name">JIEMO小众波点连衣裙法式复古</div>
            <div class="detail">
              <div class="price">
                ￥
                <span>235</span>.00
              </div>
              <div class="count">2-3人团</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  components: {
    Search,
  },
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 10px;
  padding: 13px 20px 0;
  background: #fff;
}

ul {
  text-align: center;
  margin-top: 23px;

  li {
    float: left;
    width: 25%;
    margin-bottom: 20px;
  }

  .iconfont {
    font-size: 20px;
    background: linear-gradient(90deg, #ff6565 0%, #ff1f26 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
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

  img {
    width: 66%;
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
    height: 20px;
    line-height: 20px;
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
  margin-bottom: 150px;
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
  border-radius: 4px;
  background: #fff;

  .name {
    padding: 6px 7px;
    line-height: 1.5;
    font-size: 16px;
    color: #4e4e4e;
  }

  .detail {
    display: flex;
    padding: 0 6px 15px;
  }

  .price {
    flex: 1;
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
