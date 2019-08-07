<template>
  <div class="manufacturer">
    <div class="header">
      <div class="title">厂商：贵州省莫白传媒科技有限公司</div>
      <div class="desc">往期拼团</div>
    </div>

    <div class="list">
      <div class="item">
        <img src="~@/assets/images/group_good.png" alt />
        <div class="detail">
          <div class="name">新款时尚简约休闲小西服阔腿短裤韩国两件</div>
          <div class="other">
            <div class="count">5-10人团</div>
            <div class="result">拼团成功</div>
          </div>
        </div>
      </div>

      <div class="item">
        <img src="~@/assets/images/group_good.png" alt />
        <div class="detail">
          <div class="name">新款时尚简约休闲小西服阔腿短裤韩国两件</div>
          <div class="other">
            <div class="count">5-10人团</div>
            <div class="result">拼团成功</div>
          </div>
        </div>
      </div>

      <div class="item">
        <img src="~@/assets/images/group_good.png" alt />
        <div class="detail">
          <div class="name">新款时尚简约休闲小西服阔腿短裤韩国两件</div>
          <div class="other">
            <div class="count">5-10人团</div>
            <div class="result">拼团成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.manufacturer {
  padding: 0 15px;
}

.header {
  display: flex;
  padding: 14px 0;
  font-size: 12px;
  color: #888;
}

.title {
  flex: 1;
}

.desc {
  color: #ff4444;
}

.item {
  display: flex;
  padding: 20px 0;
  border-top: solid 1px #dcdcdc;
}

.detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  width: 100px;
  height: 100px;
  margin-right: 12px;
  border-radius: 3px;
}

.name {
  line-height: 1.5;
  font-size: 18px;
  color: #222222;
}

.other {
  display: flex;
  align-items: center;
}

.count {
  width: 62px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 2px;
  font-size: 13px;
  color: #fff;
  background-image: linear-gradient(#f94141, #f94141),
    linear-gradient(#ff4444, #ff4444);
}

.result {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: #ff4444;
}
</style>
