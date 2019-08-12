<template>
  <div class="page-my-wallet-recharge" v-wechat-title="$route.meta.title">
    <div class="container">
      <van-cell-group class="cell-group">
        <van-cell title="从微信账户余额充值" class="cell" is-link to>
          <span slot="icon" style="color:#07c060" class="iconfont icon"
            >&#xe752;</span
          >
        </van-cell>
      </van-cell-group>
      <div class="input-box flex-col">
        <div class="title">充值金额</div>
        <div class="coin-area flex">
          <div>￥</div>
          <div class="flex-1">
            <input
              type="number"
              placeholder="0.00"
              class="coin"
              v-model.number="money"
              @input="onInput"
            />
          </div>
        </div>
      </div>
      <div class="btn-area">
        <div class="btn" @click="onSubmit">确认充值</div>
      </div>
    </div>
    <div class="footer" @click="routeRecord">查看我的充值记录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: null,
      wallet: {
        coin: 564.0,
        curMonIn: 129,
        curMonOut: 89,
      },
    }
  },
  methods: {
    routeRecord() {
      this.$router.push('/my/wallet/recharge/record')
    },
    // 监听金额输入最多两位小数
    onInput(e) {
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
      this.money = e.target.value
    },
    onSubmit() {
      if (!this.money || parseFloat(this.money) == 0) {
        return
      }
      this.$http
        .post('/api-wxmp/cxxz/depositPay/createOrder', {
          mchId: '100000001',
          channelId: '1',
          fromType: 1,
          payType: 2,
          money: this.money,
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
          this.$router.push('/my/wallet/recharge/record')
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
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-wallet-recharge {
  .container {
    margin: 15px;

    background-color: #fff;

    .cell-group {
      .cell {
        align-items: center;
        height: 70px;
        background-color: #eee;

        .icon {
          margin-right: 19px;
        }
      }
    }

    .input-box {
      padding: 34px 27px;
      display: flow-root;

      .title {
        font-size: 15px;
        color: #2f2f2f;
      }

      .coin-area {
        margin-top: 34px;
        font-size: 30px;
        color: #2f2f2f;

        .coin {
          width: 100%;
          border: 0;
        }
      }
    }

    .btn-area {
      padding: 48px 0 30px;
      margin: 0 15px;
      border-top: 1px solid #eee;

      .btn {
        width: 100%;
        height: 47px;
        line-height: 47px;
        text-align: center;
        border-radius: 4px;
        color: #fff;
        background-color: #06bcbf;
      }
    }
  }

  .footer {
    margin-top: 28px;
    text-align: center;
    font-size: 15px;
    letter-spacing: 1px;
    color: #4f4f4f;
  }
}
</style>
