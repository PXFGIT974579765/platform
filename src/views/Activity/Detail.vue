<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <div class="activity">
      <div class="activity-detail">
        <img :src="detail.avatar" alt />

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
              <span class="iconfont">&#xe748;</span>
              <span>{{ detail.shareCount || 0 }}</span>
            </div>
            <share-button />
          </div>
          <div class="others">
            <div class="price">¥{{ detail.price }}</div>
            <div class="points">
              成功参与可获 {{ detail.sendScore }} 积分奖励
            </div>
          </div>
        </div>
      </div>

      <div class="date-address">
        <div class="item date">
          <div class="item-name">日期</div>
          <div class="item-value">
            <span>{{ detail.startTime }}</span>
            <!-- <span>星期六</span>
            <span>09:00 - 12:00</span>-->
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
        <span>限额 80 人</span>
        <span class="registration">已有 60 人报名</span>
      </div>
      <div class="peoples">
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
      </div>
    </div>

    <div class="intro">
      <div class="intro-header">介绍</div>
      <div v-html="detail.content"></div>
    </div>

    <div class="comment-block">
      <div class="comment-header">评价</div>
      <div class="comments">
        <comment />
        <comment />
        <comment />
      </div>
    </div>

    <div class="submit">
      <button class="sign" @click="onSubmit">立即报名</button>
      <!-- <button class="check">
        <span class="iconfont">&#xe746;</span>现场扫码签到
      </button>
      <button class="check checked">已扫码签到</button>
      <button class="end">活动结束，请对本次活动进行评价！</button>-->
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Comment from '@/components/Comment'
import ShareButton from '@/components/ShareButton'

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
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
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
        .post('/cxxz/order/getHDUser', { goodsId: this.$route.params.id })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.people = data.datas
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
    margin-left: 15px;
    color: #ff9000;
  }
}

.peoples {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.people-item {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.intro {
  margin: 10px 0;
  padding: 15px;
  background: #fff;

  p {
    font-size: 12px;
    line-height: 1.5;
  }
}

.intro-header,
.comment-header {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
}

.comment-block {
  margin: 10px 0 41px;
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
