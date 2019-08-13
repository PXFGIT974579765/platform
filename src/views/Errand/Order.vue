<template>
  <div class="order">
    <person-card :data="userDetail" />

    <good
      class="block"
      :good="good"
      :addressList="addressList"
      @selectAddress="fetchPrice"
    />

    <div class="comment block">
      <label class="input-field">
        <span>备注</span>
        <input v-model="comment" type="text" placeholder="物品描述或配送要求" />
      </label>
    </div>

    <div class="cost block">
      <div class="block-header">
        <div class="title">费用</div>
        <router-link to="/news" class="block-header-link">收费标准</router-link>
      </div>
      <div class="prices">
        <button class="active">{{ price }}元</button>
        <button>自定义</button>
      </div>
    </div>

    <div class="pay-methods">
      <van-radio-group v-model="radio">
        <div class="pay-method weixin">
          <van-radio :name="1" label-position="left" checked-color="#07c160">
            <div class="label">
              <span class="iconfont">&#xe758;</span>
              <div class="name">微信支付</div>
            </div>
          </van-radio>
        </div>
        <div class="pay-method account">
          <van-radio :name="2" label-position="left" checked-color="#07c160">
            <div class="label">
              <span class="iconfont">&#xe777;</span>
              <div class="name">
                余额
                <span>可用余额: {{ wallet }}元</span>
              </div>
            </div>
          </van-radio>
        </div>
      </van-radio-group>
    </div>

    <div class="pay">
      <div class="price">
        支付
        <span>￥{{ price }}元</span>
      </div>
      <button @click="onSubmit">提交订单</button>
    </div>
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'
import Good from './components/Good'
import { mapGetters } from 'vuex'

export default {
  components: {
    PersonCard,
    Good,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      comment: '',
      radio: 1,
      userDetail: {},
      good: {},
      addressList: [{}],
      price: 0,
      wallet: 0,
      send: {},
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
      const { user, order } = this.$route.query

      this.$http
        .post('/api-wxmp/cxxz/runner/hire', {
          distributionId: user,
          orderId: order,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const { userDetail, goods } = data.datas
            this.userDetail = userDetail
            this.good = goods
          }
        })

      this.$http
        .get('/api-wxmp/cxxz/address/findAddressByUserId')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.addressList = data.datas
          }
        })
    },

    fetchPrice(send) {
      this.send = send

      this.$http
        .post('/api-wxmp/cxxz/runner/choice/fee', {
          schoolId: this.good.pickUpAaddressId,
          schoolbId: send.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.price = data.datas.fee
            this.wallet = data.datas.wallet
          }
        })
    },

    onSubmit() {
      const { user } = this.$route.query
      const { openId } = this.user
      const { pickUpAddress, pickUpAddressId, goodsId, orderId } = this.good

      this.$http
        .post('/api-wxmp/cxxz/runnerPay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: 2,
          goodsId: goodsId,
          goodsType: 'RT',
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
          spOrderId: orderId,
          distributionId: user,
          pickUpAddress,
          pickUpAddressId,
          sendAddress: this.send.address,
          sendAddressId: this.send.id,
          userName: this.send.trueName,
          userPhone: this.send.mobile,
          remark: this.comment,
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
          this.$router.push('/errand/orders')
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
.order {
  padding: 18px 15px;
}

.block {
  margin-bottom: 12px;
  padding: 17px;
  border-radius: 4px;
  background-color: #fff;
}

.block-header {
  display: flex;
  .title {
    flex: 1;
    color: #585858;
  }
}

.block-header-link {
  font-size: 13px;
  color: #21a7ff;
}

.comment {
  padding: 0 16px;
}

.input-field {
  display: flex;
  align-items: center;
  color: #585858;

  input {
    flex: 1;
    padding: 12px 15px;
    border: 0;
  }
}

.cost {
  .prices {
    display: flex;
    margin-top: 20px;
  }
  button {
    flex: 1;
    height: 30px;
    line-height: 30px;
    margin-right: 9px;
    padding: 0;
    border-radius: 3px;
    font-size: 13px;
    border: solid 1px #b4b4b4;
    color: #585858;
    &:last-child {
      margin: 0;
    }
    &.active {
      border-color: #00b034;
      color: #00b034;
    }
  }
}

.pay-methods {
  margin-bottom: 48px;
}

.pay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: #ffffff;
  > * {
    flex: 1;
  }
  .price {
    font-size: 12px;
    color: #585858;
    span {
      font-size: 15px;
      color: #ff4545;
    }
  }
  button {
    height: 48px;
    line-height: 48px;
    color: #fff;
    background: #0cc3b1;
  }
}
</style>
