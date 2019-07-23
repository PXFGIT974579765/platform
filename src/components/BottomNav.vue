<template>
  <van-tabbar route active-color="#00afa5" inactive-color="#313131">
    <van-tabbar-item to="/home">
      <span>首页</span>
      <span v-if="props.active" slot="icon" slot-scope="props" class="iconfont"
        >&#xe727;</span
      >
      <span v-else slot="icon" class="iconfont">&#xe726;</span>
    </van-tabbar-item>
    <van-tabbar-item to="/app">
      <span>应用</span>
      <span v-if="props.active" slot="icon" slot-scope="props" class="iconfont"
        >&#xe725;</span
      >
      <span v-else slot="icon" class="iconfont">&#xe75f;</span>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <span>我的</span>
      <span v-if="props.active" slot="icon" slot-scope="props" class="iconfont"
        >&#xe724;</span
      >
      <span v-else slot="icon" class="iconfont">&#xe75d;</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
.van-tabbar-item .iconfont {
  color: #adadad;
}

.van-tabbar-item--active .iconfont {
  color: #00afa5;
}
</style>
