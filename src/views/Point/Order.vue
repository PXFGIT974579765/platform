<template>
  <div class="order">
    <order-good :order="order" :value="buyNum" @change="onNumChange" point />

    <order-distribution :address="address" @change="onAddressChange" />

    <div class="pay">
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
      <button @click="onSubmit" class="submit">立即兑换</button>
    </div>

    <van-dialog
      v-model="verificationCodeShow"
      :showConfirmButton="false"
      closeOnPopstate
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
        score: 1,
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
    const orderId = this.$route.query.order
    if (orderId) {
      this.orderId = orderId
      this.fetchDataByOrderId(orderId)
    } else {
      this.fetchData()
    }
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    calc,

    onNumChange(value) {
      this.buyNum = value
    },

    onAddressChange(address) {
      this.address = address
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
            // this.goods = data.datas
          }
        })
    },

    onSubmit() {
      const { address, order, buyNum } = this
      const { score, price } = order

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

      if (score > order.user.integral) {
        this.$toast('积分不足')
        return
      }

      const balancePay = calc(`${buyNum}*${order.price}`) <= order.user.wallet

      if (price > 0 && balancePay) {
        this.verificationCodeShow = true
      } else {
        this.submit()
      }
    },

    onCloseCode() {
      this.verificationCodeShow = false
    },

    onGetCode(payCode) {
      this.verificationCodeShow = false
      this.submit(payCode)
    },

    submit(payCode = '') {
      const { buyNum, order, address, user } = this
      const { id, price, score, sellType } = order
      const { openId } = user
      const totalPrice = calc(`${buyNum} * ${price}`)
      const balancePay = calc(`${buyNum}*${order.price}`) <= order.user.wallet
      const payType = sellType === 0 ? 1 : balancePay ? 0 : 2

      this.$http
        .post('/api-wxmp/cxxz/scorePay//createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType,
          goodsId: id,
          goodsType: 'JFSC',
          goodsSize: buyNum,
          orderMoney: totalPrice,
          oneMoney: price,
          money: totalPrice,
          isUseScore: 1,
          score,
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
      WeixinJSBridge.invoke('getBrandWCPayRequest', opts, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          this.$router.push('/order/goods')
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
}
</style>
