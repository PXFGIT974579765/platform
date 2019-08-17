<template>
  <div class="comp-order-distribution-card" v-wechat-title="$route.meta.title">
    <router-link :to="`/my/distribution-detail/${order.id}`">
      <div class="header flex">
        <span class="order-no">跑腿编号: {{ order.orderId }}</span>
        <span v-if="showStatus" class="status">
          {{ order.status | statusFilter }}
        </span>
      </div>
      <div class="content flex">
        <img :src="order.goodsImg" />
        <div class="content-right flex flex-1">
          <div class="detail flex-col">
            <span class="title">{{ order.goodsName }}</span>
          </div>
          <div class="price">
            <div>￥{{ order.distributionPrice }}</div>
            <div>X 1</div>
          </div>
        </div>
      </div>
    </router-link>
    <div class="footer">
      <div class="total">共 1 件商品 合计: ￥{{ order.distributionPrice }}</div>
      <div class="btn-area">
        <span v-if="order.status !== 5" class="btn">用户未评价</span>
        <span v-else class="btn" @click="onShowDialog(order.orderId)"
          >已评价</span
        >
        <router-link :to="`/my/distribution-detail/${order.id}`" class="btn"
          >查看详情</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
const ORDER_STATUS = {
  0: '取货中',
  1: '派送中',
  2: '已完成',
  3: '已完成',
  5: '已评价',
}

// const APPRAISE_STATUS = 5

export default {
  props: {
    showStatus: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    onShowDialog(id) {
      this.$emit('onShowDialog', id)
    },
  },
  filters: {
    statusFilter: function(status) {
      return ORDER_STATUS[status]
    },
  },
}
</script>

<style lang="less" scoped>
.comp-order-distribution-card {
  .header {
    justify-content: space-between;
    font-size: 13px;

    .order-no {
      color: #585858;
    }

    .status {
      color: #ff6c00;
    }
  }

  .content {
    margin-top: 18px;

    img {
      width: 85px;
      height: 85px;
    }

    .content-right {
      margin-left: 11px;
      justify-content: space-between;

      .detail {
        margin-right: 15px;

        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 20px;
          font-size: 13px;
          color: #2d2d2d;
        }

        .tag {
          margin-top: 13px;
          font-size: 12px;
          color: #c0c0c0;
        }
      }

      .price {
        text-align: right;
        font-size: 13px;
        color: #2d2d2d;

        div:last-child {
          margin-top: 14px;
          color: #2d2d2d;
        }
      }
    }
  }

  .footer {
    margin-top: 18px;
    text-align: right;

    .total {
      font-size: 13px;
      color: #2d2d2d;
    }

    .btn-area {
      margin-top: 21px;

      .btn {
        display: inline-block;
        margin-left: 12px;
        padding: 1px 9px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;
        color: #06bcbf;
        border: 1px solid #06bcbf;
      }
    }
  }
}
</style>
