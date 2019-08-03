<template>
  <div class="comp-coupon flex">
    <div class="coupon-left flex-col">
      <span :class="[coupon.status === 1 ? 'color0' : 'color1']">
        <span :class="[coupon.status === 3 ? 'color1' : 'color0']">￥</span>
        <span :class="['amount', coupon.status === 3 ? 'color1' : 'color0']">{{
          coupon.minGoodsAmount
        }}</span>
      </span>
      <span
        :class="[
          'name',
          coupon.status === 3 ? 'color1' : 'color0',
          coupon.status === 3 ? 'name-bg1' : 'name-bg0',
        ]"
        >超值神券</span
      >
    </div>
    <div class="coupon-right flex flex-1">
      <div class="desc-block flex-1">
        <div class="desc">{{ coupon.name }}</div>
        <span
          :class="[
            'detail-desc',
            coupon.status === 3 ? 'color1' : 'color0',
            coupon.status === 3 ? 'border1' : 'border0',
          ]"
          >满 {{ coupon.minGoodsAmount }} 减 {{ coupon.typeMoney }}</span
        >
        <div class="time">
          {{ coupon.useStartDate | dateFilter }} -
          {{ coupon.useEndDate | dateFilter }}
        </div>
      </div>
      <div :class="['btn-status', coupon.status === 1 ? 'btn-bg0' : 'btn-bg1']">
        {{
          coupon.status === 1
            ? '未使用'
            : coupon.status === 2
            ? '已使用'
            : '已过期'
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coupon: Object,
  },

  filters: {
    dateFilter: value => value.slice(0, 10),
  },
}
</script>

<style lang="less" scoped>
.comp-coupon {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;

  .color0 {
    color: #ea662c !important;
  }

  .color1 {
    color: #ababab !important;
  }

  .border0 {
    border: 1px solid #f7b551;
  }

  .border1 {
    border: 1px solid #8d8d8d;
  }

  .name-bg0 {
    background-color: #f5ece0;
  }

  .name-bg1 {
    background-color: #fbf6f6;
  }

  .btn-bg0 {
    background-color: #07c2af;
  }
  .btn-bg1 {
    background-color: #ababab;
  }

  .coupon-left {
    position: relative;
    width: 95px;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-right: 1px dashed #ea662c;

    &::after {
      content: ' ';
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #f4f4f4;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      border-radius: 10px;
    }

    span {
      font-size: 12px;
      color: #ea662c;
    }

    .amount {
      font-size: 27px;
      font-weight: bold;
    }

    .name {
      border-radius: 10px;
      margin-top: 15px;
      padding: 3px 6px;
    }
  }

  .coupon-right {
    position: relative;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    &::before {
      content: ' ';
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #f4f4f4;
      left: 0;
      bottom: 0;
      transform: translate(-50%, 50%);
      border-radius: 10px;
    }

    .desc-block {
      margin-left: 20px;
    }

    .btn-status {
      width: 55px;
      height: 25px;
      margin-right: 13px;
      line-height: 25px;
      border-radius: 15px;
      font-size: 13px;
      color: #fff;
      text-align: center;
    }

    .desc {
      font-size: 18px;
      font-weight: bold;
    }

    .detail-desc {
      margin-top: 10px;
      display: inline-block;
      font-size: 10px;
      border-radius: 10px;
      text-align: center;
      padding: 3px;
    }

    .time {
      margin-top: 10px;
      font-size: 12px;
      color: #8d8d8d;
    }
  }
}
</style>
