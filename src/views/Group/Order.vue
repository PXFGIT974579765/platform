<template>
  <div>
    <order-good :order="order" :value="buyNum" @change="onNumChange" />

    <order-distribution :value="address.address" @change="onAddressChange" />

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
      :value="Math.max(0, calc(`${order.price}-${ticket}`))"
      @submit="onSubmit"
    />

    <van-dialog
      v-model="verificationCodeShow"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <verification-code
        :user="order.user"
        @close="onCloseCode"
        @submit="onGetCode"
      />
    </van-dialog>
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
        address: '',
        id: '',
      },
      ticket: 0,
      ticketId: '',
      payMethod: 2,
      verificationCodeShow: false,
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

    onCloseCode() {
      this.verificationCodeShow = false
    },

    onTicketChange(ticket) {
      this.ticket = ticket.value
      this.ticketId = ticket.id
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

    fetchData() {
      this.$http
        .post('/api-wxmp/cxxz/assemblePay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })
    },

    onSubmit() {
      const { address, payMethod } = this

      // if (order.user.isPerfect != 1) {
      //   this.$toast('请先完善个人信息')
      //   window.setTimeout(() => {
      //     this.$router.push('/my/base-info')
      //   }, 3000)
      //   return
      // }

      if (!address.address || address.address.length === 0) {
        this.$toast('请选择自提门店')
        return
      }

      if (payMethod !== 0) {
        this.submit()
        return
      }
      this.verificationCodeShow = true
    },

    onGetCode(payCode) {
      this.verificationCodeShow = false
      this.submit(payCode)
    },

    submit(payCode = '') {
      const { address, payMethod, ticketId, ticket, buyNum } = this
      const { id, price } = this.order
      const { openId } = this.user
      const hasTicket = !!(ticketId && String(ticketId).length > 0)
      const totalPrice = calc(`${buyNum} * ${price}`)

      this.$http
        .post('/api-wxmp/cxxz/assemblePay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: payMethod,
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
      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/group')
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

<style lang="less" scoped></style>
