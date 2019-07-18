<template>
  <div class="page-my-distribution" v-wechat-title="$route.meta.title">
    <div class="info-card">
      <img src="./images/avator2.png" class="avator" alt="" />
      <div class="nickname">Hi {{ info.nickname }}</div>
      <div class="title">今天又是美好的一天，加油哦！</div>
      <div class="btn-online">上线接单</div>
    </div>
    <div class="btn-my-order">我的配送订单</div>
    <div class="footer">
      <span>了解规则</span>
      <span>|</span>
      <span>联系客服</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        nickname: '小刘哥',
      },
    }
  },
  methods: {
    onLoad() {},
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
