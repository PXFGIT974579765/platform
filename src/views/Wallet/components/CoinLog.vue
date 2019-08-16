<template>
  <div class="page-my-wallet-coin-log" v-wechat-title="$route.meta.title">
    <div class="container">
      <van-tabs
        v-model="activeTab"
        class="tabs"
        title-active-color="#06bcbf"
        color="#06bcbf"
        background="#fff"
        @click="onClick"
      >
        <van-tab v-for="item in typeList" :key="item.value" :title="item.name">
          <section class="record-list">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              class="ul"
              @load="onLoad"
            >
              <div
                v-for="(coinLog, index) in coinLogs"
                :key="index"
                class="li flex"
              >
                <div class="record-item flex-col">
                  <span class="info">{{ coinLog.moneyInfo }}</span>
                  <span class="time">{{ coinLog.createTime }}</span>
                </div>
                <div class="record-item flex-col">
                  <span
                    :class="[
                      'amount',
                      coinLog.operateType === 1 && coinLog.money > 0
                        ? 'out'
                        : 'in',
                    ]"
                  >
                    ￥
                    {{
                      coinLog.operateType === 1 && coinLog.money > 0 ? '-' : ''
                    }}{{ coinLog.money | numFilter }}
                  </span>
                  <span class="status">余额：￥{{ coinLog.afterMoney }}</span>
                </div>
              </div>
            </van-list>
          </section>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: -1,
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
      coinLogs: [],
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      name: '全部',
    }
  },
  created() {
    this.fetchList({ pageIndex: this.page })
  },
  methods: {
    init() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.coinLogs = []
    },
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, coinLogs } = this
      if (coinLogs.length >= count) {
        this.finished = true
      }
    },

    fetchList({ pageIndex = 1, pageSize = 10, operateType }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/money/page', {
          pageIndex,
          pageSize,
          operateType,
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
          this.coinLogs = this.coinLogs.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.stopLoading()
        })
    },
    onClick(_, title) {
      if (this.name == title) return

      this.init()
      this.name = title
      const operateType = this.typeList.find(item => item.name == title).value

      if (operateType == -1) {
        this.fetchList({})
      } else {
        this.fetchList({ operateType })
      }
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
