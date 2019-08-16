<template>
  <div class="page-my-score" v-wechat-title="$route.meta.title">
    <div class="page-header">
      <div class="score-box flex-col">
        <span>{{ user.integral }}</span>
        <span>可用积分</span>
      </div>
      <span class="btn_exchange" @click="routeScoreSC">去兑换礼品</span>
    </div>
    <div class="page-list">
      <div class="title flex">
        <span>积分明细</span>
        <span>积分规则</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <div>
            <div class="name">{{ item.scoreSettingName }}</div>
            <div class="time">{{ item.createTime }}</div>
          </div>
          <div>
            <div
              :class="[
                item.operateType === 0 ? 'score-in' : 'score-out',
                'score',
              ]"
            >
              {{ item.operateType === 0 ? `+${item.score}` : `-${item.score}` }}
            </div>
            <div class="status">
              {{ item.operateType === 0 ? '收入' : '支出' }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      list: [],
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
    }
  },
  created() {
    this.fetchInfo({})
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
      const { count, list } = this
      if (list.length >= count) {
        this.finished = true
      }
    },
    // 路由到积分商城
    routeScoreSC() {
      this.$router.push('/point')
    },
    // 拉去活动信息
    fetchInfo({ pageIndex = 1, pageSize = 10 }) {
      this.startLoading()

      this.$http
        .post('/api-wxmp/cxxz/score/page', {
          pageIndex,
          pageSize,
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
          this.list = this.list.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.stopLoading()
        })
    },
    onLoad() {
      this.fetchList({ pageIndex: this.page + 1 })
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-score {
  padding-bottom: 200px;

  .page-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-image: url('../images/bg_score.png');
    background-size: 100% 100%;
    color: #fff;

    .btn_exchange {
      position: absolute;
      right: 15px;
      top: 31px;
      font-size: 13px;
    }

    .score-box {
      width: 150px;
      justify-content: center;
      align-items: center;

      span {
        display: inline-block;

        &:first-child {
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 67px;
        }

        &:last-child {
          margin-top: 20px;
          height: 15px;
          line-height: 15px;
          font-size: 16px;
        }
      }
    }
  }

  .page-list {
    position: relative;
    margin: -24px 15px 0 15px;
    padding: 17px 18px 46px;
    border-radius: 3px;
    background-color: #fff;

    .title {
      justify-content: space-between;

      span {
        font-weight: bold;
        &:first-child {
          font-size: 15px;
          color: #323232;
        }

        &:last-child {
          font-size: 13px;
          color: #06beb9;
        }
      }
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding: 13px 0px;
      border-bottom: 1px solid #eee;

      &:first-child {
        margin-top: 20px;
      }

      div {
        &:last-child {
          text-align: right;
        }
      }

      .name {
        font-size: 13px;
        font-weight: bold;
        color: #3d3d3d;
      }

      .score {
        font-size: 15px;
        font-weight: bold;
      }

      .score-in {
        color: #ffa200;
      }

      .score-out {
        color: #06bdbb;
      }

      .time {
        margin-top: 7px;
        font-size: 10px;
        color: #b4b4b4;
      }

      .status {
        margin-top: 7px;
        font-size: 10px;
        color: #b4b4b4;
      }
    }
  }
}
</style>
