<template>
  <div class="page-my-sign" v-wechat-title="$route.meta.title">
    <div class="page-header">
      <div class="score-box flex-col">
        <span>可用积分</span>
        <span>{{ user.integral }}</span>
        <span>{{ sign.scoreTime }} 签到 积分+{{ sign.score }}</span>
      </div>
      <span class="btn_score_detail">积分明细</span>
    </div>
    <div class="sign-calendar card-item flex">
      <div class="flex">
        <span class="iconfont icon-calender">&#xe760;</span>
        <div class="sign-desc flex-col">
          <span>每日签到</span>
          <span>已连续签到{{ user.signDays || 0 }}天</span>
        </div>
      </div>
      <div class="btn_sign" @click="onSignClick">
        {{ user.isSign | statusFilter }}
      </div>
    </div>
    <div class="sign-days card-item">
      <div class="title">
        <span>连续签到赚积分</span>
        <span>签到规则</span>
      </div>
      <div class="days-card flex">
        <div v-for="n in sign.keys.length" :key="n" class="icon-day flex-col">
          <div :class="['icon', formatIconClass(n)]">+{{ formatScore(n) }}</div>
          <div :class="['day', formatDayClass(n)]">{{ formatDay(n) }}天</div>
        </div>
      </div>
      <div class="sign-desc">{{ sign.remarks }}</div>
    </div>
    <div class="sign-links card-item">
      <div class="title">去完成任务赚更多积分</div>
      <div class="link-item flex" v-for="link in links" :key="link.icon">
        <div class="flex">
          <img :src="link.icon.split('@')[0]" alt />
          <div class="link-desc flex-col">
            <span>{{ link.title }}</span>
            <span>{{ link.brief }}</span>
          </div>
        </div>
        <div class="btn_go" @click="routePage(link.extUrl)">GO</div>
      </div>
      <div class="btn-more">查看更多</div>
    </div>
  </div>
</template>

<script>
const SIGN_STATUS = {
  1: '已签到',
  0: '签到',
}
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      sign: {
        score: 1598,
        scoreTime: '',
        days: 5, // 连续签到第四天
        remarks: '',

        scoreSetting: {},
        keys: [],
      },
      loading: false,
      finished: false,
      links: [],
    }
  },
  created() {
    this.fetchInfo()
    this.fetchLinks()
  },
  methods: {
    ...mapActions(['setUser']),
    fetchInfo() {
      this.$http
        .get('/api-wxmp/cxxz/registerUser/sign/getSetting')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.sign = data.datas
            const scoreSetting = data.datas.scoreSetting
            const keys = Object.keys(scoreSetting).sort()
            this.sign.scoreSetting = scoreSetting
            this.sign.keys = keys
          }
        })
    },
    fetchLinks() {
      this.$http.get('/api-media/share/task/list').then(({ data }) => {
        if (data.resp_code === 0) {
          this.links = data.datas
        }
      })
    },
    formatDay(n) {
      const days = this.user.signDays
      const length = this.sign.keys.length
      return days < length ? n : days - length + n
    },
    formatScore(n) {
      const days = this.user.signDays
      const length = this.sign.keys.length
      if (days < length) {
        return this.sign.scoreSetting[`day_${n}`]
      } else {
        const th = days - length + n
        return th < this.sign.keys.length
          ? this.sign.scoreSetting[`day_${th}`]
          : this.sign.scoreSetting[`day_${this.sign.keys.length}`]
      }
    },
    formatIconClass(n) {
      const days = this.user.signDays
      const length = this.sign.keys.length
      const th = days < length ? n : days - length + n
      let iconClass = ''
      if (th === days) {
        iconClass = 'icon_cur'
      } else if (th < days) {
        iconClass = 'icon_before'
      } else {
        iconClass = 'icon_after'
      }
      return iconClass
    },
    formatDayClass(n) {
      const days = this.user.signDays
      const length = this.sign.keys.length
      const th = days < length ? n : days - length + n
      return th === days && 'day_cur'
    },
    routePage(url) {
      this.$router.push(`/${url}`)
    },
    // 点击签到
    onSignClick() {
      if (this.user.isSign == 1) {
        return
      }
      this.$http
        .post('/api-wxmp/cxxz/registerUser/sign/days')
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.user.isSign = 1
            this.setUser(this.user)
            alert('签到成功')
          } else {
            alert(data.resp_msg)
          }
        })
    },
  },
  filters: {
    statusFilter: status => SIGN_STATUS[status],
  },
}
</script>

