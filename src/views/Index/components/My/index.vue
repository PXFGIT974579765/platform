<template>
  <div class="page-my">
    <info-card />

    <van-notice-bar :text="notice" left-icon="volume-o" mode="closeable" />

    <van-cell
      title="我的订单"
      value="你有未处理的订单"
      icon="location-o"
      is-link
      to="/my/order-first"
    />

    <van-cell-group class="cell-group">
      <van-cell title="我的钱包" value="￥589.56" is-link to="/my/wallet" />
      <van-cell title="优惠券" is-link to="/my/coupon" />
      <van-cell title="成长记录" is-link />
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell title="配送中心" value="有新的配送订单" is-link />
      <van-cell title="积分商城" is-link />
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell title="个人信息" is-link to="/my/base-info" />
      <van-cell title="收货地址" is-link to="/my/address-list" />
      <van-cell title="咨询投诉" is-link to="/my/complain" />
    </van-cell-group>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'

export default {
  data() {
    return {
      notice: '应国家监管要求，请尽快上传身份证进行实名认证',
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
}
.cell-group {
  margin: 10px 0;
}
</style>
