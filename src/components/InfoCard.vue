<template>
  <div class="info-card">
    <div class="header" v-if="hasSearch">
      <search />
      <button class="qrcode">
        <span class="iconfont">&#xe746;</span>
      </button>
    </div>

    <div v-if="isLogined">
      <person-desc />

      <hr />

      <div class="score">
        <div :class="{ isSign: !isSign }" v-if="!isSign" @click="signRoute">
          <span>一键签到</span>
          <span>未签到</span>
        </div>
        <div :class="{ isSign: !isSign }" @click="scoreRoute">
          <span>我的积分</span>
          <span>1724</span>
        </div>
        <div :class="{ isSign: !isSign }" @click="levelRoute">
          <span>我的排名</span>
          <span>450</span>
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

export default {
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
  },
  data() {
    return {
      value: '',
      isLogined: true, // 是否登录
      isSign: false, // 是否签单
    }
  },

  methods: {
    onSearch() {
      //
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
  padding: 15px 15px 40px;
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
