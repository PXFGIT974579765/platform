<template>
  <div class="page-order-goods-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <GroupOrderStatusCard
        :status="group.status"
        :orderStatus="group.orderStatus"
      />
      <AddressCard :contact="group.contact" />
      <div class="goods-item">
        <Card :group="group" :showStatus="false" @cancelOrder="cancelOrder" />
      </div>
      <div class="price-group">
        <div class="price-item flex">
          <span>商品总价</span>
          <span>￥{{ group.orderMoney }}</span>
        </div>
        <div class="price-item flex">
          <span>优惠</span>
          <span>￥{{ -group.couponMoney }}</span>
        </div>
        <div class="price-item flex total">
          <span>订单总价</span>
          <span>￥{{ group.orderMoney - group.couponMoney }}</span>
        </div>
        <div class="price-item flex actual">
          <span>{{ group.status === 5 ? '退款金额' : '实付款' }}</span>
          <span style="color: #ff6c00"
            >￥{{ group.orderMoney - group.couponMoney }}</span
          >
        </div>
      </div>

      <div class="order-info" v-if="group.status != -5">
        <div class="title">订单信息</div>
        <div class="order-item">
          <span>订单状态 :</span>
          <span>{{ orderStatusFilter(group.orderStatus, group.status) }}</span>
        </div>
        <div class="order-item">
          <span>个人积分 :</span>
          <span>获得{{ group.userGetScore }}点积分</span>
        </div>
        <div class="order-item">
          <span>订单编号 :</span>
          <span>{{ group.orderId }}</span>
        </div>
        <div class="order-item">
          <span>创建时间 :</span>
          <span>{{ group.createTime }}</span>
        </div>
        <div class="order-item">
          <span>付款时间 :</span>
          <span>{{ group.payTime }}</span>
        </div>
      </div>

      <div class="order-info" v-else>
        <div class="title">订单信息</div>
        <div class="order-item">
          <span>订单状态 :</span>
          <span>{{ orderStatusFilter(group.orderStatus, group.status) }}</span>
        </div>
        <div class="order-item">
          <span>退款金额 :</span>
          <span>￥{{ group.backMoney.money }}</span>
        </div>
        <div class="order-item">
          <span>退款编号 :</span>
          <span>{{ group.backMoney.id }}</span>
        </div>
        <div class="order-item">
          <span>退款时间 :</span>
          <span>{{ group.backMoney.createTime }}</span>
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
import GroupOrderStatusCard from './GroupOrderStatusCard'
import AddressCard from './AddressCard'
import Card from './GroupOrderCard'

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

const PAY_STATUS = {
  '-1': '支付失败',
  '-2': '订单超时',
  '-4': '异常关闭',
  '-5': '已退款',
}
export default {
  components: {
    GroupOrderStatusCard,
    Card,
    AddressCard,
  },
  data() {
    return {
      group: {
        orderNo: '557879582',
        imgUrl: require('../images/good.png'),
        title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
        tagName: '标准套餐',
        tagDesc: '白色-定制版',
        num: 1, // 数量
        price: 189, // 单价
        couponAmount: 11, // 优惠金额
        amount: 189, // 总金额 = 单价*数量
        status: 5,
        score: 200,
        creatTime: 1500000000,
        payTime: 1500000000,
        refundNo: 1500004948, // 退款编号
        refundTime: 150000000, // 退款时间
        refundStatus: 1, // 0 没有退款  1 退款中  2 已退款
        contact: {
          name: '刘国贵',
          phone: '19985501144',
          address: '贵州省贵阳市花溪区大学城贵州师范大学B1男生素质302寝室',
        },
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchOrderDetail(id)
  },
  methods: {
    // 状态显示过滤
    orderStatusFilter: function(orderStatus, status) {
      let name = ''
      // 订单状态
      switch (orderStatus) {
        case 50:
          name = '已完成'
          break
        case 2:
          name = '拼团成功'
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
    // 拉去详情信息
    fetchOrderDetail(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getPT', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.group = data.datas
          }
        })
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/cancelPT', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$router.push('/order/group')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-goods-detail {
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
