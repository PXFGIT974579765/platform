<template>
  <div class="comp-order-goods-status-card" v-wechat-title="$route.meta.title">
    <div class="status">
      <span>{{ status | statusFilter }}</span>
      <span>{{ status | descFilter }}</span>
    </div>
    <span
      class="iconfont icon"
      v-html="$options.filters.iconFilter(status)"
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
    status: '已付款', // 待配送
    desc: '宝贝将在24小时内安排派送',
    icon: '&#xe744;',
  },
  2: {
    status: '配送中',
    desc: '宝贝正在配送中，请保持电话畅通',
    icon: '&#xe741;',
  },
  3: {
    status: '待提货',
    desc: '请尽快到指定地点提货哦',
    icon: '&#xe743;',
  },
  4: {
    status: '已收货', // 待评价
    desc: '祝您购物愉快',
    icon: '&#xe742;',
  },
}

export default {
  props: {
    status: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {}
  },
  methods: {
    onLoad() {},
  },
  filters: {
    statusFilter: function(status) {
      return !ORDER_STATUS[status] ? '未知状态' : ORDER_STATUS[status].status
    },
    descFilter: function(status) {
      return !ORDER_STATUS[status] ? '未知状态' : ORDER_STATUS[status].desc
    },
    iconFilter: function(status) {
      return !ORDER_STATUS[status] ? '&#xe757;' : ORDER_STATUS[status].icon
    },
  },
}
</script>

<style lang="less" scoped>
.comp-order-goods-status-card {
  display: flex;
  justify-content: space-between;
  padding: 25px 15px;
  width: 100%;
  height: 90px;
  background-image: url('../images/bg-status.jpg');

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
