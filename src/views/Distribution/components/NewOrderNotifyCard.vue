<template>
  <div class="comp-new-order-notify-card">
    <van-dialog
      v-model="showDialog"
      class="dialog"
      closeOnPopstate
      closeOnClickOverlay
      :beforeClose="onCancel"
      :showConfirmButton="false"
    >
      <div class="icon-block flex-col">
        <span class="iconfont big-icon">&#xe74e;</span>
        <span>你有新的派送订单</span>
      </div>
      <div class="btn-submit" @click="routeDetail">立即查看</div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: '',
      rate: 5,
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    routeDetail() {
      this.$router.push('/my/distribution-detail')
    },
  },
}
</script>

<style lang="less" scoped>
.comp-new-order-notify-card {
  .dialog {
    padding: 0 10px;

    .icon-block {
      padding: 52px 0;
      align-items: center;
      justify-content: center;
      color: #ffcc00;

      .big-icon {
        width: 62px;
        height: 59px;
        font-size: 59px;
      }

      span:last-child {
        margin-top: 18px;
      }
    }

    .btn-submit {
      height: 66px;
      line-height: 66px;
      text-align: center;
      border-top: 1px solid #d9d9d9;
      letter-spacing: 1px;
      font-size: 18px;
      font-weight: bold;
      color: #576b95;
    }
  }
}
</style>
