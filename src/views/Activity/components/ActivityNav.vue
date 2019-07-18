<template>
  <div class="category">
    <router-link to="/activity/list/1" class="category-item">
      <div class="icon">
        <span class="iconfont">&#xe73c;</span>
      </div>
      <div class="name">公益</div>
    </router-link>

    <router-link to="/activity/list/1" class="category-item">
      <div class="icon">
        <span class="iconfont">&#xe73d;</span>
      </div>
      <div class="name">考试</div>
    </router-link>

    <router-link to="/activity/list/1" class="category-item">
      <div class="icon">
        <span class="iconfont">&#xe73a;</span>
      </div>
      <div class="name">比赛</div>
    </router-link>

    <router-link to="/activity/list/1" class="category-item">
      <div class="icon">
        <span class="iconfont">&#xe729;</span>
      </div>
      <div class="name">兴趣</div>
    </router-link>

    <router-link to="/activity/list/1" class="category-item">
      <div class="icon">
        <span class="iconfont">&#xe737;</span>
      </div>
      <div class="name">技能</div>
    </router-link>
  </div>
</template>

.<script>
export default {}
</script>

<style lang="less" scoped>
.category {
  display: flex;
  margin: 8px 0;
  background: #fff;
}

.category-item {
  flex: 1;
  text-align: center;

  .icon {
    margin: 22px auto 10px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 100%;
    background-image: linear-gradient(180deg, #ff3232 0%, #ff766e 100%);
  }

  &:nth-child(2) .icon {
    background-image: linear-gradient(180deg, #248afd 0%, #55c2ff 100%);
  }
  &:nth-child(3) .icon {
    background-image: linear-gradient(180deg, #16b459 0%, #6cf088 100%);
  }
  &:nth-child(4) .icon {
    background-image: linear-gradient(180deg, #ff6c00 0%, #ffd163 100%);
  }
  &:nth-child(5) .icon {
    background-image: linear-gradient(180deg, #7c5eff 0%, #b985ff 100%);
  }

  .iconfont {
    color: #fff;
  }

  .name {
    margin-bottom: 17px;
    color: #2d2d2d;
  }
}
</style>
