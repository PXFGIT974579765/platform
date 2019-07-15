<template>
  <div class="comp-address-card" v-wechat-title="$route.meta.title">
    <span class="iconfont icon">&#xe74f;</span>
    <div class="address">
      <div>
        <span class="name">{{ contact.name }}</span>
        <span class="phone">{{ contact.phone }}</span>
      </div>
      <div class="addr">{{ contact.address }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      default: function() {
        return {
          name: '刘国贵',
          phone: '19985501144',
          address: '贵州省贵阳市花溪区大学城贵州师范大学B1男生素质302寝室',
        }
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
  justify-content: space-between;
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
