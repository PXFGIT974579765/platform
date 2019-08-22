<template>
  <div class="page-my-level" v-wechat-title="$route.meta.title">
    <div class="page-header">
      <div class="level-box flex-col">
        <div class="level-icon">
          <div class="level-num">Lv{{ info.level }}</div>
        </div>
        <span class="level-text"
          >尊贵的 Lv{{ info.level }} {{ info.levelName }}</span
        >
        <div class="progress-num">
          <span>{{ info.integral }}</span> /
          <span>{{ info.nextLevelIntegral }}</span>
        </div>
        <van-progress
          class="progress-bar"
          :percentage="info.percent"
          :show-pivot="false"
          color="#ffe400"
        />
        <div class="level-up">
          距离升级还差{{ info.nextLevelIntegral - info.integral }}积分
        </div>
      </div>
      <span class="btn_level_desc">等级说明</span>
    </div>

    <div class="vip-right card-item">
      <div class="title">
        <span>会员专属权益</span>
        <span>使用特权</span>
      </div>
      <div
        v-for="(right, index) in info.memberSpecial"
        :key="index"
        class="right-block flex"
      >
        <img :src="right.icon" class="right-icon" alt />
        <div class="right-desc flex-col">
          <span class="desc-title">{{ right.title }}</span>
          <div class="flex desc-tag">
            <div v-for="tag in right.tags" :key="tag">
              <van-tag v-if="tag != ''" class="tag" round plain>{{
                tag
              }}</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-list card-item">
      <div class="q-item" v-for="question in questions" :key="question.title">
        <div class="q-title">{{ question.title }}</div>
        <div class="q-content">{{ question.brief }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        level: '1',
        levelName: '普通会员',
        integral: 0,
        nextLevelIntegral: 0,
        percent: 0,
        memberSpecial: [],
      },
      questions: [],
    }
  },

  created() {
    this.fetchLevel()
    this.fetchQuestion()
  },
  methods: {
    fetchLevel() {
      this.$http.get('/api-wxmp/cxxz/member/memberLevel').then(({ data }) => {
        if (data.resp_code === 0) {
          this.info = data.datas

          const { integral, nextLevelIntegral } = this.info
          const percent = (integral * 100) / nextLevelIntegral

          this.info.percent = percent
        }
      })
    },
    fetchQuestion() {
      this.$http
        .get('/api-media/membership/membershipDec/list')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.questions = data.datas
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-level {
  padding-bottom: 200px;

  .page-header {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 278px;
    background-image: url('../images/bg_level.png');
    background-size: 100% 100%;
    color: #fff;

    .btn_level_desc {
      position: absolute;
      right: 15px;
      top: 31px;
      font-size: 13px;
    }

    .level-box {
      position: absolute;
      margin-top: 20px;
      width: 100%;
      justify-content: center;
      align-items: center;

      .level-icon {
        position: relative;
        width: 130px;
        height: 88px;
        background-image: url('../images/level_icon.png');
        background-size: 100% 100%;

        .level-num {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .level-text {
        margin-top: 19px;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
      }
      .progress-num {
        margin-top: 19px;
        height: 13px;
        line-height: 13px;
        font-size: 14px;

        span {
          &:first-child {
            color: #ffe400;
          }
        }
      }

      .progress-bar {
        margin-top: 10px;
        width: 80%;
      }

      .level-up {
        margin-top: 10px;
      }
    }
  }

  .card-item {
    position: relative;
    margin-left: 15px;
    padding: 17px 18px 0 18px;
    margin-right: 15px;
    border-radius: 3px;
    background-color: #fff;
  }

  .vip-right {
    margin-top: -40px;
    justify-content: space-between;
    align-items: center;

    .title {
      display: flex;
      height: 44px;
      line-height: 44px;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;

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
          height: 20px;
          font-size: 11px;
          font-weight: 500;
          color: #ff9000;
        }
      }
    }

    .right-block {
      height: 105px;
      width: 100%;
      align-items: center;

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }

      .right-icon {
        width: 57px;
        height: 57px;
        border-radius: 50%;
        color: #7ecef4;
        font-size: 55px;
        text-align: center;
      }

      .right-desc {
        margin-left: 12px;
        justify-content: center;

        .desc-title {
          font-size: 16px;
          font-weight: bold;
          color: #323232;
        }

        .desc-tag {
          margin-top: 5px;
          flex-wrap: wrap;

          .tag {
            margin-right: 5px;
            margin-top: 5px;
          }
        }
      }
    }
  }

  .q-list {
    margin-top: 14px;
    margin-bottom: 10px;

    .q-item {
      padding: 22px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }

      &:first-child {
        padding-top: 0;
      }

      .q-title {
        font-size: 15px;
        color: #323232;
        font-weight: bold;

        &::before {
          content: ' ';
          border-left: 4px solid #07c0b4;
          width: 15px;
          display: inline-block;
          height: 11px;
          margin-left: -15px;
        }
      }

      .q-content {
        margin-top: 13px;
        font-size: 13px;
        line-height: 23px;
        margin-right: -14px;
        color: #646464;
      }
    }
  }
}
</style>
