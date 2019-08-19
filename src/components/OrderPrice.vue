<template>
  <div>
    <div class="order-price">
      <div
        v-if="filterTickets(tickets).length > 0"
        class="item"
        @click="onSelect"
      >
        <div class="item-name">优惠券</div>
        <div v-if="ticket" class="tag">
          {{ ticketDetail.name }}{{ ticket }}元
        </div>
        <div class="item-value ticket">
          <span>{{ ticket ? `￥${ticket}` : '选择优惠券' }}</span>
          <span class="iconfont">&#xe76e;</span>
        </div>
      </div>

      <div class="item">
        <div class="item-name">订单总价</div>
        <div class="item-value price">￥{{ price }}</div>
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
          <van-radio-group :value="ticket">
            <van-radio
              v-for="t in filterTickets(tickets)"
              :key="t.id"
              :name="t.value"
              checked-color="#07c160"
              class="ticket-item"
              @click="onClick(t)"
            >
              <div class="ticket-name">{{ t.name }}{{ t.value }}元</div>
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
    price: {
      type: Number,
      default: 0,
    },
    ticket: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      tickets: [],
      ticketDetail: {},
      ticketShow: false,
    }
  },

  created() {
    this.fetchTickets()
  },

  methods: {
    fetchTickets() {
      this.$http
        .get('/api-wxmp/cxxz/coupon/findCoupons', {
          params: {
            status: 1,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.tickets = data.datas.couponList
          }
        })
    },

    filterTickets(tickets) {
      return tickets
        .filter(x => x.minGoodsAmount <= this.price)
        .map(x => ({
          ...x,
          id: x.couponNo,
          value: x.typeMoney,
        }))
    },

    onSelect() {
      this.ticketShow = true
    },

    onClose() {
      this.ticketShow = false
    },

    onClick(ticket) {
      this.ticketShow = false
      this.ticketDetail = ticket
      this.$emit(
        'change',
        ticket.value != this.ticket ? ticket : { id: '', value: 0 }
      )
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

.ticket-list {
  max-height: 60vh;
  overflow: auto;
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
