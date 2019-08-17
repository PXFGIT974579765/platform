<template>
  <div class="page-my-wallet" v-wechat-title="$route.meta.title">
    <div class="bg-card">
      <div class="data">
        <div class="title flex">
          <span>账户余额(元)</span>
          <span class="iconfont icon-help">&#xe757;</span>
        </div>
        <div class="coin">{{ user.wallet | numFilter }}</div>
        <div class="in-out flex">
          <span>
            本月支出:
            <span class="out">￥{{ wallet.monthOutMoney | numFilter }}</span>
          </span>
          <span>
            本月收入:
            <span class="in">￥{{ wallet.monthInMoney | numFilter }}</span>
          </span>
        </div>
      </div>
    </div>
    <van-cell-group class="cell-group">
      <van-cell title="账户明细" class="cell" is-link to="/my/wallet/coin-log">
        <span slot="icon" style="color:#07c2af" class="iconfont icon"
          >&#xe754;</span
        >
      </van-cell>

      <van-cell title="充值" class="cell" is-link to="/my/wallet/recharge">
        <span slot="icon" style="color:#877bff" class="iconfont icon"
          >&#xe756;</span
        >
      </van-cell>
      <van-cell title="提现" class="cell" is-link to="/my/wallet/cash">
        <span slot="icon" style="color:#ff7d7d" class="iconfont icon"
          >&#xe755;</span
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { curDate } from '@/lib/format'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      wallet: {
        wallet: 0.0,
        monthInMoney: 0,
        monthOutMoney: 0,
      },
    }
  },
  created() {
    this.fetchWallet()
  },
  methods: {
    fetchWallet() {
      this.$http
        .post('/api-wxmp/cxxz/money/getUserMonthMoney ', {
          searchTime: curDate('yyyy-MM'),
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.wallet = data.datas
          }
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
.page-my-wallet {
  .bg-card {
    padding: 45px 0 26px;
    width: 100%;
    background-image: url('./images/wallet_bg.jpg');
    background-size: 100% 100%;

    .data {
      padding: 0 15px;
      color: #fff;

      .title {
        justify-content: space-between;
      }

      .coin {
        margin-top: 17px;
        font-size: 45px;
        height: 45px;
        line-height: 45px;
      }

      .in-out {
        justify-content: space-around;
        margin-top: 43px;
        font-size: 13px;

        .in,
        .out {
          margin-left: 10px;
        }
      }
    }
  }
  .cell-group {
    .cell {
      align-items: center;
      height: 53px;

      .icon {
        margin-right: 19px;
      }
    }
  }
}
</style>
