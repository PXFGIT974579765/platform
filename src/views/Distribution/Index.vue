<template>
  <div class="page-my-distribution" v-wechat-title="$route.meta.title">
    <div class="info-card">
      <img src="./images/avator2.png" class="avator" alt />
      <div class="nickname">Hi {{ info.nickname }}</div>
      <div class="title">今天又是美好的一天，加油哦！</div>
      <div v-if="info.status === 0" class="btn-online" @click="routeCondition">
        上线接单
      </div>
      <div v-else>
        <div class="condition-area">
          <div class="condition flex">
            <div>
              <span class="iconfont">&#xe74f;</span>
              <span>贵州大学城贵州师范大学***B2栋</span>
            </div>
          </div>
          <div class="condition flex">
            <div>
              <span class="iconfont">&#xe74c;</span>
              <span>今天 12:00 - 14:00</span>
            </div>
            <div class="btn-switch-block flex">
              提前下线
              <van-switch
                v-model="checked"
                class="btn-switch"
                active-color="#06bcbf"
                inactive-color="#eee"
                size="20px"
              />
            </div>
          </div>
        </div>
        <div class="status">接单中</div>
      </div>
    </div>
    <div class="btn-my-order">我的配送订单</div>
    <div class="footer">
      <span>了解规则</span>
      <span>|</span>
      <span>联系客服</span>
    </div>
    <NewOrderNotifyCard :showDialog="hasMessage" @cancel="onCancel" />
  </div>
</template>

<script>
import NewOrderNotifyCard from './components/NewOrderNotifyCard'

export default {
  components: {
    NewOrderNotifyCard,
  },
  data() {
    return {
      checked: true,
      hasMessage: false,
      info: {
        status: 1, // 0 未开始接单   1 接单中
        nickname: '小刘哥',
      },
    }
  },
  methods: {
    routeCondition() {
      this.$router.push('/my/distribution/condition')
    },
    onCancel() {
      this.hasMessage = false
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-distribution {
  padding: 0 15px;
  display: flow-root;

  .info-card {
    position: relative;
    display: flow-root;
    margin-top: 50px;
    text-align: center;
    background-color: #fff;

    .avator {
      margin-top: -30px;
      width: 78px;
      height: 78px;
    }

    .nickname {
      margin-top: 14px;
      font-size: 17px;
      font-weight: bold;
      color: #505050;
    }

    .title {
      margin-top: 14px;
      font-weight: 13px;
      color: #a5a5a5;
    }

    .btn-online {
      margin: 74px 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-color: #07c2af;
    }

    .condition-area {
      margin-top: 22px;
      padding: 29px 19px;
      background-color: #eee;

      .condition {
        margin-top: 21px;
        align-items: center;
        justify-content: space-between;

        .iconfont {
          width: 11px;
          height: 13px;
          margin-right: 9px;
          color: #32b16c;
        }

        .btn-switch-block {
          align-items: center;

          .btn-switch {
            margin-left: 8px;
          }
        }
      }
    }

    .status {
      height: 60px;
      line-height: 60px;
      font-size: 15px;
      color: #434343;
    }
  }

  .btn-my-order {
    margin-top: 22px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 15px;
    color: #585858;
    background-color: #fff;
  }

  .footer {
    margin-top: 60px;
    text-align: center;
    font-size: 14px;
    color: #585858;

    span {
      margin-right: 20px;
    }
  }
}
</style>
