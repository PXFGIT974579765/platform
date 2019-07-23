<template>
  <div class="person-desc">
    <img src="~@/assets/images/avatar.png" alt class="avatar" />
    <div class="desc">
      <div>
        <span class="name">Hi 小刘哥</span>
        <span class="level"
          ><span class="iconfont vip-icon">&#xe770;</span>黄金会员</span
        >
      </div>
      <div>
        <span class="iconfont">&#xe771;</span>
        <span class="age">22</span>
        <span class="university">贵州师范大学</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.person-desc {
  display: flex;
  align-items: center;
  color: #fff;
}

.avatar {
  width: 55px;
  height: 55px;
  margin-right: 15px;
  border-radius: 100%;
}

.desc > div {
  display: flex;
  align-items: center;
}

.desc > div:last-child {
  margin-top: 8px;
  font-size: 12px;
}

.desc .vip-icon {
  color: #f3f2f0 !important;
}

.name {
  font-size: 20px;
}

.level {
  height: 20px;
  line-height: 20px;
  margin-left: 13px;
  padding: 0 5px;
  border-radius: 6px;
  font-size: 12px;
  background-image: linear-gradient(25deg, #eec983 0%, #f7dcb2 100%),
    linear-gradient(#0cde8d, #0cde8d);
  background-blend-mode: normal, normal;
}

.iconfont {
  font-size: 12px;
  margin-right: 7px;
  color: #0072ff;
}

.age {
  margin-right: 10px;
}
</style>
