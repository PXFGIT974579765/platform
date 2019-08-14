<template>
  <div class="comp-order-goods-card" v-wechat-title="$route.meta.title">
    <div class="header flex">
      <span class="order-no">订单编号: {{ group.orderId }}</span>
      <span v-if="showStatus" class="status">
        {{ group.status | statusFilter }}
      </span>
    </div>
    <router-link :to="'/order/group-detail/' + group.orderId">
      <div class="content flex">
        <img :src="group.goodsImg" />
        <div class="content-right flex flex-1">
          <div class="detail flex-col">
            <span class="title">{{ group.goodsName }}</span>
            <span class="tag">{{ group.tagName }}: {{ group.tagDesc }}</span>
          </div>
          <div class="price">
            <div>￥{{ group.orderMoney }}</div>
            <div>X{{ group.goodsSize || 1 }}</div>
          </div>
        </div>
      </div>
    </router-link>
    <div class="footer">
      <div class="total">
        共{{ group.goodsSize || 1 }}件商品 合计: ￥{{ group.money }}
      </div>
      <div class="btn-area">
        <span class="btn">等待提货</span>
        <router-link :to="`/errand/lobby?order=${group.orderId}`" class="btn"
          >找跑腿</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
const ORDER_STATUS = {
  0: '待付款',
  1: '拼团中',
  2: '待配送',
  3: '待提货',
  50: '待评价',
  80: '已完成',
  90: '已取消',
  91: '拼团失败',
}

export default {
  props: {
    showStatus: {
      type: Boolean,
      default: true,
    },
    group: {
      type: Object,
      default: function() {
        return {
          orderNo: '557879582',
          imgUrl: '../images/good.png',
          title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
          tagName: '标准套餐',
          tagDesc: '白色-定制版',
          num: 1, // 数量
          price: 189, // 单价
          amount: 189, // 总金额 = 单价*数量
          status: 0,
        }
      },
    },
  },
  data() {
    return {
      active: '0',
      keyword: '',
    }
  },
  methods: {
    onLoad() {},
  },
  filters: {
    statusFilter: function(status) {
      return ORDER_STATUS[status]
    },
  },
}
</script>

<style lang="less" scoped>
.comp-order-goods-card {
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
        width: 75px;
        height: 30px;
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
