<template>
  <div class="page-my-wallet-cash" v-wechat-title="$route.meta.title">
    <div class="container">
      <van-cell-group class="cell-group">
        <van-cell title="提现到微信账户" class="cell" is-link to>
          <span slot="icon" style="color:#07c060" class="iconfont icon"
            >&#xe752;</span
          >
        </van-cell>
      </van-cell-group>
      <div class="input-box flex-col">
        <div class="title">提现金额</div>
        <div class="coin-area flex">
          <div>￥</div>
          <div class="flex-1">
            <input type="number" placeholder="0.00" class="coin" />
          </div>
        </div>
      </div>
      <div class="btn-area">
        <div class="coin-able flex">
          <span>可提现金额￥{{ coinAble | numFilter }}</span>
          <span class="btn-all-cash">全部提现</span>
        </div>
        <div class="btn-submit">提现</div>
      </div>
    </div>
    <div class="footer" @click="routeRecord">查看我的提现记录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coinAble: 568,
    }
  },
  methods: {
    onLoad() {},
    routeRecord() {
      this.$router.push('/my/wallet/cash/record')
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
.page-my-wallet-cash {
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
      padding: 15px 0 22px;
      margin: 0 15px;
      border-top: 1px solid #eee;

      .coin-able {
        font-size: 15px;
        color: #8d8d8d;

        .btn-all-cash {
          margin-left: 18px;
          color: #ff4545;
        }
      }

      .btn-submit {
        margin-top: 46px;
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
