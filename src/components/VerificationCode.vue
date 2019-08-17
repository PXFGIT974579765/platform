<template>
  <div class="verification-code">
    <van-icon name="cross" :size="16" class="close" @click="onClose" />
    <div>输入短信验证码</div>
    <div class="contact">
      <span>13201356829</span>
      <span>58</span>
    </div>
    <div class="inputs">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="less" scoped>
.verification-code {
  position: relative;
  text-align: center;
  padding: 0 20px;
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #adadad;
}
</style>
