<template>
  <div>
    <good />

    <div class="status">
      <p class="result">
        <span class="iconfont">&#xe740;</span>
        <span>拼团成功，商品太受欢迎了</span>
      </p>

      <div class="people">
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <img class="people-item" src="~@/assets/images/errand_avatar.png" alt />
        <div
          class="people-item people-stat"
          src="~@/assets/images/errand_avatar.png"
        >
          5人
        </div>
      </div>

      <button class="group-btn">查看我的拼团订单</button>
    </div>

    <manual />

    <desc-comment :active="active" @onChange="onChange" />
  </div>
</template>

<script>
import Good from './components/Good'
import Manual from './components/Manual'
import DescComment from '@/components/DescComment'

export default {
  components: {
    Good,
    Manual,
    DescComment,
  },

  data() {
    return {
      active: 'comment',
      complete: true,
    }
  },

  methods: {
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

.result {
  text-align: center;
  margin-bottom: 45px;
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
</style>
