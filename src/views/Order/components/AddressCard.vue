<template>
  <div class="comp-address-card" v-wechat-title="$route.meta.title">
    <span class="iconfont icon">&#xe74f;</span>
    <div class="address" v-if="contact.distribution">
      <div>
        <span class="name">{{ contact.distribution.userName }}</span>
        <span class="phone">{{ contact.distribution.userPhone }}</span>
      </div>
      <div class="addr">{{ contact.distribution.sendAddress }}</div>
    </div>
    <div v-else class="address">
      <div>
        <span class="name">自提地址</span>
        <span class="phone">{{ contact.address }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.comp-address-card {
  padding: 14px 15px;
  display: flex;
  align-items: center;
  background-color: #fff;

  .icon {
    width: 20px;
    height: 24px;
    line-height: 24px;
    font-size: 24px;
    color: #b0b0b0;
  }

  .address {
    margin-left: 15px;
    font-size: 14px;
    color: #4f4f4f;

    .phone {
      margin-left: 15px;
    }

    .addr {
      margin-top: 10px;
      color: #565656;
    }
  }
}
</style>
