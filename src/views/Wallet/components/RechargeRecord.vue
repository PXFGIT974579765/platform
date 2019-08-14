<template>
  <div
    class="page-my-wallet-recharge-record"
    v-wechat-title="$route.meta.title"
  >
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
              <span :class="['info', record.status != 1 && 'fail']">充值</span>
              <span class="time">{{ record.createTime }}</span>
            </div>
            <div class="record-item flex-col">
              <span :class="['amount', record.status != 1 && 'fail']"
                >￥{{ record.money | numFilter }}</span
              >
              <span :class="['status', record.status != 1 && 'fail']">
                {{ record.status == 1 ? '成功' : '失败' }}
              </span>
            </div>
          </div>
        </van-list>
      </section>
    </div>
  </div>
</template>

<script>
import { curDate } from '@/lib/format'

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
    // 拉去订单信息
    fetchList({
      pageIndex = 1,
      pageSize = 10,
      applyTime = curDate('yyyy-MM'),
    }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/money/page', {
          params: {
            pageIndex,
            pageSize,
            applyTime,
            orderType: 'CZ',
          },
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
.page-my-wallet-recharge-record {
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
