<template>
  <div>
    <good :good="good" />

    <div class="status">
      <div class="count">
        <span>已有</span>
        <span class="value">4</span>
        <span>人，离最低人数只差</span>
        <span class="value">1</span>
        <span>人啦</span>
      </div>

      <div class="date">
        <span class="name">剩余</span>
        <span class="value">05</span>
        <span class="sep">:</span>
        <span class="value">10</span>
        <span class="sep">:</span>
        <span class="value">23</span>
        <span class="sep">:</span>
        <span class="value">02</span>
      </div>

      <div class="people">
        <img src="~@/assets/images/errand_avatar.png" alt />
        <img src="~@/assets/images/errand_avatar.png" alt />
        <img src="~@/assets/images/errand_avatar.png" alt />
        <img src="~@/assets/images/errand_avatar.png" alt />
        <img src="~@/assets/images/errand_avatar.png" alt />
      </div>

      <router-link to="/group/order/1" v-if="!complete" class="group-btn"
        >我要参团</router-link
      >
      <div v-else class="complete">
        <span class="iconfont">&#xe75e;</span>已参团，等待满员
      </div>

      <invitation wireframe>邀请好友参团</invitation>
    </div>

    <manual />

    <desc-comment
      :active="active"
      :desc="good.goodsDesc"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import Good from './components/Good'
import Manual from './components/Manual'
import Invitation from './components/Invitation'
import DescComment from '@/components/DescComment'

export default {
  components: {
    Good,
    Manual,
    Invitation,
    DescComment,
  },

  data() {
    return {
      active: 'desc',
      complete: false,
      good: {},
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
        .get('/api-wxmp/cxxz/assemble/findGoodsDetail', {
          params: { id: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.good = data.datas
          }
        })
    },

    onChange(type) {
      this.active = type
    },
  },
}
</script>

<style lang="less" scoped>
.status {
  padding: 20px 15px 35px;
  background: #fff;
}

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
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
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
  margin-bottom: 40px;
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
  line-height: 46px;
  text-align: center;
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
</style>
