<template>
  <div class="new">
    <div class="new-desc">
      <div class="new-title">{{ title }}</div>
      <new-info :date="date.split(' ')[0]" :read="read" />
    </div>
    <img :src="image" alt />
  </div>
</template>

<script>
import NewInfo from './NewInfo'

export default {
  components: {
    NewInfo,
  },

  props: {
    title: String,
    date: {
      type: String,
      default: '',
    },
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
  overflow: hidden;
}
.new-title {
  margin-bottom: 12px;
  line-height: 1.4;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
