<template>
  <div class="comp-appreaise-dialog">
    <van-dialog
      v-model="show"
      class="dialog"
      closeOnPopstate
      closeOnClickOverlay
      :beforeClose="onCancel"
      :showConfirmButton="false"
    >
      <span>请对本次活动评分</span>
      <van-rate class="rate" v-model="appraise.rates" size="35" />
      <textarea
        class="advice"
        @input="onMessageChange"
        v-model="appraise.commContent"
        placeholder="你的建议（控制在100字以内）"
      ></textarea>
      <div class="btn-submit" v-if="appraise.status == -1" @click="onSubmit">
        提交评价
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    info: Object,
  },
  data() {
    return {
      appraise: this.info,
      show: false,
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onSubmit() {
      this.$emit('onSubmit', {
        commContent: this.appraise.commContent,
        rates: this.appraise.rates,
      })
    },
    // 监听评价内容长度
    onMessageChange(e) {
      const value = e.target.value
      this.appraise.commContent = value
      if (value.length > 100) {
        this.appraise.commContent = value.slice(0, 100)
      }
    },
  },
  // 子组件监听获取父组件动态数据
  watch: {
    info(newValue) {
      this.appraise = newValue
    },
    showDialog(newValue) {
      this.show = newValue
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
