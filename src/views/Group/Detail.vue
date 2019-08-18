<template>
  <div>
    <good :good="good" />

    <div
      v-if="good.isSuccess != 1 && good.isSuccess != 2"
      class="status status-normal"
    >
      <div class="count">
        <span>已有</span>
        <span class="value">{{ people.length }}</span>
        <span>人</span>
        <template v-if="good.limitMinSize - people.length > 0">
          <span>，离最低人数只差</span>
          <span class="value">{{ good.limitMinSize - people.length }}</span>
          <span>人啦</span>
        </template>
        <span v-else>，已经达到最低人数了</span>
      </div>

      <div v-if="during != null" class="date">
        <span class="name">剩余</span>
        <span class="value">{{ during | day | padding }}</span>
        <span class="sep">:</span>
        <span class="value">{{ during | hour | padding }}</span>
        <span class="sep">:</span>
        <span class="value">{{ during | minute | padding }}</span>
        <span class="sep">:</span>
        <span class="value">{{ during | second | padding }}</span>
      </div>

      <div v-if="people.length > 0" class="people">
        <img
          v-for="p in people.slice(0, 5)"
          :key="p.orderId"
          :src="p.headImgUrl"
          alt
        />
      </div>

      <div v-if="good.order && good.orderStatus == 1" class="complete">
        <span class="iconfont">&#xe75e;</span>已参团，等待满员
      </div>
      <button v-if="!good.order" class="group-btn" @click="onClick">
        我要参团
      </button>

      <invitation wireframe @click="onShowShare">邀请好友参团</invitation>
    </div>

    <div v-if="good.isSuccess == 1" class="status status-success">
      <p class="result">
        <span class="iconfont">&#xe740;</span>
        <span>拼团成功，商品太受欢迎了</span>
      </p>

      <div v-if="people.length > 0" class="people">
        <img
          v-for="p in people.slice(0, 5)"
          :key="p.orderId"
          :src="p.headImgUrl"
          class="people-item"
          alt
        />
        <div
          class="people-item people-stat"
          src="~@/assets/images/errand_avatar.png"
        >
          5人
        </div>
      </div>

      <button @click="toOrderList" class="group-btn">查看我的拼团订单</button>
    </div>

    <div v-if="good.isSuccess == 2" class="status status-fail">
      <p class="result">
        <span class="iconfont">&#xe73e;</span>
        <span>拼团失败，参团人数未达到最低要求</span>
      </p>
      <p class="desc">退款金额已原路退回</p>

      <div v-if="people.length > 0" class="people">
        <img
          v-for="p in people.slice(0, 5)"
          :key="p.orderId"
          :src="p.headImgUrl"
          class="people-item"
          alt
        />
        <div
          class="people-item people-stat"
          src="~@/assets/images/errand_avatar.png"
        >
          {{ people.length }}人
        </div>
      </div>

      <button @click="toOrderList" class="group-btn">查看退款</button>
    </div>

    <manual />

    <desc-comment
      :active="active"
      :desc="good.goodsDesc"
      @onChange="onChange"
    />

    <van-popup
      v-model="shareShow"
      position="bottom"
      :style="{ maxHeight: '75%' }"
    >
      <share />
    </van-popup>
  </div>
</template>

<script>
import Good from './components/Good'
import Manual from './components/Manual'
import Invitation from './components/Invitation'
import DescComment from '@/components/DescComment'
import Share from '@/components/Share'

export default {
  components: {
    Good,
    Share,
    Manual,
    Invitation,
    DescComment,
  },

  data() {
    return {
      active: 'desc',
      complete: false,
      shareShow: false,
      good: {
        isSuccess: 0,
      },
      people: [],
      lastDate: null,
      during: null,
    }
  },

  created() {
    this.fetchData()
    this.timer = setInterval(this.updateDate, 1000)
  },

  beforeDestroy() {
    window.clearInterval(this.timer)
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      this.$http
        .get('/api-wxmp/cxxz/assemble/findGoodsDetail', {
          params: { id: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.good = data.datas
            this.lastDate = new Date(data.datas.limitEndDate.replace(' ', 'T'))
          }
        })

      this.$http
        .post('/api-wxmp/cxxz/order/getPTUser', {
          goodsId: this.$route.params.id,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.people = data.datas
          }
        })
    },

    updateDate() {
      if (this.lastDate) {
        this.during = Math.max(this.lastDate - Date.now(), 0)
      }
    },

    onChange(type) {
      this.active = type
    },

    onShowShare() {
      this.shareShow = true
    },

    onClick() {
      this.$router.push(`/group/order/${this.$route.params.id}`)
    },

    toOrderList() {
      this.$router.push('/order/group')
    },
  },
}
</script>

<style lang="less" scoped>
.status {
  padding: 20px 15px 35px;
  background: #fff;
}

.status-normal {
  .count {
    text-align: center;
    margin-bottom: 12px;
    font-size: 16px;
    color: #2d2d2d;
    .value {
      color: #f94141;
    }
  }

  .date {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    .name {
      margin-right: 7px;
    }
    .value {
      text-align: center;
      height: 20px;
      line-height: 20px;
      padding: 0 2px;
      border-radius: 2px;
      color: #fff;
      background-color: #2f2f2f;
    }
    .sep {
      margin: 0 4px;
    }
  }

  .people {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50%;
      &:last-child {
        margin: 0;
      }
    }
  }

  .group-btn {
    display: block;
    width: 100%;
    height: 46px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 18px;
    color: #fff;
    background-image: linear-gradient(#f94141, #f94141),
      linear-gradient(#fe5e60, #fe5e60);
  }

  .complete {
    height: 46px;
    line-height: 46px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 18px;
    color: #1aac19;
    .iconfont {
      margin-right: 6px;
    }
  }
}

.status-success {
  .result {
    text-align: center;
    margin-bottom: 30px;
    font-size: 16px;
    color: #1ecb63;

    .iconfont {
      margin-right: 5px;
      font-size: 18px;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .people {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .people-item {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    &:last-child {
      margin: 0;
    }
  }

  .people-stat {
    text-align: center;
    line-height: 50px;
    border-radius: 100%;
    font-size: 15px;
    color: #474747;
    background-color: #ebebeb;
  }

  .group-btn {
    display: block;
    width: 100%;
    height: 46px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 18px;
    color: #f94141;
    border: solid 1px #f94141;
  }
}

.status-fail {
  .result {
    text-align: center;
    margin-bottom: 11px;
    font-size: 16px;
    color: #ffa250;

    .iconfont {
      margin-right: 5px;
      font-size: 18px;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .desc {
    text-align: center;
    margin-bottom: 30px;
    font-size: 13px;
    color: #8d8d8d;
  }

  .people {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .people-item {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    &:last-child {
      margin: 0;
    }
  }

  .people-stat {
    text-align: center;
    line-height: 50px;
    border-radius: 100%;
    font-size: 15px;
    color: #474747;
    background-color: #ebebeb;
  }

  .group-btn {
    display: block;
    width: 100%;
    height: 46px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 18px;
    color: #ff7800;
    border: solid 1px #ff7800;
  }
}
</style>
