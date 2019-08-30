<template>
  <div
    :class="[
      'comp-order-goods-status-card',
      status < 0 ? 'yellow-bg' : 'green-bg',
    ]"
    v-wechat-title="$route.meta.title"
  >
    <div class="status">
      <span>{{ statusFilter(orderStatus, status) }}</span>
      <span>{{ descFilter(orderStatus, status) }}</span>
    </div>
    <span
      class="iconfont icon"
      v-html="$options.methods.iconFilter(orderStatus, status)"
    ></span>
  </div>
</template>

<script>
const ORDER_STATUS = {
  0: {
    status: '待付款',
    desc: '请尽快付款',
    icon: '&#xe757;',
  },
  1: {
    status: '拼团中',
    desc: '拼团正在进行中',
    icon: '&#xe744;',
  },
  2: {
    status: '配货中', // 待配送
    desc: '宝贝将在24小时内完成配货',
    icon: '&#xe741;',
  },
  3: {
    status: '待提货', // 待提货
    desc: '可以选择找跑腿或上门自提',
    icon: '&#xe741;',
  },
  50: {
    status: '已完成', // 待评价
    desc: '可以对服务进行评价',
    icon: '&#xe743;',
  },
  80: {
    status: '已完成', // 待评价
    desc: '祝您购物愉快',
    icon: '&#xe742;',
  },
  90: {
    status: '已取消',
    desc: '钱款或积分已原路返回',
    icon: '&#xe744;',
  },
  91: {
    status: '拼团失败',
    desc: '请选择其他拼团',
    icon: '&#xe744;',
  },
}

const PAY_STATUS = {
  '-1': {
    status: '支付失败',
    desc: '请尽快付款',
    icon: '&#xe757;',
  },
  '-2': {
    status: '订单超时', // 待配送
    desc: '订单已超时',
    icon: '&#xe744;',
  },
  '-4': {
    status: '异常关闭',
    desc: '订单异常关闭',
    icon: '&#xe741;',
  },
  '-5': {
    status: '已退款',
    desc: '钱款或积分已原路返回',
    icon: '&#xe743;',
  },
}

export default {
  props: {
    status: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  methods: {
    statusFilter: function(orderStatus, payStatus) {
      let name = ORDER_STATUS[orderStatus].status
      if (parseInt(payStatus) < 0) {
        const payName = PAY_STATUS[payStatus].status
        if (payName) {
          name = payName
        }
      }
      return name || '未知状态'
    },
    descFilter: function(orderStatus, payStatus) {
      let name = ORDER_STATUS[orderStatus].desc
      if (parseInt(payStatus) < 0) {
        const payName = PAY_STATUS[payStatus].desc
        if (payName) {
          name = payName
        }
      }
      return name || '未知状态'
    },
    iconFilter: function(orderStatus, payStatus) {
      let name = ORDER_STATUS[orderStatus].icon
      if (parseInt(payStatus) < 0) {
        const payName = PAY_STATUS[payStatus].icon
        if (payName) {
          name = payName
        }
      }
      return name || '&#xe757;'
    },
  },
  filters: {},
}
</script>

<style lang="less" scoped>
.green-bg {
  background-color: #06bcbf;
}

.yellow-bg {
  background-color: #f39800;
}
.comp-order-goods-status-card {
  display: flex;
  justify-content: space-between;
  padding: 25px 15px;
  width: 100%;
  height: 90px;

  .status {
    display: flex;
    flex-direction: column;
    color: #fff;

    span {
      letter-spacing: 1px;

      &:first-child {
        font-size: 18px;
        font-weight: bold;
      }

      &:last-child {
        margin-top: 9px;
        font-size: 13px;
      }
    }
  }

  .icon {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 50px;
    color: #fff;
  }
}
</style>
