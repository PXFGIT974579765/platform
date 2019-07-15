<template>
  <div class="order-submit">
    <div class="price">
      支付
      <span>￥2.00元</span>
    </div>
    <button @click="onSubmit">提交订单</button>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.order-submit {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 84px -15px 76px;
  background: #ffffff;
  > * {
    flex: 1;
  }
  .price {
    font-size: 12px;
    color: #585858;
    span {
      font-size: 15px;
      color: #ff4545;
    }
  }
  button {
    height: 48px;
    line-height: 48px;
    color: #fff;
    background: #0cc3b1;
  }
}
</style>
