<template>
  <div class="order-good">
    <div class="title">{{ point ? '积分兑换' : '拼团订单' }}</div>

    <div class="good">
      <img :src="order.picUrl" alt />

      <div class="detail">
        <div class="name">{{ order.name }}</div>

        <!-- <div class="style">
          <div class="color">蓝色</div>
          <div class="size">M号</div>
        </div>-->

        <div class="buy">
          <div v-if="!point" class="price">￥{{ order.price * value }}</div>
          <div v-else class="price price-point">
            <span>{{ order.score * value }}积分</span>
            <span v-if="order.price > 0" class="money"
              >+￥{{ calc(`${value} * ${order.price}`) }}</span
            >
          </div>
          <div class="count">X{{ value }}</div>
        </div>
      </div>
    </div>

    <div class="num">
      <div class="name">购买数量</div>
      <van-stepper :value="value" @change="onChange" />
    </div>
  </div>
</template>

<script>
import { calc } from '@/lib/format'

export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
    point: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    calc,

    onChange(value) {
      this.$emit('change', value)
    },
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
    flex: 1;
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

  .price-point {
    display: flex;
    align-items: center;
    color: #ff4b4b;

    .money {
      margin-left: 12px;
      padding: 1px 3px;
      border-radius: 3px;
      font-size: 14px;
      color: #fff;
      background: #ff4b4b;
    }
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
