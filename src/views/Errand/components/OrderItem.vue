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
          贵州师范大学花溪校区（创星校园学子实训中心实训中心）
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
        v-if="order.status == 6"
        class="link"
        :to="
          `/errand/order?user=${order.distributionNo}&order=${order.orderId}`
        "
        >付款</router-link
      >
      <a
        v-if="order.status == 0 || order.status == 1"
        class="link"
        :href="`tel:${order.phone}`"
        >联系跑腿员</a
      >
      <button v-if="order.status == 3" class="link" @click="onClick">
        去评价
      </button>
      <button v-if="order.status == 5" class="link" @click="onClick">
        已经评价
      </button>
      <router-link
        :to="`/errand/detail/${order.id}?good=${order.goodsId}`"
        class="link"
        >订单详情</router-link
      >
    </div>

    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <errand-comment :user="order" @close="onClose" @comment="onComment" />
    </van-dialog>
  </div>
</template>

<script>
import ErrandComment from '@/components/ErrandComment'
import Commodity from './Commodity'

const status = {
  '0': {
    text: '取货中',
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
  '6': {
    text: '待付款',
    value: '6',
  },
}

export default {
  components: {
    ErrandComment,
    Commodity,
  },

  props: {
    order: Object,
  },

  data() {
    return {
      show: false,
    }
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

    onComment({ ratings, tags }) {
      this.$http
        .post('/api-wxmp/cxxz/comment/save', {
          rates: ratings,
          commContent: JSON.stringify(tags),
          distributionId: this.order.distributionNo,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$toast('评论成功')
            this.show = false
          }
        })
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
