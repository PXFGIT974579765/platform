<template>
  <div class="page-my-sign" v-wechat-title="$route.meta.title">
    <div class="page-header">
      <div class="score-box flex-col">
        <span>可用积分</span>
        <span>{{ sign.score }}</span>
        <span
          >{{ sign.latestTime | formatDate }} 签到 积分+{{
            sign.latestScore
          }}</span
        >
      </div>
      <span class="btn_score_detail">积分明细</span>
    </div>
    <div class="sign-calendar card-item flex">
      <div class="flex">
        <span class="iconfont icon-calender">&#xe760;</span>
        <div class="sign-desc flex-col">
          <span>每日签到</span>
          <span>已连续签到{{ sign.days }}天</span>
        </div>
      </div>
      <div class="btn_sign">签到</div>
    </div>
    <div class="sign-days card-item">
      <div class="title">
        <span>连续签到赚积分</span>
        <span>签到规则</span>
      </div>
      <div class="days-card flex">
        <div v-for="n in 6" :key="n" class="icon-day flex-col">
          <div :class="['icon', formatIconClass(n)]">+{{ formatScore(n) }}</div>
          <div :class="['day', formatDayClass(n)]">{{ formatDay(n) }}天</div>
        </div>
      </div>
      <div class="sign-desc">连续签到6天及以上，每日签到积分+30</div>
    </div>
    <div class="sign-links card-item">
      <div class="title">去完成任务赚更多积分</div>
      <div class="link-item flex" v-for="link in links" :key="link.icon">
        <div class="flex">
          <span
            class="iconfont icon-link"
            :style="{ color: link.color }"
            v-html="link.icon"
          ></span>
          <div class="link-desc flex-col">
            <span>
              {{ link.theme }}
              <span class="link_score">+{{ link.score }} 积分</span>
            </span>
            <span>{{ link.desc }}</span>
          </div>
        </div>
        <div class="btn_go" @click="routePage(link.url)">GO</div>
      </div>
      <div class="btn-more">查看更多</div>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

export default {
  data() {
    return {
      sign: {
        score: 1598,
        latestScore: 20,
        latestTime: 1500034995950,
        days: 5, // 连续签到第四天
      },
      loading: false,
      finished: false,
      links: [
        {
          icon: '&#xe762;',
          color: '#7ecef4',
          theme: '分享链接',
          score: 500,
          desc: '把你喜欢的活动分享到朋友圈',
          url: '#',
        },
        {
          icon: '&#xe763;',
          color: '#ff6b6b',
          theme: '发起拼团',
          score: 1000,
          desc: '成功发起一次拼团活动',
          url: '#',
        },
        {
          icon: '&#xe764;',
          color: '#ffbf5a',
          theme: '公益活动',
          score: 1500,
          desc: '成功参加一次公益活动',
          url: '#',
        },
      ],
    }
  },
  methods: {
    onLoad() {},
    formatDay(n) {
      const days = this.sign.days
      return days < 6 ? n : days - 6 + n
    },
    formatScore(n) {
      const days = this.sign.days
      const th = days < 6 ? n : days - 6 + n
      const score = th * 5
      return score > 30 ? 30 : score
    },
    formatIconClass(n) {
      const days = this.sign.days
      const th = days < 6 ? n : days - 6 + n
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
      const days = this.sign.days
      const th = days < 6 ? n : days - 6 + n
      return th === days && 'day_cur'
    },
    routePage(url) {
      this.$router.push(url)
    },
  },
  filters: {
    formatDate: dateTime,
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

      .icon-link {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        color: #07c1b2;
        font-size: 45px;
        text-align: center;
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
