<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <div class="activity">
      <div class="activity-detail">
        <img :src="detail.scenePicUrl" alt />

        <div class="activity-content">
          <div class="name">
            <div class="tag">{{ detail.categoryName }}</div>
            {{ detail.title }}
          </div>
          <div class="detail">
            <div class="read-count">
              <span class="iconfont">&#xe73b;</span>
              <span>{{ detail.readCount }}</span>
            </div>
            <div class="share-count">
              <!-- <span class="iconfont">&#xe748;</span>
              <span>{{ detail.shareCount || 0 }}</span>-->
            </div>
            <share-button />
          </div>
          <div class="others">
            <div class="price">¥{{ detail.price }}</div>
            <div v-if="detail.sendScore && detail.sendScore > 0" class="points">
              成功参与可获 {{ detail.sendScore }} 积分奖励
            </div>
          </div>
        </div>
      </div>

      <div class="date-address">
        <div class="item date">
          <div class="item-name">日期</div>
          <div class="item-value">
            <span>{{ convertDateTime(detail.startTime, detail.endTime) }}</span>
          </div>
        </div>
        <div class="item address">
          <div class="item-name">地址</div>
          <div class="item-value">{{ detail.address }}</div>
        </div>
      </div>
    </div>

    <div class="people">
      <div class="people-header">
        <!-- <span>限额 80 人</span> -->
        <span class="registration">已有 {{ people.length }} 人报名</span>
      </div>
      <div class="peoples">
        <img
          v-for="p in people.slice(0, 6)"
          :key="p.orderId"
          :src="p.headImgUrl"
          class="people-item"
          alt
        />
      </div>
    </div>

    <div class="intro">
      <div class="intro-header">介绍</div>
      <div class="intro-detail" v-html="detail.content"></div>
    </div>

    <div class="comment-block">
      <div class="comment-header">评价</div>
      <div class="comments">
        <comment v-for="item in comments" :key="item.id" :comment="item" />
      </div>
    </div>

    <div v-show="detail.id" class="submit">
      <button
        v-if="
          !detail.order &&
            detail.status != 2 &&
            dateEnable(detail.bmStartTime, detail.bmEndTime)
        "
        class="sign"
        @click="onSubmit"
      >
        立即报名
      </button>
      <button
        v-if="
          detail.status != 2 && detail.order && detail.order.isScanSign == 0
        "
        class="check"
        @click="qrCodeSign"
      >
        <span class="iconfont">&#xe746;</span>现场扫码签到
      </button>
      <button
        v-if="
          detail.status != 2 && detail.order && detail.order.isScanSign == 1
        "
        class="check checked"
      >
        已扫码签到
      </button>
      <button v-if="detail.status == 2" class="end">活动已结束</button>
    </div>
  </div>
</template>

<script>
import { convertDateTime } from '@/lib/format'
import Search from '@/components/Search'
import Comment from '@/components/Comment'
import ShareButton from '@/components/ShareButton'

// const DEBUG = process.env.VUE_APP_WX_DEBUG === 'true' ? true : false

// 进行签名的时候  Android 不用使用之前的链接， ios 需要
let signUrl = window.location.href.split('#')[0]
if (window.wechaturl !== undefined) {
  signUrl = window.wechaturl
}

