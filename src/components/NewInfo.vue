<template>
  <div class="new-info">
    <span class="new-date">{{ date.split(' ')[0] }}</span>
    <!-- <span class="new-read">阅读：{{ read }} 次</span> -->
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: '',
    },
    read: Number,
  },
}
</script>

<style lang="less" scoped>
.new-info {
  font-size: 12px;
  color: #b4b4b4;
}
.new-date {
  margin-right: 15px;
}
</style>
