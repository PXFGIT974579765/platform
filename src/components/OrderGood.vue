<template>
  <div class="order-good">
    <div class="title">拼团订单</div>

    <div class="good">
      <img :src="order.picUrl" alt />

      <div class="detail">
        <div class="name">{{ order.name }}</div>

        <!-- <div class="style">
          <div class="color">蓝色</div>
          <div class="size">M号</div>
        </div>-->

        <div class="buy">
          <div class="price">￥{{ order.price * value }}</div>
          <div class="count">X{{ value }}</div>
        </div>
      </div>
    </div>

    <div class="num">
      <div class="name">购买数量</div>
      <van-stepper v-model="value" />
    </div>
  </div>
</template>

<script>
// import {
//   atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
// } from 'mathjs'

export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      value: 1,
    }
  },
}
</script>

<style lang="less" scoped>
.order-good {
  margin: 8px 0;
}

.good {
  display: flex;
  padding: 15px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .name {
    line-height: 1.4;
    font-size: 16px;
    color: #4e4e4e;
  }

  // .style {
  //   display: flex;
  //   margin: 10px 0 15px;
  //   font-size: 13px;
  //   color: #ababab;
  // }

  // .color {
  //   margin-right: 15px;
  // }

  .buy {
    display: flex;
    align-items: center;
  }

  .price {
    flex: 1;
    font-size: 16px;
    color: #232323;
  }

  .count {
    font-size: 13px;
    color: #6e6e6e;
  }
}

.title,
.num {
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  background: #fff;
}

.num {
  display: flex;

  .name {
    flex: 1;
  }
}
</style>
