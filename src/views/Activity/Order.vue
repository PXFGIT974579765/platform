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

    <verification-code
      :visible="verificationCodeShow"
      :user="order.user"
      @close="onCloseCode"
      @submit="onGetCode"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { calc } from '@/lib/format'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'
import VerificationCode from '@/components/VerificationCode'
import { setTimeout } from 'timers'

export default {
  components: {
    OrderPrice,
    OrderPay,
    OrderSubmit,
    VerificationCode,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      orderId: null,
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
      verificationCodeShow: false,
    }
  },

  created() {
    this.fetch()
  },

  watch: {
    $route: 'fetch',
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

    fetch() {
      const orderId = this.$route.query.order
      if (orderId) {
        this.orderId = orderId
        this.fetchDataByOrderId(orderId)
      } else {
        this.fetchData()
      }
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

    fetchDataByOrderId(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getHD', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const d = data.datas

            this.order = {
              ...d,
              price: d.oneMoney,
              title: d.goodsName,
            }
          }
        })
    },

    onSubmit() {
      const { payMethod, order } = this

      if (order.user.isPerfect != 1) {
        this.$toast('请先完善个人信息')
        window.setTimeout(() => {
          this.$router.push('/my/base-info')
        }, 3000)
        return
      }

      if (payMethod == 0) {
        this.verificationCodeShow = true
      } else {
        this.orderId ? this.reSubmit() : this.submit()
      }
    },

    onCloseCode() {
      this.verificationCodeShow = false
    },

    onGetCode(payCode) {
      this.verificationCodeShow = false
      this.orderId ? this.reSubmit(payCode) : this.submit(payCode)
    },

    submit(payCode = '') {
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
          payCode,
          openId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/order/active')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    reSubmit(payCode = '') {
      const { payMethod, ticketId, ticket, orderId } = this
      const { id, price } = this.order
      const { openId } = this.user

      const hasTicket = !!(ticketId && String(ticketId).length > 0)

      this.$http
        .post('/api-wxmp/cxxz/topicPay/createPay', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          orderId,
          payType: price === 0 ? 3 : payMethod,
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
          payCode,
          openId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/order/active')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    pay(opts) {
      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/active')
          return
        }

        if (
          res.err_msg === 'get_brand_wcpay_request:cancel' ||
          res.err_msg === 'get_brand_wcpay_request:fail'
        ) {
          this.$toast('支付失败，请到订单中心重新支付')
          setTimeout(() => {
            this.$router.push('/order/active')
          }, 3000)
        }
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
