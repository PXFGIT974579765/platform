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
              class="ul"
              @load="onLoad"
            >
              <div
                v-for="(coinLog, index) in coinLogs"
                :key="index"
                class="li flex"
              >
                <div class="record-item flex-col">
                  <span class="info">{{ coinLog.orderType }}</span>
                  <span class="time">{{ coinLog.createTime }}</span>
                </div>
                <div class="record-item flex-col">
                  <span
                    :class="[
                      'amount',
                      coinLog.operateType === 0 ? 'in' : 'out',
                    ]"
                  >
                    {{ coinLog.operateType === 1 ? '-' : '' }} ￥{{
                      coinLog.money | numFilter
                    }}
                  </span>
                  <span class="status">余额：￥{{ coinLog.coin }}</span>
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
      coinLogs: [],
      page: 1,
      finished: false,
      loading: true,
      name: '全部',
    }
  },
  created() {
    this.fetchList({ pageIndex: this.page })
  },
  methods: {
    startFetch() {
      this.finished = false
      this.loading = true
    },
    endFetch() {
      this.finished = true
      this.loading = false
    },
    fetchList({ pageIndex = 1, pageSize = 10, operateType }) {
      this.startFetch()
      this.$http
        .post('/api-wxmp/cxxz/money/page', {
          params: {
            pageIndex,
            pageSize,
            operateType,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.endFetch()
            this.coinLogs = []
            this.coinLogs = data.datas.data
          }
        })
    },
    onClick(_, title) {
      if (this.name == title) {
        return
      }
      this.name = title
      const status = this.typeList.find(item => item.name == title).value
      if (status == -1) {
        this.fetchList({})
      } else {
        this.fetchList({ operateType: status })
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
