<template>
  <div>
    <div class="order-price">
      <div class="item" @click="onSelect">
        <div class="item-name">优惠券</div>
        <div class="tag">下单立减{{ ticket }}元</div>
        <div class="item-value ticket">
          ￥{{ ticket }}
          <span class="iconfont">&#xe76e;</span>
        </div>
      </div>

      <div class="item">
        <div class="item-name">订单总价</div>
        <div class="item-value price">￥{{ order.price }}</div>
      </div>
    </div>

    <van-dialog
      v-model="ticketShow"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <div class="ticket-select">
        <van-icon name="cross" :size="16" class="close" @click="onClose" />

        <div class="ticket-list">
          <van-radio-group v-model="ticket" @change="onChange">
            <van-radio :name="10" checked-color="#07c160" class="ticket-item">
              <div class="ticket-name">下单立减10元</div>
            </van-radio>
            <van-radio :name="5" checked-color="#07c160" class="ticket-item">
              <div class="ticket-name">下单立减5元</div>
            </van-radio>
            <van-radio :name="1" checked-color="#07c160" class="ticket-item">
              <div class="ticket-name">下单立减1元</div>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
    tickets: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      ticket: 10,
      ticketShow: false,
    }
  },

  methods: {
    onSelect() {
      this.ticketShow = true
    },

    onClose() {
      this.ticketShow = false
    },

    onChange(value) {
      this.ticket = value
      this.ticketShow = false
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less" scoped>
.order-price {
  padding: 0 15px;
  background: #fff;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #e5e5e5;

  &:last-child {
    border: 0;
  }
}

.item-name {
  padding: 15px 0;
}

.tag {
  margin-left: -3em;
  padding: 5px;
  border-radius: 2px;
  border: solid 1px #ff4444;
  color: #ff4444;
}

.ticket {
  color: #232323;
}

.price {
  font-size: 16px;
  color: #ff4a4a;
}

.ticket-select {
  position: relative;
  padding: 30px 0;

  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #adadad;
    cursor: pointer;
  }
}

.ticket-item {
  padding: 0 15px;
  border-bottom: 1px solid #d7d7d7;

  &:last-child {
    border: 0;
  }
}

/deep/ .van-radio__label {
  height: 50px;
  line-height: 50px;
  flex: 1;
}
</style>
