<template>
  <div>
    <order-good
      :order="order"
      :value="buyNum"
      @change="onNumChange"
      :repay="!!orderId"
      group
    />

    <order-distribution
      :address="address"
      @change="onAddressChange"
      :repay="!!orderId"
    />

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
      :disabled="!order.user.id"
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
import OrderGood from '@/components/OrderGood'
import OrderDistribution from '@/components/OrderDistribution'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'
import VerificationCode from '@/components/VerificationCode'

export default {
  components: {
    OrderGood,
    OrderDistribution,
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
          phone: '',
        },
      },
      buyNum: 1,
      address: {
        id: '',
        phone: '',
        name: '',
        address: '',
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

    onTicketChange({ value, id }) {
      this.ticket = value
      this.ticketId = id
    },

    onMethodChange(method) {
      this.payMethod = method
    },

    onNumChange(value) {
      this.buyNum = value
    },

    onAddressChange(address) {
      this.address = address
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
        .post('/api-wxmp/cxxz/assemblePay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })
    },

    fetchDataByOrderId(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getPT', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const d = data.datas
            this.buyNum = d.goodsSize

            this.order = {
              ...d,
              price: d.oneMoney,
              name: d.goodsName,
              score: d.score,
              picUrl: d.goodsImg,
            }

            this.address = {
              phone: '',
              name: '',
              address: d.address,
              id: d.addressId,
            }
          }
        })
    },

    onSubmit() {
      const { address, payMethod, order } = this

      if (order.orders && order.orders.length > 0) {
        this.$toast('您有未支付的拼团，请到订单中心支付')
        window.setTimeout(() => {
          this.$router.push('/order/group')
        }, 3000)
        return
      }

      if (order.user.isPerfect != 1) {
        this.$toast('请先完善个人信息')
        window.setTimeout(() => {
          this.$router.push('/my/base-info')
        }, 3000)
        return
      }

      if (!address.address || address.address.length === 0) {
        this.$toast('请选择自提门店')
        return
      }

      if (order.price > 0 && payMethod == 0) {
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
      const { address, payMethod, ticketId, ticket, buyNum } = this
      const { id, price } = this.order
      const { openId } = this.user
      const hasTicket = !!(
        ticket > 0 &&
        ticketId &&
        String(ticketId).length > 0
      )
      const totalPrice = calc(`${buyNum} * ${price}`)

      this.$http
        .post('/api-wxmp/cxxz/assemblePay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: price === 0 ? 3 : payMethod,
          goodsId: id,
          goodsType: 'PT',
          goodsSize: buyNum,
          orderMoney: totalPrice,
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
          address: address.address,
          addressId: address.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/order/group')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    reSubmit(payCode = '') {
      const { address, payMethod, ticketId, ticket, buyNum, orderId } = this
      const { id, price } = this.order
      const { openId } = this.user
      const hasTicket = !!(
        ticket > 0 &&
        ticketId &&
        String(ticketId).length > 0
      )
      const totalPrice = calc(`${buyNum} * ${price}`)

      this.$http
        .post('/api-wxmp/cxxz/assemblePay/createPay ', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: price === 0 ? 3 : payMethod,
          orderId,
          goodsId: id,
          goodsType: 'PT',
          goodsSize: buyNum,
          orderMoney: totalPrice,
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
          address: address.address,
          addressId: address.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/order/group')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    pay(opts) {
      if (!opts) {
        this.$toast('支付成功')
        this.$router.push('/order/group')
        return
      }

      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/group')
          return
        }

        if (
          res.err_msg === 'get_brand_wcpay_request:cancel' ||
          res.err_msg === 'get_brand_wcpay_request:fail'
        ) {
          this.$toast('支付失败，请到订单中心重新支付')
          setTimeout(() => {
            this.$router.push('/order/group')
          }, 3000)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
