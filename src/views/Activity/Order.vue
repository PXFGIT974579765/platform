<template>
  <div class="order">
    <div class="order-item">
      <div class="item">
        <div class="item-name">订单名称:</div>
        <div class="item-value">{{ order.title }}</div>
      </div>
      <div class="item">
        <div class="item-name">订单金额:</div>
        <div class="item-value">￥{{ order.price }}</div>
      </div>
    </div>

    <order-price
      :price="order.price"
      :ticket="ticket"
      @change="onTicketChange"
    />

    <order-pay
      :price="Math.max(0, calc(`${order.price}-${ticket}`))"
      :balance="order.user.wallet"
      :method="payMethod"
      @change="onMethodChange"
    />

    <order-submit
      theme="green"
      :value="Math.max(0, calc(`${order.price}-${ticket}`))"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { calc } from '@/lib/format'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    OrderPrice,
    OrderPay,
    OrderSubmit,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      order: {
        title: '',
        price: 0,
        user: {
          wallet: 0,
        },
      },
      ticket: 0,
      ticketId: '',
      payMethod: 2,
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    calc,

    onTicketChange(ticket) {
      this.ticket = ticket.value
      this.ticketId = ticket.id
    },

    onMethodChange(method) {
      this.payMethod = method
    },

    fetchData() {
      this.$http
        .post('/api-wxmp/cxxz/topicPay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })
    },

    onSubmit() {
      const { payMethod, ticketId, ticket } = this
      const { id, price } = this.order
      const { openId } = this.user

      const hasTicket = !!(ticketId && String(ticketId).length > 0)

      this.$http
        .post('/api-wxmp/cxxz/topicPay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: payMethod,
          goodsId: id,
          goodsType: 'HD',
          goodsSize: 1,
          orderMoney: price,
          oneMoney: price,
          money: Math.max(0, calc(`${price}-${this.ticket}`)),
          isUseScore: 0,
          score: 0,
          scoreMoney: 0,
          isUseCoupon: ~~hasTicket,
          couponNo: hasTicket ? ticketId : null,
          couponMoney: ticket,
          payCode: '',
          openId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.pay(data.datas)
            return
          }
        })
    },

    pay(opts) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/active')
          return
        }
        // if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        //   // return
        // }
        // if (res.err_msg === 'get_brand_wcpay_request:fail') {
        //   // return
        // }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.order-item {
  margin: 10px 0;
  padding: 12px 15px;
  background: #fff;
}

.item {
  display: flex;
  margin-bottom: 10px;
  color: #7d7d7d;

  &:last-child {
    margin: 0;
  }
}

.item-value {
  flex: 1;
  margin-left: 10px;
  color: #000;
}
</style>
