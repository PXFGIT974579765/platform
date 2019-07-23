<template>
  <div class="distribution">
    <div class="header">
      <div class="title">配送方式</div>
      <div class="method">门店自提</div>
      <div class="link">说明</div>
    </div>

    <div class="detail">
      <div class="item">
        <div class="item-name">自提地点:</div>
        <div class="item-value">
          贵阳市花溪大学城贵州师范大学科创园B5栋负一层
        </div>
      </div>
      <div class="item">
        <div class="item-name">联系客服:</div>
        <div class="item-value">
          <div class="name">白小姐</div>
          <span class="phone">19985501144</span>
          <a class="call" href="tel:18475555555">
            <span class="iconfont">&#xe747;</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.distribution {
  margin: 8px 0;
  padding: 20px 15px;
  background: #fff;
}

.header {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: solid 1px #d7d7d7;
  font-size: 15px;

  .title {
    flex: 1;
    font-weight: 700;
  }

  .link {
    margin-left: 20px;
    color: #818181;
  }
}

.detail {
  border-bottom: solid 1px #d7d7d7;
}

.item {
  display: flex;
  margin-bottom: 20px;
  line-height: 1.4;
  color: #a4a4a4;
}

.item-value {
  flex: 1;
  display: flex;
  margin-left: 8px;
  color: #4f4f4f;
}

.phone {
  flex: 1;
  margin-left: 15px;
}

.call .iconfont {
  line-height: 1;
  font-size: 20px;
  color: #029eff;
}
</style>
