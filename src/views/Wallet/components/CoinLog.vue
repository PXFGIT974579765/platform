<template>
  <div class="page-my-wallet-coin-log" v-wechat-title="$route.meta.title">
    <div class="container">
      <van-tabs
        v-model="activeTab"
        class="tabs"
        title-active-color="#06bcbf"
        color="#06bcbf"
        background="#fff"
      >
        <van-tab v-for="item in typeList" :key="item.value" :title="item.name">
          <section class="record-list">
            <ul>
              <li
                v-for="(coinLog, index) in coinLogFilter(item.value)"
                :key="index"
                class="flex"
              >
                <div class="record-item flex-col">
                  <span class="info">
                    {{ coinLog.info }}
                  </span>
                  <span class="time">{{ coinLog.time | dateFormat }}</span>
                </div>
                <div class="record-item flex-col">
                  <span :class="['amount', coinLog.type === 0 ? 'in' : 'out']"
                    >{{ coinLog.type === 1 ? '-' : ''
                    }}{{ coinLog.amount }}</span
                  >
                  <span class="status">{{ coinLog.status }}</span>
                </div>
              </li>
            </ul>
          </section>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

export default {
  data() {
    return {
      activeTab: '0',
      keyword: '',
      typeList: [
        {
          name: '全部',
          value: -1,
        },
        {
          name: '收入',
          value: 0,
        },
        {
          name: '支出',
          value: 1,
        },
      ],
      coinLogs: [
        {
          type: 1,
          info: '充值',
          amount: 105.56,
          time: 1500000000,
          status: '充值成功',
        },
        {
          type: 1,
          info: '充值',
          amount: 105.56,
          time: 1500000000,
          status: '充值成功',
        },
        {
          type: 0,
          info: '银行卡余额不足',
          amount: 105.56,
          time: 1500000000,
          status: '充值失败',
        },
        {
          type: 0,
          info: '充值',
          amount: 105.56,
          time: 1500000000,
          status: '充值成功',
        },
        {
          type: 0,
          info: '充值',
          amount: 105.56,
          time: 1500000000,
          status: '充值成功',
        },
      ],
    }
  },
  methods: {
    onLoad() {},
    coinLogFilter(type) {
      return type === -1
        ? this.coinLogs
        : this.coinLogs.filter(item => item.type === type)
    },
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    },
    dateFormat: function(value) {
      return dateTime(value, 'YYYY-MM-DD hh:mm:ss')
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-wallet-coin-log {
  .container {
    background-color: #fff;

    .header {
      padding: 0 40px;
      height: 53px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;

      .condition-desc {
        height: 53px;
        line-height: 53px;
        font-size: 17px;
        color: #06bcbf;
        border-bottom: 2px solid #06bcbf;
      }
    }
    .record-list {
      padding: 0 15px 10px;

      ul {
        li {
          justify-content: space-between;
          text-align: center;
          height: 69px;
          border-bottom: 1px solid #eee;

          .record-item {
            justify-content: center;

            .info {
              font-size: 15px;
              color: #565656;
            }

            .amount {
              font-size: 15px;
              color: #565656;
            }

            .time {
              margin-top: 9px;
              font-size: 13px;
              color: #aeaeae;
            }

            .status {
              margin-top: 9px;
              font-size: 13px;
              color: #aeaeae;
            }

            .in {
              color: #0db219;
            }
            .out {
              color: #ff8400;
            }

            &:first-child {
              align-items: flex-start;
            }
            &:last-child {
              align-items: flex-end;
            }
          }
        }
      }
    }
  }
}
</style>
