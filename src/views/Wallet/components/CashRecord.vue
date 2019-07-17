<template>
  <div class="comp-my-wallet-cash-record" v-wechat-title="$route.meta.title">
    <div class="container">
      <header class="header flex">
        <div class="condition-desc">{{ curConditionDesc }}</div>
        <div>
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="curCondition"
              :options="condition"
              @change="onChange"
            />
          </van-dropdown-menu>
        </div>
      </header>
      <section class="record-list">
        <ul>
          <li v-for="(record, index) in records" :key="index" class="flex">
            <div class="record-item flex-col">
              <span class="info">
                {{ record.info }}
              </span>
              <span class="time">{{ record.time | dateFormat }}</span>
            </div>
            <div class="record-item flex-col">
              <span :class="['amount', amountClass(record.status)]">{{
                record.amount
              }}</span>
              <span :class="['status', statusClass(record.status)]">{{
                record.status
              }}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

const STATUS_CLASS = {
  提现中: 'waiting',
  提现失败: 'fail',
  提现成功: 'success',
}

const AMOUNT_CLASS = {
  提现中: 'waiting',
  提现失败: 'fail',
  提现成功: 'amount',
}
export default {
  data() {
    return {
      curConditionDesc: '全部',
      curCondition: -1,
      condition: [
        { text: '全部', value: -1 },
        { text: '2019.6', value: 1 },
        { text: '2019.5', value: 2 },
        { text: '2019.4', value: 3 },
        { text: '2019.3', value: 4 },
      ],
      records: [
        {
          info: '余额提现',
          amount: 105.56,
          time: 1500000000,
          status: '提现成功',
        },
        {
          info: '余额提现',
          amount: 105.56,
          time: 1500000000,
          status: '提现中',
        },
        {
          info: '余额提现',
          amount: 105.56,
          time: 1500000000,
          status: '提现失败',
        },
        {
          info: '余额提现',
          amount: 105.56,
          time: 1500000000,
          status: '提现成功',
        },
        {
          info: '余额提现',
          amount: 105.56,
          time: 1500000000,
          status: '提现成功',
        },
      ],
    }
  },
  methods: {
    onLoad() {},
    onChange(value) {
      const conditionDesc = this.condition.find(item => item.value === value)
        .text
      this.curConditionDesc = conditionDesc
    },
    statusClass: function(status) {
      return STATUS_CLASS[status]
    },
    amountClass: function(status) {
      return AMOUNT_CLASS[status]
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
.comp-my-wallet-cash-record {
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

            .fail {
              color: #ff5c5c;
            }

            .waiting {
              color: #ff8400;
            }

            .success {
              color: #aeaeae;
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
