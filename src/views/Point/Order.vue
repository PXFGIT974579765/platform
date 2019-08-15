<template>
  <div class="order">
    <order-good :order="order" :value="buyNum" @change="onNumChange" point />
    <order-distribution
      :addressList="addressList"
      :value="address"
      @change="onAddressChange"
    />

    <div class="pay">
      <div class="pay-header">
        <div class="title">支付方式</div>
      </div>

      <div class="methods">
        <div class="method">
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
          v-if="calc(`${buyNum}*${order.price}`) <= order.user.wallet"
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
        <div class="method" v-else>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { calc } from '@/lib/format'
import OrderGood from '@/components/OrderGood'
import OrderDistribution from '@/components/OrderDistribution'

export default {
  components: {
    OrderGood,
    OrderDistribution,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      order: {
        price: 0,
        score: 1,
        user: {
          wallet: 0,
        },
      },
      address: '',
      addressList: [],
      buyNum: 1,
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

    onNumChange(value) {
      this.buyNum = value
    },

    onAddressChange(value) {
      this.address = value
    },

    fetchData() {
      this.$http
        .post('/api-wxmp/cxxz/scorePay/find', { id: this.$route.params.id })
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
      const { buyNum, order, user } = this
      const { id, price, score } = order

      if (!this.address || this.address.length === 0) {
        this.$toast('请选择自提门店')
        return
      }

      if (score > user.integral) {
        this.$toast('积分不足')
        return
      }

      const { openId } = user
      const totalPrice = calc(`${buyNum} * ${price}`)

      this.$http
        .post('/api-wxmp/cxxz/scorePay//createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: 2,
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
