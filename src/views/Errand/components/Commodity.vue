<template>
  <div class="commodity">
    <img :src="good.goodsImg" alt />
    <div class="commodity-content">
      <div class="name">{{ good.goodsName }}</div>
      <!-- <div class="type">标准套餐：白色-定制版</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    good: Object,
  },
}
</script>

<style lang="less" scoped>
.commodity {
  display: flex;

  img {
    width: 70px;
    height: 70px;
    margin-right: 14px;
    border-radius: 2px;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name {
    line-height: 1.5;
    font-size: 15px;
    color: #2d2d2d;
  }

  .type {
    font-size: 13px;
    color: #c0c0c0;
  }
}
</style>
