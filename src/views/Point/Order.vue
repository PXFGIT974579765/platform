<template>
  <div class="order">
    <order-good
      :order="order"
      :value="buyNum"
      @change="onNumChange"
      :repay="!!orderId"
      point
    />

    <order-distribution
      :address="address"
      @change="onAddressChange"
      :repay="!!orderId"
    />

    <div v-if="order.score > 0 || order.price > 0" class="pay">
      <div class="pay-header">
        <div class="title">支付方式</div>
      </div>

      <div class="methods">
        <div v-if="order.score > 0" class="method">
          <div class="price">
            <span class="name">积分抵扣：</span>
            <span class="value">{{ buyNum * order.score }} 积分</span>
          </div>
          <div class="balance">
            <span class="name">可用积分：</span>
            <span class="value">{{ order.user.integral }}分</span>
          </div>
        </div>

        <div
          class="method"
          v-if="
            order.price > 0 &&
              calc(`${buyNum}*${order.price}`) <= order.user.wallet
          "
        >
          <div class="price">
            <span class="name">余额支付：</span>
            <span class="value">{{ calc(`${buyNum}*${order.price}`) }}元</span>
          </div>
          <div class="balance">
            <span class="name">账户余额：</span>
            <span class="value">{{ order.user.wallet }}元</span>
          </div>
        </div>
        <div class="method" v-else-if="order.price > 0">
          <div class="price">
            <span class="name">微信支付：</span>
            <span class="value">{{ calc(`${buyNum}*${order.price}`) }}元</span>
          </div>
        </div>
      </div>
    </div>

    <div class="submit-wrap">
      <button :disabled="!order.user.id" @click="onSubmit" class="submit">
        立即兑换
      </button>
    </div>

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
import VerificationCode from '@/components/VerificationCode'

export default {
  components: {
    OrderGood,
    OrderDistribution,
    VerificationCode,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      orderId: null,
      order: {
        price: 0,
        score: 0,
        user: {
          wallet: 0,
        },
      },
      address: {
        address: '',
        id: '',
      },
      buyNum: 1,
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
        .post('/api-wxmp/cxxz/scorePay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })
    },

    fetchDataByOrderId(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getPTSC', {
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
              score: d.score / d.goodsSize,
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
      const { address, order, buyNum } = this
      const { score, price } = order

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

      if (score > order.user.integral) {
        this.$toast('积分不足')
        return
      }

      const balancePay = calc(`${buyNum}*${order.price}`) <= order.user.wallet

      if ((price > 0 && balancePay) || score > 0) {
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
      const { buyNum, order, address, user } = this
      const { id, price, score, sellType } = order
      const { openId } = user
      const totalPrice = calc(`${buyNum} * ${price}`)
      const balancePay = calc(`${buyNum}*${order.price}`) <= order.user.wallet
      const payType = sellType === 0 ? 1 : balancePay ? 0 : 2

      this.$http
        .post('/api-wxmp/cxxz/scorePay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: payType == 1 ? 1 : price === 0 ? 3 : payType,
          goodsId: id,
          goodsType: 'JFSC',
          goodsSize: buyNum,
          orderMoney: totalPrice,
          oneMoney: price,
          money: totalPrice,
          isUseScore: 1,
          score: score * buyNum,
          scoreMoney: 0,
          isUseCoupon: 0,
          couponNo: null,
          couponMoney: 0,
          payCode,
          openId,
          address: address.address,
          addressId: address.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payType === 1 || payType === 0) {
              this.$toast(payType === 1 ? '兑换成功' : '支付成功')
              this.$router.push('/order/goods')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    reSubmit(payCode = '') {
      const { buyNum, order, address, user, orderId } = this
      const { id, price, score, sellType } = order
      const { openId } = user
      const totalPrice = calc(`${buyNum} * ${price}`)
      const balancePay = calc(`${buyNum}*${order.price}`) <= order.user.wallet
      const payType = sellType === 0 ? 1 : balancePay ? 0 : 2

      this.$http
        .post('/api-wxmp/cxxz/scorePay/createPay', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          orderId,
          payType: price === 0 ? 3 : payType,
          goodsId: id,
          goodsType: 'JFSC',
          goodsSize: buyNum,
          orderMoney: totalPrice,
          oneMoney: price,
          money: totalPrice,
          isUseScore: 1,
          score: score * buyNum,
          scoreMoney: 0,
          isUseCoupon: 0,
          couponNo: null,
          couponMoney: 0,
          payCode,
          openId,
          address: address.address,
          addressId: address.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payType === 1 || payType === 0) {
              this.$toast(payType === 1 ? '兑换成功' : '支付成功')
              this.$router.push('/order/goods')
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
        this.$router.push('/order/goods')
        return
      }

      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/goods')
          return
        }

        if (
          res.err_msg === 'get_brand_wcpay_request:cancel' ||
          res.err_msg === 'get_brand_wcpay_request:fail'
        ) {
          this.$toast('支付失败，请到订单中心重新支付')
          setTimeout(() => {
            this.$router.push('/order/goods')
          }, 3000)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.pay {
  margin: 10px 0;
  padding: 20px 15px 5px;
  background: #fff;
}

.pay-header {
  padding-bottom: 15px;
  border-bottom: solid 1px #d7d7d7;
  font-size: 15px;

  .title {
    font-weight: 700;
  }
}

.method {
  display: flex;
  padding: 14px 0;
  border-bottom: dashed 1px #d7d7d7;
  color: #a4a4a4;

  &:last-child {
    border: 0;
  }

  .price {
    flex: 1;

    .value {
      color: #ff6000;
    }
  }
}

.submit-wrap {
  padding: 15px;
}

.submit {
  width: 100%;
  padding: 13px 0;
  font-size: 15px;
  border-radius: 4px;
  color: #fff;
  background-image: linear-gradient(#06bcbf, #06bcbf),
    linear-gradient(#07c060, #07c060);

  &[disabled] {
    background: #999;
  }
}
</style>
