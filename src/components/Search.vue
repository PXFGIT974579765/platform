<template>
  <div class="search">
    <span class="iconfont">&#xe74a;</span>
    <input type="search" placeholder="输入关键字搜索" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  border-radius: 15px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
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
  color: #fff;
  background: transparent;

  &::placeholder {
    color: #fff;
  }
}

.iconfont {
  position: absolute;
  left: 12px;
  top: 50%;
  font-size: 13px;
  transform: translateY(-50%);
}
</style>