<style lang="less" scoped>
.page-my-sign {
  padding-bottom: 200px;

  .page-header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-image: url('../images/bg_level.png');
    background-size: 100% 100%;
    color: #fff;

    .btn_score_detail {
      position: absolute;
      right: 15px;
      top: 20px;
      font-size: 13px;
    }

    .score-box {
      position: absolute;
      margin-top: 20px;
      justify-content: center;
      align-items: center;

      span {
        display: inline-block;

        &:first-child {
          height: 20px;
          line-height: 20px;
          font-size: 13px;
        }

        &:nth-child(2) {
          margin-top: 15px;
          height: 20px;
          line-height: 20px;
          font-size: 50px;
        }

        &:last-child {
          margin-top: 12px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
        }
      }
    }
  }

  .card-item {
    position: relative;
    margin-left: 15px;
    padding: 17px 18px;
    margin-right: 15px;
    border-radius: 3px;
    background-color: #fff;
  }

  .sign-calendar {
    height: 90px;
    margin-top: -60px;
    justify-content: space-between;
    align-items: center;

    .icon-calender {
      width: 45px;
      border-radius: 50%;
      background-color: #e3fffd;
      color: #07c1b2;
      font-size: 20px;
      text-align: center;
    }

    .btn_sign {
      width: 70px;
      height: 30px;
      line-height: 26px;
      text-align: center;
      border-radius: 28px;
      color: #07c1b2;
      border: solid 2px #07c1b2;
      font-size: 15px;
    }

    .sign-desc {
      margin-left: 12px;
      justify-content: center;

      span {
        &:first-child {
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          font-weight: bold;
          color: #323232;
        }

        &:last-child {
          margin-top: 6px;
          font-size: 12px;
          color: #b9b9b9;
        }
      }
    }
  }

  .sign-links {
    margin-top: 15px;

    .title {
      font-size: 15px;
      font-weight: bold;
      color: #323232;
    }

    .link-item {
      position: relative;
      align-items: center;
      justify-content: space-between;
      padding: 17px 0px;
      background-color: #fff;
      border-bottom: 1px solid #dedede;

      img {
        width: 50px;
        height: 50px;
      }

      .link-desc {
        margin-left: 12px;
        justify-content: center;

        span {
          &:first-child {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            font-weight: 500;
            color: #323232;
          }

          &:last-child {
            margin-top: 6px;
            font-size: 12px;
            color: #b9b9b9;
          }
        }

        .link_score {
          color: #ffa200 !important;
          font-size: 12px;
        }
      }
      .btn_go {
        width: 41px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 14px;
        color: #fff;
        background-color: #07c1b2;
        font-size: 15px;
        font-weight: bold;
      }
    }

    .btn-more {
      margin-top: 16px;
      text-align: center;
      color: #9b9b9b;
    }
  }

  .sign-days {
    height: 180px;
    margin-top: 15px;

    .title {
      display: flex;
      justify-content: space-between;

      span {
        &:first-child {
          line-height: 20px;
          height: 20px;
          font-size: 15px;
          font-weight: bold;
          color: #323232;
        }

        &:last-child {
          line-height: 20px;
          height: 13px;
          font-size: 13px;
          font-weight: 500;
          color: #323232;
        }
      }
    }

    .days-card {
      height: 107px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dedede;

      .icon-day {
        align-items: center;
        justify-content: center;

        .icon {
          width: 42px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          border-radius: 50%;
        }

        .icon_before {
          color: #606060;
          background-color: #efefef;
        }

        .icon_cur {
          color: #fff;
          background-color: #07c1b2;
        }

        .icon_after {
          color: #07c1b2;
          background-color: #efefef;
        }

        .day {
          margin-top: 10px;
          color: #606060;
        }

        .day_cur {
          color: #07c1b2;
        }
      }
    }

    .sign-desc {
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      color: #979797;
    }
  }
}
</style>
