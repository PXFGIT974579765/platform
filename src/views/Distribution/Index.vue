<template>
  <div class="page-my-distribution" v-wechat-title="$route.meta.title">
    <div class="info-card">
      <img :src="user.headImgUrl" class="avator" alt />
      <div class="nickname">Hi {{ user.name || user.nicknameStr }}</div>
      <div class="title">今天又是美好的一天，加油哦！</div>
      <div
        v-if="user.onlineStatus === 0"
        class="btn-online"
        @click="routeCondition"
      >
        上线接单
      </div>
      <div v-else>
        <div class="condition-area">
          <div class="condition flex">
            <div>
              <span class="iconfont">&#xe74f;</span>
              <span>{{ schoolFilter(runner.schoolId) }}</span>
            </div>
          </div>
          <div class="condition flex">
            <div>
              <span class="iconfont">&#xe74c;</span>
              <span>
                今天 {{ runner.startTime.slice(10, 16) }} -
                {{ runner.endTime.slice(10, 16) }}
              </span>
            </div>
            <div class="btn-switch-block flex">
              提前下线
              <van-switch
                v-model="checked"
                class="btn-switch"
                active-color="#06bcbf"
                inactive-color="#eee"
                size="20px"
                @change="onSwitch"
              />
            </div>
          </div>
        </div>
        <div class="status">接单中</div>
      </div>
    </div>
    <div class="btn-my-order" @click="routeOrderList">我的配送订单</div>
    <div class="footer">
      <span>了解规则</span>
      <span>|</span>
      <span>联系客服</span>
    </div>
    <NewOrderNotifyCard :showDialog="hasMsg" @routeDetail="routeDetail" />
  </div>
</template>

<script>
import NewOrderNotifyCard from './components/NewOrderNotifyCard'
import { mapGetters, mapActions } from 'vuex'
import local from '@/lib/local'

export default {
  computed: mapGetters(['user']),
  components: {
    NewOrderNotifyCard,
  },
  data() {
    return {
      checked: true,
      hasMessage: false,
      runner: {},
      hasMsg: false,
      distriOrderId: '',
    }
  },
  created() {
    if (this.user.onlineStatus == 1) {
      this.checked = false
      this.fetchOrder()
    } else {
      this.checked = false
    }
    this.runner = local.get('runner')
  },
  methods: {
    ...mapActions(['setUser']),
    routeCondition() {
      this.$router.push('/my/distribution/condition')
    },

    // 路由到详情页
    routeDetail() {
      this.$router.push(`/my/distribution-detail/${this.distriOrderId}`)
    },

    // 路由到订单列表状态
    routeOrderList() {
      this.$router.push('/my/distribution/order')
    },

    // 上下线开关
    onSwitch(checked) {
      this.checked = checked
      if (checked) {
        this.$http
          .post('/api-wxmp/cxxz/distriButtion/onLineOrOutLine', {
            userId: this.user.userId,
            onlineStatus: 0,
          })
          .then(({ data }) => {
            if (data.resp_code == 0) {
              this.user.onlineStatus = 0
              this.setUser(this.user)
            } else {
              this.$toast.fail('系统繁忙')
            }
          })
      }
    },
    schoolFilter(schoolId) {
      const school = this.runner.schools.find(item => item.schoolId == schoolId)
      return school && school.schoolName
    },
    // 查看是否有新订单
    fetchOrder() {
      this.$http
        .get('/api-wxmp/cxxz/distriButtion/order/findMyOrder/status')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.hasMsg = data.datas.hasMsg == 1 ? true : false
            this.distriOrderId = data.datas.distriOrderId
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-distribution {
  padding: 0 15px;

  .info-card {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 50px;
    text-align: center;
    background-color: #fff;

    .avator {
      margin-top: -30px;
      width: 78px;
      height: 78px;
      border-radius: 50%;
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
