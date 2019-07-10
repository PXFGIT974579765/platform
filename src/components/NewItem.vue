<template>
  <div class="new">
    <div class="new-desc">
      <div class="new-title">{{ title }}</div>
      <div class="new-info">
        <span class="new-date">{{ date }}</span>
        <span class="new-read">阅读：{{ read }} 次</span>
      </div>
    </div>
    <img :src="image" alt />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    read: Number,
    image: String,
  },
}
</script>

<style lang="less" scoped>
.new {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}
.new-desc {
  flex: 1;
}
.new-title {
  margin-bottom: 12px;
  line-height: 1.4;
  font-size: 16px;
  color: #212121;
}
.new-info {
  font-size: 12px;
  color: #b4b4b4;
}
.new-date {
  margin-right: 15px;
}
img {
  width: 112px;
  height: 70px;
  margin-left: 30px;
}
</style>
