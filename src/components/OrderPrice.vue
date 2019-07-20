<template>
  <div class="order-price">
    <div class="item">
      <div class="item-name">优惠券</div>
      <div class="tag">下单立减10元</div>
      <div class="item-value ticket">
        ￥10.00
        <span class="iconfont">&#xe76e;</span>
      </div>
    </div>
    <div class="item">
      <div class="item-name">订单总价</div>
      <div class="item-value price">￥225.00</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.order-price {
  padding: 0 15px;
  background: #fff;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #d7d7d7;

  &:last-child {
    border: 0;
  }
}

.item-name {
  padding: 15px 0;
  color: #2d2d2d;
}

.tag {
  margin-left: -3em;
  padding: 5px;
  border-radius: 2px;
  border: solid 1px #ff4444;
  color: #ff4444;
}

.ticket {
  color: #232323;
}

.price {
  font-size: 16px;
  color: #ff4a4a;
}
</style>
