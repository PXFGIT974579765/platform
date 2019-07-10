<template>
  <div :class="['search', { light: !!light }]">
    <span class="iconfont">&#xe74a;</span>
    <input type="search" placeholder="输入关键字搜索" />
  </div>
</template>

<script>
export default {
  props: {
    light: Boolean,
  },
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  border-radius: 15px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);

  &.light {
    color: #919191;
    background-color: #f4f4f4;
  }
}

input {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px 0 30px;
  border: 0;
  outline: 0;
  font-size: 12px;
  background: transparent;

  &::placeholder {
    color: #fff;
  }
}

.search.light input::placeholder {
  color: #919191;
}

.iconfont {
  position: absolute;
  left: 12px;
  top: 50%;
  font-size: 13px;
  transform: translateY(-50%);
}
</style>
