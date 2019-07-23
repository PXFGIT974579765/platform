<template>
  <div class="order">
    <div class="order-item">
      <div class="item">
        <div class="item-name">订单名称:</div>
        <div class="item-value">刀剑2贵州赛区英雄争霸赛</div>
      </div>
      <div class="item">
        <div class="item-name">订单金额:</div>
        <div class="item-value">￥20.00</div>
      </div>
    </div>

    <order-price />
    <order-pay />
    <order-submit />
  </div>
</template>

<script>
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    OrderPrice,
    OrderPay,
    OrderSubmit,
  },
}
</script>

<style lang="less" scoped>
.order-item {
  margin: 10px 0;
  padding: 12px 15px;
  background: #fff;
}

.item {
  display: flex;
  margin-bottom: 10px;
  color: #7d7d7d;

  &:last-child {
    margin: 0;
  }
}

.item-value {
  flex: 1;
  margin-left: 10px;
  color: #000;
}
</style>
