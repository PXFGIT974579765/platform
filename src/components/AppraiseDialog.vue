<template>
  <div class="comp-appreaise-dialog">
    <van-dialog
      v-model="showDialog"
      class="dialog"
      closeOnPopstate
      closeOnClickOverlay
      :beforeClose="onCancel"
      :showConfirmButton="false"
    >
      <span>请对本次活动评分</span>
      <van-rate class="rate" v-model="rate" size="35" />
      <textarea
        class="advice"
        v-model="message"
        placeholder="你的建议（控制在100字以内）"
      ></textarea>
      <div class="btn-submit">提交评价</div>
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
  },
}
</script>

<style lang="less" scoped>
.comp-appreaise-dialog {
  .dialog {
    padding: 52px 40px;
    z-index: 999;

    .rate {
      margin-top: 23px;
    }

    .advice {
      margin-top: 24px;
      padding: 20px;
      width: 100%;
      height: 150px;
      border: 0;
      border-radius: 3px;
      background-color: #eeeeee;
    }

    .btn-submit {
      margin-top: 14px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      color: #fff;
      background-color: #07c2af;
    }
  }
}
</style>
