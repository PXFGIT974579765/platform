<template>
  <div class="order-submit">
    <div class="price">
      实付款:
      <span>￥225.00元免运费</span>
    </div>
    <button @click="onSubmit">立即支付</button>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      this.$emit('submit')
    },
  },
}
</script>

<style lang="less" scoped>
.order-submit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: #ffffff;

  .price {
    flex: 1;
    padding: 21px 0;
    color: #565656;
    span {
      color: #f94141;
    }
  }

  button {
    padding: 21px 30px;
    color: #fff;
    background: #f94141;
  }
}
</style>
