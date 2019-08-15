<template>
  <div class="pay-methods">
    <van-radio-group :value="method">
      <div class="pay-method weixin">
        <van-radio
          :name="2"
          label-position="left"
          checked-color="#07c160"
          @click="onClick(2)"
        >
          <div class="label">
            <span class="iconfont">&#xe758;</span>
            <div class="name">微信支付</div>
          </div>
        </van-radio>
      </div>
      <div v-if="balance >= price" class="pay-method account">
        <van-radio
          :name="0"
          label-position="left"
          checked-color="#07c160"
          @click="onClick(0)"
        >
          <div class="label">
            <span class="iconfont">&#xe777;</span>
            <div class="name">
              余额
              <span>可用余额: {{ balance }}元</span>
            </div>
          </div>
        </van-radio>
      </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    balance: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      default: 2,
    },
    price: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    onClick(value) {
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less">
.pay-methods {
  margin: 8px 0;
  padding: 0 15px;
  background: #fff;
}

.pay-method {
  padding: 15px 0;
  border-top: solid 1px #d7d7d7;

  &:first-child {
    border: 0;
  }

  .name {
    margin: 0 11px;
    color: #585858;
    span {
      margin-left: 12px;
      font-size: 13px;
      color: #a4a4a4;
    }
  }

  .label {
    display: flex;
    align-items: center;
  }

  /deep/ .van-radio__label--left {
    flex: 1;
  }

  &.weixin .iconfont {
    color: #00b700;
  }
  &.account .iconfont {
    color: #ffc000;
  }
}
</style>
