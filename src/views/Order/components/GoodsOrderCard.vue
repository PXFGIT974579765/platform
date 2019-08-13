<template>
  <div class="comp-order-goods-card" v-wechat-title="$route.meta.title">
    <div class="header flex" @click="routeDetail(goods.orderId)">
      <span class="order-no">订单编号: {{ goods.orderId }}</span>
      <span v-if="showStatus" class="status">
        {{ goods.status | statusFilter }}
      </span>
    </div>
    <div class="content flex" @click="routeGoodsPage(goods.goodsId)">
      <img :src="goods.goodsImg" />
      <div class="content-right flex flex-1">
        <div class="detail flex-col">
          <span class="title">{{ goods.goodsName }}</span>
        </div>
        <div class="price">
          <div>￥{{ goods.orderMoney }}</div>
          <div>X{{ goods.goodsSize || 1 }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="total">
        共{{ goods.goodsSize || 1 }}件商品 合计: ￥{{ goods.money }}
      </div>
      <div class="btn-area">
        <router-link
          v-if="goods.status == 0"
          :to="'/point/order?orderId=' + goods.orderId"
          class="btn"
          >付款</router-link
        >
        <span v-if="goods.status == 0" class="btn">取消订单</span>
        <span v-if="goods.status == 1" class="btn">配货中</span>
        <span v-if="goods.status == 2" class="btn">找跑腿</span>
        <span v-if="goods.status == 2" class="btn">上门自提</span>
        <span v-if="goods.status == 3" class="btn">待评价</span>
        <span v-if="goods.status == 3" class="btn">订单详情</span>
      </div>
    </div>
  </div>
</template>

<script>
const ORDER_STATUS = {
  0: '待付款',
  1: '待配送',
  2: '待提货',
  3: '待评价',
  80: '已完成',
  90: '已取消',
}

export default {
  props: {
    showStatus: {
      type: Boolean,
      default: true,
    },
    goods: {
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
    // 商品路由
    routeGoodsPage(goodsId) {
      this.$router.push(`/point/detail/${goodsId}`)
    },
    // 订单详情路由
    routeDetail(orderNo) {
      this.$router.push(`/order/goods-detail/${orderNo}`)
    },
  },
  filters: {
    statusFilter: function(status) {
      let name = ''
      switch (status) {
        case 3:
          name = '已完成'
          break
        case 1:
          name = '配货中'
          break
        default:
          name = ORDER_STATUS[status]
      }
      return name
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
