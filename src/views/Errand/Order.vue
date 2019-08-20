<template>
  <div class="order">
    <person-card :data="userDetail" />

    <good
      class="block"
      :detail="!!orderId"
      :good="good"
      :distributionId="userDetail.distributionId"
      :addressList="addressList"
      @selectAddress="fetchPrice"
    />

    <div class="comment block">
      <label class="input-field">
        <span>备注</span>
        <input
          :readonly="!!orderId"
          v-model="comment"
          type="text"
          placeholder="物品描述或配送要求"
        />
      </label>
    </div>

    <div class="cost block">
      <div class="block-header">
        <div class="title">费用</div>
        <div>{{ price }}</div>
        <!-- <div class="block-header-link">收费标准</div> -->
      </div>
      <!-- <div class="prices">
        <button class="active">{{ price }}元</button>
        <button>自定义</button>
      </div>-->
    </div>

    <div class="pay-methods">
      <van-radio-group v-model="payMethod">
        <div class="pay-method weixin">
          <van-radio :name="2" label-position="left" checked-color="#07c160">
            <div class="label">
              <span class="iconfont">&#xe758;</span>
              <div class="name">微信支付</div>
            </div>
          </van-radio>
        </div>
        <div v-if="wallet >= price" class="pay-method account">
          <van-radio :name="0" label-position="left" checked-color="#07c160">
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
      <button :disabled="disabled" @click="onSubmit">提交订单</button>
    </div>

    <van-dialog
      v-model="verificationCodeShow"
      :showConfirmButton="false"
      closeOnPopstate
    >
      <verification-code
        :user="user"
        @close="onCloseCode"
        @submit="onGetCode"
      />
    </van-dialog>
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'
import Good from './components/Good'
import VerificationCode from '@/components/VerificationCode'
import { mapGetters } from 'vuex'

export default {
  components: {
    PersonCard,
    Good,
    VerificationCode,
  },

  computed: mapGetters(['user']),

  data() {
    return {
      orderId: null,
      comment: '',
      payMethod: 2,
      userDetail: {},
      good: {},
      addressList: [{}],
      price: '',
      wallet: 0,
      send: {},
      disabled: false,
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
    fetch() {
      const orderId = this.$route.query.errand
      if (orderId) {
        this.orderId = orderId
        this.fetchDataByOrderId(orderId)
      } else {
        this.fetchData()
      }
    },

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
      this.disabled = true

      this.$http
        .post('/api-wxmp/cxxz/runner/choice/fee', {
          schoolId: this.good.pickUpAaddressId,
          schoolbId: send.id,
        })
        .then(({ data }) => {
          this.disabled = false

          if (data.resp_code === 0) {
            this.price = data.datas.fee
            this.wallet = data.datas.wallet
          }
        })
        .catch(() => {
          this.disabled = true
        })
    },

    fetchDataByOrderId(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/runner/findDistritionOrderDetail', {
          id: orderId,
          orderId: this.$route.query.order,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const d = data.datas.detail

            // TODO: value
            this.comment = d.remark
            this.price = 0.01
            this.wallet = 4990

            this.good = {
              ...d,
              goodsImg: d.goodsImg,
              goodsName: d.goodsName,
              pickUpAddress: d.pickUpAddress,
              phone: d.phone,
            }

            this.userDetail = {
              cname: d.distributionName,
              orderNum: 10,
              ratings: 9,
            }

            this.send = {
              id: 'xxxxx',
              trueName: d.userName,
              mobile: d.userPhone,
              address: d.sendAddress,
            }
          }
        })
    },

    onSubmit() {
      const { send, payMethod } = this

      // if (order.user.isPerfect != 1) {
      //   this.$toast('请先完善个人信息')
      //   window.setTimeout(() => {
      //     this.$router.push('/my/base-info')
      //   }, 3000)
      //   return
      // }

      if (!send.address || send.address.length === 0) {
        this.$toast('请选择送货地址')
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
      const { send, price, payMethod, comment } = this
      const { user } = this.$route.query
      const { openId } = this.user
      const { pickUpAddress, pickUpAddressId, goodsId, orderId } = this.good

      this.$http
        .post('/api-wxmp/cxxz/runnerPay/createOrder', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          payType: payMethod,
          goodsId: goodsId,
          goodsType: 'RT',
          goodsSize: 1,
          orderMoney: price,
          oneMoney: price,
          money: price,
          isUseScore: 0,
          score: 0,
          scoreMoney: 0,
          isUseCoupon: 0,
          couponNo: null,
          couponMoney: 0,
          payCode,
          openId,
          spOrderId: orderId,
          distributionId: user,
          pickUpAddress,
          pickUpAddressId,
          sendAddress: send.address,
          sendAddressId: send.id,
          userName: send.trueName,
          userPhone: send.mobile,
          remark: comment,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/errand/orders')
            } else {
              this.pay(data.datas)
            }
            return
          }
          this.$toast(data.resp_msg)
        })
    },

    reSubmit(payCode = '') {
      const { send, price, payMethod, comment, orderId, good } = this
      const { user } = this.$route.query
      const { openId } = this.user
      const { pickUpAddress, pickUpAddressId, goodsId } = good

      this.$http
        .post('/api-wxmp/cxxz/runnerPay/createPay', {
          mchId: '100000001',
          channelId: 1,
          fromType: 1,
          orderId,
          payType: payMethod,
          goodsId: goodsId,
          goodsType: 'RT',
          goodsSize: 1,
          orderMoney: price,
          oneMoney: price,
          money: price,
          isUseScore: 0,
          score: 0,
          scoreMoney: 0,
          isUseCoupon: 0,
          couponNo: null,
          couponMoney: 0,
          payCode,
          openId,
          spOrderId: good.orderId,
          distributionId: user,
          pickUpAddress,
          pickUpAddressId,
          sendAddress: send.address,
          sendAddressId: send.id,
          userName: send.trueName,
          userPhone: send.mobile,
          remark: comment,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            if (payMethod === 0) {
              this.$toast('支付成功')
              this.$router.push('/errand/orders')
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
  .block-header {
    margin-bottom: 0;
  }
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
