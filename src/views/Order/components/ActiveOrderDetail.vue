<template>
  <div class="page-order-active-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="goods-item">
        <Card
          :active="active"
          :showStatus="false"
          :showPrice="false"
          :showStatusBtn="true"
          @cancelOrder="cancelOrder"
        />
      </div>
      <div class="price-group">
        <div class="price-item flex">
          <span>活动收费</span>
          <span>￥{{ active.price }}</span>
        </div>
        <div class="price-item flex">
          <span>优惠</span>
          <span>-{{ active.couponMoney }}</span>
        </div>
        <div class="price-item flex total">
          <span>订单总价</span>
          <span>￥{{ active.orderMoney }}</span>
        </div>
        <div class="price-item flex actual">
          <span>实付款</span>
          <span style="color: #ff6c00">￥{{ active.money }}</span>
        </div>
      </div>

      <div class="order-info">
        <div class="title">
          {{ active.status != -5 ? '订单信息' : '退款信息' }}
        </div>
        <div class="order-item">
          <span>订单状态 :</span>
          <span>{{
            orderStatusFilter(active.orderStatus, active.status)
          }}</span>
        </div>
        <div class="order-item">
          <span>个人积分 :</span>
          <span>获得{{ active.userGetScore }}点积分</span>
        </div>
        <div class="order-item">
          <span>订单编号 :</span>
          <span>{{ active.orderId }}</span>
        </div>
        <div class="order-item">
          <span>创建时间 :</span>
          <span>{{ active.createTime }}</span>
        </div>
        <div class="order-item">
          <span>付款时间 :</span>
          <span>{{ active.payTime }}</span>
        </div>
      </div>

      <div class="contact flex">
        <span class="iconfont icon">&#xe745;</span>
        <span>联系客服</span>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './ActiveOrderCard'

const ORDER_STATUS = {
  0: '待付款',
  1: '进行中',
  2: '已结束',
  50: '待评价',
  80: '已完成',
  90: '已取消',
}

const PAY_STATUS = {
  '-1': '支付失败',
  '-2': '订单超时',
  '-4': '异常关闭',
  '-5': '已退款',
}
export default {
  components: {
    Card,
  },
  data() {
    return {
      active: {
        activeNo: '557879582',
        imgUrl: require('../images/active1.jpg'),
        title: '刀剑2贵州赛区英雄争霸赛',
        tag: 'race',
        price: 20,
        score: 20,
        couponAmount: 0,
        createTime: 1500000000,
        payTime: 1500000000,
        time: 1500000000,
        address: '贵州大学城师范学院 同心路15号 （创星校园实训中心）',
        signStatus: 0, // 签到状态  0 未签到 1 已签到
        status: 0,
        refundStatus: 0, // 0 没有退款  1 退款中  2 已退款
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchOrderDetail(id)
  },
  methods: {
    // 拉去详情信息
    fetchOrderDetail(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getHD', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.active = data.datas
          }
        })
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/cancelHD', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$router.push('/order/active')
          }
        })
    },
    // 状态显示过滤
    orderStatusFilter: function(orderStatus, status) {
      let name = ''
      // 订单状态
      switch (orderStatus) {
        case 50:
          name = '已完成'
          break
        default:
          name = ORDER_STATUS[orderStatus]
      }
      // 支付状态
      if (parseInt(status) < 0) {
        const payStatus = PAY_STATUS[status]
        if (payStatus) {
          name = payStatus
        }
      }
      return name
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-active-detail {
  .container {
    padding-bottom: 10px;

    .goods-item {
      margin: 10px 0 0;
      width: 100%;
      padding: 21px 15px 9px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }

    .price-group {
      padding: 16px 15px;
      background-color: #fff;

      .price-item {
        margin-top: 10px;
        justify-content: space-between;
        font-size: 12px;
        color: #8d8d8d;

        &:first-child {
          margin-top: 0;
        }
      }

      .total {
        padding-bottom: 16px;
        font-size: 13px;
        color: #2d2d2d;
        border-bottom: 1px solid #eee;
      }

      .actual {
        font-size: 13px;
        color: #2d2d2d;
      }
    }

    .order-info {
      margin: 10px 0 0;
      padding: 21px 13px 25px;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      .title {
        font-size: 14px;
        color: #2d2d2d;
      }

      .order-item {
        margin-top: 10px;
        font-size: 12px;
        color: #8d8d8d;

        span:last-child {
          margin-left: 10px;
        }
      }
    }

    .contact {
      justify-content: center;
      align-items: center;
      height: 45px;
      background-color: #fff;

      .icon {
        margin-right: 11px;
        color: #00a2ff;
      }
    }
  }
}
</style>
