<template>
  <div class="page-my">
    <info-card />

    <van-notice-bar :text="notice" left-icon="volume-o" mode="closeable" />

    <van-cell class="cell" title="我的订单" is-link to="/my/order-first">
      <span slot="icon" style="color:#07bfb7" class="iconfont icon"
        >&#xe779;</span
      >
      <span class="value flex" v-if="hasOrders">
        你有未处理的订单
        <span class="dot"></span>
      </span>
    </van-cell>

    <van-cell-group class="cell-group">
      <van-cell
        class="cell"
        title="我的钱包"
        :value="'￥' + coin"
        is-link
        to="/my/wallet"
      >
        <span slot="icon" style="color:#ffc000" class="iconfont icon"
          >&#xe777;</span
        >
      </van-cell>
      <van-cell class="cell" title="优惠券" is-link to="/my/coupon">
        <span slot="icon" style="color:#ff3939" class="iconfont icon"
          >&#xe778;</span
        >
      </van-cell>
      <van-cell class="cell" title="成长记录" is-link>
        <span slot="icon" style="color:#3889ff" class="iconfont icon"
          >&#xe775;</span
        >
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell
        class="cell"
        title="配送中心"
        value="有新的配送订单"
        is-link
        to="/my/distribution"
      >
        <span slot="icon" style="color:#7849ff" class="iconfont icon"
          >&#xe77a;</span
        >
        <span class="value flex" v-if="hasDistribution">
          有新的配送订单
          <span class="dot"></span>
        </span>
      </van-cell>
      <van-cell class="cell" title="积分商城" is-link>
        <span slot="icon" style="color:#ffc000" class="iconfont icon"
          >&#xe776;</span
        >
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell class="cell" title="个人信息" is-link to="/my/base-info">
        <span slot="icon" style="color:#3889ff" class="iconfont icon"
          >&#xe773;</span
        >
      </van-cell>
      <van-cell class="cell" title="收货地址" is-link to="/my/address-list">
        <span slot="icon" style="color:#ffc000" class="iconfont icon"
          >&#xe774;</span
        >
      </van-cell>
      <van-cell class="cell" title="咨询投诉" is-link to="/my/complain">
        <span slot="icon" style="color:#1cca6e" class="iconfont icon"
          >&#xe772;</span
        >
      </van-cell>
    </van-cell-group>

    <div class="ad">
      <img :src="ad.imgUrl" alt />
      <span class="ad-title">{{ ad.title }}</span>
    </div>

    <div class="footer">----- 哇哦，下面没有喽 -----</div>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'

export default {
  data() {
    return {
      notice: '应国家监管要求，请尽快上传身份证进行实名认证',
      hasOrders: true,
      coin: 589.56,
      hasDistribution: true,
      ad: {
        imgUrl: require('./images/ad.png'),
        title: '邀请新人各得 【Rp 500.000】 奖励',
      },
    }
  },
  components: {
    InfoCard,
  },
}
</script>

<style lang="less" scoped>
.page-my {
  background-color: #eee;
  padding-bottom: 50px;

  .cell-group {
    margin: 10px 0;
  }

  .cell {
    height: 52px;
    align-items: center;
    font-size: 15px;
  }
  .icon {
    margin-right: 18px;
  }

  .value {
    align-items: center;
    justify-content: flex-end;

    .dot {
      margin-left: 8px;
      display: inline-block;
      width: 5px;
      height: 5px;
      line-height: 5px;
      border-radius: 50%;
      background-color: #ff3939;
    }
  }

  .ad {
    position: relative;
    padding: 18px 12px;
    background-color: #fff;
  }

  .ad-title {
    position: absolute;
    bottom: 33%;
    left: 30%;
    color: #f9ecec;
  }

  .footer {
    margin-top: 63px;
    margin-bottom: 35px;
    text-align: center;
    color: #c6c6c6;
  }
}
</style>
