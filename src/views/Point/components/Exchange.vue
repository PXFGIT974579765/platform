<template>
  <div class="exchange">
    <div class="filter">
      <div class="filter-title">商品筛选</div>
      <div class="methods">
        <div class="method">食品零食</div>
        <div class="method">按人气</div>
        <div class="method">按积分</div>
      </div>
    </div>

    <van-grid :gutter="15" :column-num="2" class="list">
      <van-grid-item to="/point/detail/1">
        <div class="list-item">
          <img src="~@/assets/images/group_item.png" alt />
          <div class="name">JIEMO小众波点连衣裙法式复古</div>
          <div class="point"><span class="count">5000</span>积分</div>
        </div>
      </van-grid-item>

      <van-grid-item to="/point/detail/1">
        <div class="list-item">
          <img src="~@/assets/images/group_item.png" alt />
          <div class="name">JIEMO小众波点连衣裙法式复古</div>
          <div class="point"><span class="count">5000</span>积分</div>
        </div>
      </van-grid-item>

      <van-grid-item to="/point/detail/1">
        <div class="list-item">
          <img src="~@/assets/images/group_item.png" alt />
          <div class="name">JIEMO小众波点连衣裙法式复古</div>
          <div class="point"><span class="count">5000</span>积分</div>
        </div>
      </van-grid-item>

      <van-grid-item to="/point/detail/1">
        <div class="list-item">
          <img src="~@/assets/images/group_item.png" alt />
          <div class="name">JIEMO小众波点连衣裙法式复古</div>
          <div class="point"><span class="count">5000</span>积分</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  padding: 14px 15px;
  color: #585858;
  background: #fff;
}

.filter-title {
  flex: 1;
}

.methods {
  display: flex;
}

.method {
  margin-left: 25px;

  &:first {
    margin: 0;
  }
}

.list {
  margin: 15px 0;

  &-item {
    background-color: #ffffff;
    border-radius: 4px;
  }

  img {
    border-radius: 4px 4px 0px 0px;
  }

  .name {
    margin: 8px 8px 8px;
    line-height: 1.5;
    font-size: 16px;
    color: #4e4e4e;
  }

  .point {
    margin-bottom: 15px;
    padding: 0 8px;
    color: #646464;
  }

  .count {
    margin-right: 6px;
    font-size: 15px;
    color: #ff6c00;
  }
}

.list /deep/ .van-grid-item__content {
  align-items: flex-start;
  padding: 0;
  background: transparent;
  &::after {
    display: none;
  }
}
</style>
