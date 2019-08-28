<template>
  <div>
    <div v-if="!show" class="center">签到中.....</div>
    <div v-else class="center">{{ message || '签到成功' }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
    }
  },

  created() {
    const { goodsId } = this.$route.query
    if (!goodsId) return

    this.$http
      .post('/api-wxmp/cxxz/order/scanOrderHD', {
        goodsId,
      })
      .then(({ data }) => {
        if (data.resp_code == 0) {
          this.show = true
        } else if (data.resp_msg) {
          this.show = true
          this.message = data.resp_msg
        } else {
          this.show = true
          this.message = '系统繁忙'
        }
      })
  },
}
</script>

<style lang="less" scoped>
.center {
  text-align: center;
  font-size: 20px;
}
</style>
