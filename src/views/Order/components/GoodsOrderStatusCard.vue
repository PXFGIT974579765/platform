<template>
  <div
    :class="[
      'comp-order-goods-status-card',
      status === 5 ? 'yellow-bg' : 'green-bg',
    ]"
    v-wechat-title="$route.meta.title"
  >
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
    status: '配货中', // 待配送
    desc: '宝贝将在24小时内安排派送',
    icon: '&#xe744;',
  },
  2: {
    status: '待提货',
    desc: '宝贝正在配送中，请保持电话畅通',
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
