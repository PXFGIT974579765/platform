<template>
  <div class="page-my-sign">
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
          <span>已连续签到4天</span>
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
        <div class="icon-day flex-col">
          <div class="icon">+5</div>
          <div class="day">1天</div>
        </div>
        <div class="icon-day flex-col">
          <div class="icon">+10</div>
          <div class="day">2天</div>
        </div>
        <div class="icon-day flex-col">
          <div class="icon">+15</div>
          <div class="day">3天</div>
        </div>
        <div class="icon-day flex-col">
          <div class="icon">+20</div>
          <div class="day">4天</div>
        </div>
        <div class="icon-day flex-col">
          <div class="icon">+25</div>
          <div class="day">5天</div>
        </div>
        <div class="icon-day flex-col">
          <div class="icon">+30</div>
          <div class="day">6天</div>
        </div>
      </div>
    </div>
    <div class="sign-links card-item">
      <div class="title">
        <span>积分明细</span>
        <span>积分规则</span>
      </div>
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
        days: 4, // 连续签到第四天
      },
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {},
  },
  filters: {
    formatDate: function(value) {
      return dateTime(value)
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-sign {
  background-color: #fff;

  .page-header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-image: url('./images/bg_level.png');
    background-size: 100% 100%;
    color: #fff;

    .btn_score_detail {
      position: absolute;
      right: 15px;
      top: 31px;
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
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }

  .sign-calendar {
    height: 90px;
    margin-top: -60px;
    justify-content: space-between;
    align-items: center;

    .icon-calender {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      line-height: 45px;
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
          background-color: #efefef;
        }

        .day {
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