export default {
  components: {
    Search,
    Comment,
    ShareButton,
  },

  data() {
    return {
      detail: {},
      people: [],
      isConfiged: false,
      tryCounts: 0,
      comments: [],
    }
  },

  created() {
    this.fetchData()
    this.configWx(window.location.href)
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    convertDateTime,

    dateEnable(start, end) {
      if (!start || !end) return true

      start = new Date(start.replace(' ', 'T'))
      end = new Date(end.replace(' ', 'T'))
      const now = Date.now()

      return now >= start && now <= end
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
              debug: false,
              jsApiList: [
                'scanQRCode',
                'updateAppMessageShareData',
                'updateTimelineShareData',
              ],
              appId: data.datas.appId,
              timestamp: data.datas.timestamp,
              nonceStr: data.datas.nonceStr,
              signature: data.datas.signature,
            })

            wx.ready(() => {
              this.isConfiged = true
              this.tryCounts = 0

              // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
              wx.updateAppMessageShareData({
                title: '创新学子服务平台', // 分享标题
                desc: this.detail.title, // 分享描述
                link: process.env.VUE_APP_HOST + this.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.detail.avatar, // 分享图标
                success: function() {
                  // 设置成功
                },
              })

              // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
              wx.updateTimelineShareData({
                title: '创新学子服务平台', // 分享标题
                desc: this.detail.title, // 分享描述
                link: process.env.VUE_APP_HOST + this.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: this.detail.avatar, // 分享图标
                success: function() {
                  // 设置成功
                },
              })
            })

            wx.error(() => {
              if (!this.isConfiged) {
                if (this.tryCounts >= 2) {
                  this.$toast.fail('当前版本过低')
                  return
                }

                this.configWx(signUrl)
              }
            })
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },

    // 扫码签到
    qrCodeSign() {
      if (!this.isConfiged) {
        if (this.tryCounts >= 2) {
          this.$toast.fail('请返回首页进行扫码')
          return
        }

        this.configWx(signUrl)
        return
      }

      wx.checkJsApi({
        jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: res => {
          if (res.errMsg == 'checkJsApi:ok' && res.checkResult['scanQRCode']) {
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
              success: res1 => {
                if (res1 && res1.errMsg == 'scanQRCode:ok') {
                  const result = res1.resultStr // 当needResult 为 1 时，扫码返回的结果
                  const curGoodsId = result.split('?')[1].split('=')[1]
                  this.submitSign(curGoodsId, this.$route.params.id)
                }
              },
            })
          } else {
            this.$toast.fail('当前版本不支持')
          }
        },
      })
    },

    // 提交签到信息
    submitSign(curGoodsId, goodsId) {
      if (curGoodsId != goodsId) {
        this.$toast.fail('签到活动不一致')
        return
      }

      this.$http
        .post('/api-wxmp/cxxz/order/scanOrderHD', {
          goodsId: curGoodsId,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.$toast.success('签到成功')
            this.fetchData()
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },

    fetchData() {
      this.$http
        .get('/api-wxmp/cxxz/topics/findTopic', {
          params: { id: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.detail = data.datas
          }
        })

      this.$http
        .post('/api-wxmp/cxxz/order/getHDUser', {
          goodsId: this.$route.params.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.people = data.datas
          }
        })

      this.fetchComments()
    },

    fetchComments() {
      this.$http
        .get('/api-wxmp/cxxz/comment/findGoodsComment', {
          params: { goodsId: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.comments = data.datas
          }
        })
    },

    onSubmit() {
      this.$router.push(`/activity/order/${this.$route.params.id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 18px;
  background: #fff;
}

.activity {
  margin-bottom: 10px;
  padding-bottom: 15px;
  background: #fff;
}

.activity-detail {
  position: relative;

  img {
    display: block;
    width: 100%;
  }
}

.activity-content {
  position: relative;
  margin: 15px;
  margin-top: -33px;
  padding: 13px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(136, 136, 136, 0.3);

  .name {
    display: flex;
    line-height: 1.5;
    margin-bottom: 16px;
    font-size: 16px;
  }

  .tag {
    width: 35px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 8px;
    margin-top: 0.2em;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    background-image: linear-gradient(#16b459, #16b459),
      linear-gradient(#ff3434, #ff3434);
  }

  .detail {
    display: flex;
    margin-bottom: 16px;
    font-size: 12px;
    color: #9a9a9a;
  }

  .share-count {
    flex: 1;
    margin-left: 40px;
  }

  .share-count,
  .read-count {
    display: flex;
    align-items: center;
    .iconfont {
      margin-right: 4px;
    }
  }

  .others {
    display: flex;
    font-size: 13px;
  }

  .price {
    flex: 1;
    color: #ff9000;
  }

  .points {
    color: #06c0b5;
  }
}

.date-address {
  margin: 12px 15px 0;
  padding: 13px;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 0px 3px 0px rgba(136, 136, 136, 0.3);
}

.item {
  display: flex;
  line-height: 1.5;
  margin-bottom: 10px;
  font-size: 13px;
  color: #878787;

  &:last-child {
    margin: 0;
  }
}

.item-value {
  flex: 1;
  margin-left: 13px;
  color: #2d2d2d;
}

.people {
  margin: 10px 0;
  padding: 15px;
  background: #fff;
}

.people-header {
  padding: 0;

  .registration {
    color: #ff9000;
  }
}

.peoples {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.people-item {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 100%;

  &:last-child {
    margin-right: 0;
  }
}

.intro {
  margin: 10px 0;
  padding: 15px;
  background: #fff;
}

.intro-detail {
  line-height: 1.5;
  font-size: 14px;
}

.intro-header,
.comment-header {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
}

.comment-block {
  margin: 10px 0 66px;
  padding: 15px;
  background: #fff;
}

.submit {
  position: fixed;
  bottom: 0;
  width: 100%;

  button {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    color: #fff;
    background-color: #06c0b5;
  }

  .check {
    background-color: #00a0e9;
  }

  .end {
    background-color: #0cde8c;
  }

  .iconfont {
    margin-right: 10px;
  }
}
</style>
