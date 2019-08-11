<template>
  <div>
    <order-good :order="order" />
    <order-distribution :addressList="addressList" />
    <order-price :order="order" />
    <order-pay :order="order" />
    <order-submit :order="order" @submit="onSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderGood from '@/components/OrderGood'
import OrderDistribution from '@/components/OrderDistribution'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    OrderGood,
    OrderDistribution,
    OrderPrice,
    OrderPay,
    OrderSubmit,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      order: {
        price: 0,
        user: {},
      },
      addressList: [],
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      this.$http
        .post('/api-wxmp/cxxz/assemblePay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })

      this.$http.get('/api-user/cxxz/branch/list').then(({ data }) => {
        if (data.resp_code === 0) {
          this.addressList = data.datas
        }
      })
    },

    onSubmit() {
      const { id } = this.order
      const { openId } = this.user

      this.$http
        .post('/api-wxmp/cxxz/assemblePay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: 2,
          goodsId: id,
          goodsType: 'PT',
          goodsSize: 1,
          orderMoney: 0.01,
          oneMoney: 0.01,
          money: 0.01,
          isUseScore: 0,
          score: 0,
          scoreMoney: 0,
          isUseCoupon: 0,
          couponNo: null,
          couponMoney: 0,
          payCode: '',
          openId,
          address: '花溪大学城贵州大学创新学子空间',
          addressId: '073c556eb3ea4075becfe645a1f6a914',
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
