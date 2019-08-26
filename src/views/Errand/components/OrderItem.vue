<template>
  <div class="order-item">
    <div class="order-item-header">
      <div class="no">跑腿编号：{{ order.id }}</div>
      <div class="status">{{ toText(order.status) }}</div>
    </div>

    <commodity :good="order" />

    <div class="address">
      <div class="address-item address-get">
        <div class="type"></div>
        <div class="name van-ellipsis">
          贵州师范大学花溪校区（创星学子实训中心实训中心）
        </div>
      </div>
      <div class="address-item address-put">
        <div class="type"></div>
        <div class="name van-ellipsis">
          贵州师范大学花溪校区-教育科学学院5楼502室院5楼502室
        </div>
      </div>
    </div>

    <div class="operation">
      <router-link
        v-if="order.orderStatus == 0"
        class="link"
        :to="
          `/errand/order?user=${order.distributionId}&order=${
            order.distributionNo
          }&errand=${order.id}`
        "
        >付款</router-link
      >
      <button v-if="order.orderStatus == 0" class="link" @click="onCancel">
        取消订单
      </button>
      <a v-if="order.orderStatus == 1" class="link" :href="`tel:${order.phone}`"
        >联系跑腿员</a
      >
      <button v-if="order.orderStatus == 2" class="link" @click="onComment">
        去评价
      </button>
      <button v-if="order.orderStatus == 5" class="link" @click="onComment">
        已经评价
      </button>
      <button v-if="order.orderStatus == '90'" class="link">已取消</button>
      <router-link
        v-if="order.orderStatus != 0 && order.orderStatus != '90'"
        :to="`/errand/detail/${order.id}?good=${order.goodsId}`"
        class="link"
        >订单详情</router-link
      >
    </div>
  </div>
</template>

<script>
import Commodity from './Commodity'

const status = {
  '0': {
    text: '待支付',
    value: '0',
  },
  '1': {
    text: '派送中',
    value: '1',
  },
  '2': {
    text: '已完成',
    value: '2',
  },
  '3': {
    text: '待评价',
    value: '3',
  },
  '4': {
    text: '审核',
    value: '4',
  },
  '5': {
    text: '已评价',
    value: '5',
  },
  '90': {
    text: '已取消',
    value: '90',
  },
}

export default {
  components: {
    Commodity,
  },

  props: {
    order: Object,
  },

  methods: {
    onClick() {
      this.show = true
    },

    onClose() {
      this.show = false
    },

    toText(value) {
      return status[value].text
    },

    onComment() {
      this.$emit('comment', this.order)
    },

    onCancel() {
      this.$emit('cancel', this.order.id)
    },
  },
}
</script>

<style lang="less" scoped>
.order-item {
  margin-bottom: 10px;
  padding: 14px 12px;
  border-radius: 4px;
  background-color: #fff;

  &-header {
    display: flex;
    margin-bottom: 12px;
    padding-bottom: 14px;
    font-size: 13px;
    border-bottom: 1px solid #e8e8e8;
  }

  .no {
    flex: 1;
    color: #585858;
  }

  .status {
    color: #ff6c00;
  }

  .operation {
    text-align: right;
  }

  .link {
    display: inline-block;
    width: 85px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    margin-left: 14px;
    border-radius: 15px;
    border: solid 1px #07c2af;
    color: #07c2af;
  }
}

.commodity {
  margin-bottom: 17px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.address {
  margin-bottom: 30px;
}

.address-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  .type {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #1cd547;
  }

  .name {
    flex: 1;
    margin-left: 10px;
    font-size: 15px;
    color: #585858;
  }
}
</style>
