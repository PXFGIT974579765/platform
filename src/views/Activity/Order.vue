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

    <order-price :order="order" />
    <order-pay :order="order" />
    <order-submit theme="green" :order="order" @submit="onSubmit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      order: {},
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
        .post('/api-wxmp/cxxz/topicPay/find', { id: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas
          }
        })
    },

    onSubmit() {
      const { id } = this.order
      const { openId, title } = this.user

      this.$http
        .post('/api-wxmp/cxxz/topicPay/createOrder', {
          mchIdmchId: '100000001',
          channelId: 'channelId',
          fromType: 1,
          payType: 2,
          goodsId: id,
          goodsType: 'HD',
          goodsName: title,
          goodsInfo: 'xx',
          goodsSize: 1,
          orderMoney: 0.01,
          oneMoney: 0.01,
          money: 0.01,
          isUseScore: false,
          score: 0,
          scoreMoney: 0,
          isUseCoupon: false,
          couponNo: 0,
          couponMoney: 0,
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
      console.log('----', opts)
      // WeixinJSBridge.invoke(
      //   'getBrandWCPayRequest',
      //   {
      //     appId: 'wx2421b1c4370ec43b', //公众号名称，由商户传入
      //     timeStamp: '1395712654', //时间戳，自1970年以来的秒数
      //     nonceStr: 'e61463f8efa94090b1f366cccfbbb444', //随机串
      //     package: 'prepay_id=u802345jgfjsdfgsdg888',
      //     signType: 'MD5', //微信签名方式：
      //     paySign: '70EA570631E4BB79628FBCA90534C63FF7FADD89', //微信签名
      //   },
      //   function(res) {
      //     if (res.err_msg == 'get_brand_wcpay_request:ok') {
      //       // 使用以上方式判断前端返回,微信团队郑重提示：
      //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //     }
      //   }
      // )
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
