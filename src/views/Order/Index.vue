<template>
  <div class="page-my-order-first" v-wechat-title="$route.meta.title">
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item v-for="item in orderType" :key="item.goodsType">
        <router-link :to="item.goodsType | toFilter" class="type-item flex-col">
          <div class="flex-col item-icon">
            <span
              :style="{ color: colorFilter(item.goodsType) }"
              class="iconfont icon"
              v-html="iconFilter(item.goodsType)"
            ></span>
            <span class="name">{{ item.goodsType | nameFilter }}</span>
          </div>
          <div class="tag" v-if="item.num > 0">{{ item.num }}</div>
        </router-link>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
const TYPE_HASH = {
  HD: {
    icon: '&#xe769;',
    name: '活动订单',
    color: '#ffd163',
    to: '/order/active',
  },
  PT: {
    icon: '&#xe76c;',
    name: '拼团订单',
    color: '#ff766e',
    to: '/order/group',
  },
  JFSC: {
    icon: '&#xe76b;',
    name: '商品订单',
    color: '#55c2ff',
    to: '/order/goods',
  },
  DY: {
    icon: '&#xe76a;',
    name: '打印订单',
    color: '#b985ff',
    to: '',
  },
  ZN: {
    icon: '&#xe767;',
    name: '租赁订单',
    color: '#6cf088',
    to: '',
  },
  RT: {
    icon: '&#xe766;',
    name: '跑腿订单',
    color: '#4ac1ff',
    to: '/errand/orders',
  },
}

export default {
  data() {
    return {
      orderType: [],
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      this.$http
        .get('/api-wxmp/cxxz/order/myOrder/statistics')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const type = data.datas.filter(item => !!TYPE_HASH[item.goodsType])
            this.orderType = type
          }
        })
    },
    colorFilter(goodsType) {
      return TYPE_HASH[goodsType].color
    },
    iconFilter(goodsType) {
      return TYPE_HASH[goodsType].icon
    },
  },
  filters: {
    toFilter: goodsType => TYPE_HASH[goodsType].to,
    iconFilter: goodsType => TYPE_HASH[goodsType].icon,
    nameFilter: goodsType => TYPE_HASH[goodsType].name,
  },
}
</script>

<style lang="less" scoped>
.page-my-order-first {
  padding: 35px 0;

  .type-item {
    position: relative;
    width: 100%;
    height: 105px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: #fff;

    .item-icon {
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 29px;
      height: 29px;
      font-size: 29px !important;
    }

    .name {
      margin-top: 11px;
      font-size: 15px;
      color: #585858;
    }

    .tag {
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px 6px;
      border-radius: 10px;
      font-size: 13px;
      background: #ff3d3d;
      color: #fff;
    }
  }
}
</style>
