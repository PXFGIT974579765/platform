<template>
  <div class="page-my-wallet-cash-record" v-wechat-title="$route.meta.title">
    <div class="container">
      <header class="header flex">
        <div class="condition-desc">{{ curConditionDesc }}</div>
        <div>
          <van-dropdown-menu>
            <van-dropdown-item title="选择日期" ref="item">
              <van-datetime-picker
                v-model="currentDate"
                :show-toolbar="false"
                type="year-month"
                @change="onTimeChange"
              />
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
      </header>
      <section class="record-list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="ul"
        >
          <div class="li flex" v-for="(record, index) in records" :key="index">
            <div class="record-item flex-col">
              <span class="info">余额提现</span>
              <span class="time">{{ record.createTime }}</span>
            </div>
            <div class="record-item flex-col">
              <span :class="['amount', amountClass(record.status)]">
                {{ record.money }}
              </span>
              <span :class="['status', statusClass(record.status)]">{{
                statusFilter(record.auditStatus, record.status, record.reason)
              }}</span>
            </div>
          </div>
        </van-list>
      </section>
    </div>
  </div>
</template>

<script>
import { curDate } from '@/lib/format'

const STATUS_CLASS = {
  0: 'waiting',
  2: 'fail',
  1: 'success',
}

const AMOUNT_CLASS = {
  0: 'waiting',
  2: 'fail',
  1: 'amount',
}

const AUDIT_STATUS = {
  0: '审核中',
  1: '审核成功',
  2: '审核失败',
}

const STATUS = {
  0: '提现中',
  1: '提现成功',
  2: '提现失败',
}

export default {
  data() {
    return {
      curConditionDesc: '全部',
      currentDate: new Date(),
      time: curDate('yyyy-MM'),
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      records: [],
    }
  },
  created() {
    this.fetchList({})
  },
  methods: {
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, records } = this
      if (records.length >= count) {
        this.finished = true
      }
    },
    statusFilter(auditStatus, status, reason) {
      let name = AUDIT_STATUS[auditStatus]
      if (status != 0) {
        name = STATUS[status]
      }
      if (reason) {
        name = reason
      }
      return name
    },
    // 拉去订单信息
    fetchList({
      pageIndex = 1,
      pageSize = 10,
      applyTime = curDate('yyyy-MM'),
    }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/moneyApply/page', {
          pageIndex,
          pageSize,
          applyTime,
        })
        .then(({ data }) => {
          this.stopLoading()

          if (data.resp_code !== 0) {
            this.error = true
            return
          }

          const { pageIndex, count } = data.datas
          this.page = pageIndex
          this.count = count
          this.records = this.records.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.stopLoading()
        })
    },
    // 上拉加载更多
    onLoad() {
      this.fetchList({ pageIndex: this.page + 1 })
    },
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
    onTimeChange(picker) {
      const values = picker.getValues()
      const time = `${values[0]}-${values[1]}`
      if (this.time == time) {
        return
      }
      this.time = time
      this.curConditionDesc = this.time
      this.fetchList({ applyTime: this.time })
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
.page-my-wallet-cash-record {
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

      .ul {
        .li {
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
