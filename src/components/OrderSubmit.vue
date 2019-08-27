<template>
  <div :class="['order-submit', `theme-${theme}`]">
    <div class="price">
      实付款:
      <span>￥{{ value }}元</span>
    </div>
    <button :disabled="disabled" @click="onSubmit">立即支付</button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    theme: {
      type: String,
      default: 'red',
    },
  },

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

    &[disabled] {
      background: #999;
    }
  }
}

.theme-green {
  button {
    background: #06c0b5;

    &[disabled] {
      background: #999;
    }
  }

  .price span {
    color: #565656;
  }
}
</style>
