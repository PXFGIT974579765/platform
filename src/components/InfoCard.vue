<template>
  <div class="info-card" :style="{ paddingBottom: paddingBottom + 'px' }">
    <div class="header" v-if="hasSearch">
      <search />
      <button class="qrcode" @click="onScan">
        <span class="iconfont">&#xe746;</span>
      </button>
    </div>

    <div v-if="true">
      <person-desc />

      <hr />

      <div class="score">
        <div
          :class="[user.isSign ? 'noSign' : 'isSign']"
          v-if="!user.isSign"
          @click="signRoute"
        >
          <span>一键签到</span>
          <span>未签到</span>
        </div>
        <div :class="[user.isSign ? 'noSign' : 'isSign']" @click="scoreRoute">
          <span>我的积分</span>
          <span>{{ user.integral }}</span>
        </div>
        <div :class="[user.isSign ? 'noSign' : 'isSign']" @click="levelRoute">
          <span>我的排名</span>
          <span>{{ user.rankNo }}</span>
        </div>
      </div>
    </div>

    <button v-else class="btn_un_login">
      <span class="iconfont">未登录</span>
    </button>
  </div>
</template>

<script>
import Search from '@/components/Search'
import PersonDesc from '@/components/PersonDesc'
import { mapGetters } from 'vuex'

const DEBUG = process.env.VUE_APP_WX_DEBUG === 'true' ? true : false

// 进行签名的时候  Android 不用使用之前的链接， ios 需要
let signUrl = window.location.href.split('#')[0]
if (window.wechaturl !== undefined) {
  signUrl = window.wechaturl
}

export default {
  computed: mapGetters(['user']),

  components: {
    Search,
    PersonDesc,
  },

  props: {
    hasSearch: {
      // 顶部是否有搜索框
      type: Boolean,
      default: true,
    },
    paddingBottom: {
      type: Number,
      default: 20,
    },
  },

  data() {
    return {
      value: '',
      tryCounts: 0,
    }
  },

  created() {
    this.configWx(window.location.href)
  },

  methods: {
    onSearch() {
      //
    },

    configWx(url) {
      this.tryCounts += 1
      this.$http
        .post('/api-wxmp/cxxz/wx/getMpConfig', {
          url,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            wx.config({
              debug: DEBUG,
              jsApiList: ['scanQRCode', 'chooseWXPay'],
              appId: data.datas.appId,
              timestamp: data.datas.timestamp,
              nonceStr: data.datas.nonceStr,
              signature: data.datas.signature,
            })

            wx.ready(() => {
              this.configed = true
              this.tryCounts = 0
            })
          }
        })
    },

    onScan() {
      if (!this.configed) {
        if (this.tryCounts >= 2) {
          this.$toast.fail('当前版本过低')
          return
        }

        this.configWx(signUrl)
        return
      }

      wx.checkJsApi({
        jsApiList: ['scanQRCode'],
        success: res => {
          if (res.errMsg == 'checkJsApi:ok' && res.checkResult['scanQRCode']) {
            this.scan()
            return
          }
          this.$toast.fail('当前版本不支持')
        },
      })
    },

    scan() {
      wx.scanQRCode({
        needResult: 0,
        scanType: ['qrCode', 'barCode'],
        success: () => {},
      })
    },

    signRoute() {
      this.$router.push('/my/sign')
    },

    scoreRoute() {
      this.$router.push('/my/score')
    },

    levelRoute() {
      this.$router.push('/my/level')
    },
  },
}
</script>

<style lang="less" scoped>
.info-card {
  position: relative;
  padding: 15px 15px 20px;
  background-image: linear-gradient(90deg, #06bcbf 0%, #07c2af 100%);
}

.header {
  display: flex;
  align-items: center;
}

.search {
  flex: 1;
  margin-right: 18px;
}

.qrcode {
  border: 0;
  background: transparent;
  outline: 0;
  .iconfont {
    font-size: 26px;
    color: #fff;
  }
}

.btn_un_login {
  position: relative;
  margin-top: 40px;
  width: 115px;
  height: 34px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #fff;
  border-radius: 17px;
  background: transparent;
  outline: 0;

  .iconfont {
    color: #f5efef;
    height: 19px;
    font-size: 20px;
    line-height: 20px;
  }
}

.isSign {
  display: flex;
  flex-direction: column-reverse;

  span {
    &:last-child {
      margin-left: 4px;
      font-size: 13px;
    }

    &:first-child {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}

.noSign {
  span {
    &:last-child {
      margin-left: 4px;
      font-size: 19px;
    }

    &:first-child {
      margin-top: 10px;
      font-size: 14px;
    }
  }
}

.person-desc {
  margin-top: 20px;
}

hr {
  height: 1px;
  margin: 22px 0 26px;
  border: 0;
  background-image: linear-gradient(#5ceae2, #5ceae2),
    linear-gradient(#feceb7, #feceb7);
  opacity: 0.41;
}

.score {
  display: flex;
  font-size: 14px;
  color: #fff;

  div {
    flex: 1;
    text-align: center;

    span {
      margin-left: 4px;
      font-size: 19px;
    }
  }
}
</style>
