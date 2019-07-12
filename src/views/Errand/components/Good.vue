<template>
  <div class="goods">
    <div class="block-header">
      <div class="title">跑腿订单</div>
    </div>

    <commodity />

    <div class="address">
      <div class="address-item address-get">
        <div class="type">取</div>
        <div class="detail">
          <div class="name">贵州师范大学花溪校区（创星校园学子实训中心）</div>
          <div class="phone"><span>莫先生</span>19985501144</div>
        </div>
        <div class="button">选择</div>
      </div>

      <div class="address-item address-put">
        <div class="type">送</div>
        <div class="detail">
          <div class="name">贵州师范大学花溪校区-教育科学学院5楼502室</div>
          <div class="phone"><span>马冬梅</span>13314466110</div>
        </div>
        <div class="button">选择</div>
      </div>
    </div>
  </div>
</template>

<script>
import Commodity from './Commodity'

export default {
  components: {
    Commodity,
  },
}
</script>

<style lang="less" scoped>
.commodity {
  margin-bottom: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
}

.address-item {
  display: flex;
  line-height: 1.5;

  .type {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin: 0.3em 15px 0 0;
    border-radius: 100%;
    font-size: 12px;
    color: #fff;
    background-color: #029eff;
  }
  &.address-put .type {
    background-color: #1cd547;
  }
  .detail {
    flex: 1;
  }
  .name {
    margin-bottom: 10px;
    font-size: 15px;
    color: #585858;
  }
  .phone {
    font-size: 12px;
    color: #a4a4a4;
  }
  .button,
  .detail {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #c8c8c8;
  }
  .button {
    margin-top: 0.1em;
    padding-left: 15px;
    font-size: 13px;
    color: #029eff;
  }
}
</style>
