<template>
  <div class="pay-methods">
    <van-radio-group v-model="radio">
      <div class="pay-method weixin">
        <span class="iconfont">&#xe758;</span>
        <div class="name">微信支付</div>
        <van-radio :name="1" checked-color="#07c160" />
      </div>
      <div class="pay-method account">
        <span class="iconfont">&#xe777;</span>
        <div class="name">
          余额
          <span>可用余额: {{ order.user.wallet }}元</span>
        </div>
        <van-radio :name="2" checked-color="#07c160" />
      </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      radio: 1,
    }
  },
}
</script>

<style lang="less" scoped>
.pay-methods {
  margin: 8px 0;
  padding: 0 15px;
  background: #fff;
}

.pay-method {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: solid 1px #d7d7d7;

  &:last-child {
    border: 0;
  }
  .name {
    flex: 1;
    margin: 0 11px;
    color: #585858;
    span {
      margin-left: 12px;
      font-size: 13px;
      color: #a4a4a4;
    }
  }
  &.weixin .iconfont {
    color: #00b700;
  }
  &.account .iconfont {
    color: #ffc000;
  }
}
</style>
