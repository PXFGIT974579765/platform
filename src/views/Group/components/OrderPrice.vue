<template>
  <van-cell-group>
    <van-cell value="￥10.00" is-link title-class="custom-title">
      <template slot="title">
        <span class="inner-custom-title">优惠券</span>
        <van-tag plain color="#ff4444" size="medium">下单立减10元</van-tag>
      </template>
    </van-cell>

    <van-cell title="订单总价" value="￥225.00" title-class="custom-title" />
  </van-cell-group>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.custom-title {
  color: #2d2d2d;
}

.inner-custom-title {
  margin-right: 45px;
}
</style>
