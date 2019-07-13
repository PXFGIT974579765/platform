<template>
  <div class="page-my-order-first" v-wechat-title="$route.meta.title">
    <div class="menu-wapper">
      <router-link
        to=""
        v-for="item in orderType"
        :key="item.name"
        class="type-item flex-col"
      >
        <div class="flex-col item-icon">
          <span
            :style="{ color: item.color }"
            class="iconfont icon"
            v-html="item.icon"
          ></span>
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="tag" v-if="item.num > 0">{{ item.num }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderType: [
        {
          name: '商品订单',
          icon: '&#xe76b;',
          color: '#55c2ff',
          num: 12,
        },
        {
          name: '拼团订单',
          icon: '&#xe76c;',
          color: '#ff766e',
          num: 0,
        },
        {
          name: '打印订单',
          icon: '&#xe76a;',
          color: '#b985ff',
          num: 2,
        },
        {
          name: '活动订单',
          icon: '&#xe769;',
          color: '#ffd163',
          num: 2,
        },
        {
          name: '租赁订单',
          icon: '&#xe767;',
          color: '#6cf088',
          num: 2,
        },
        {
          name: '跑腿订单',
          icon: '&#xe766;',
          color: '#4ac1ff',
          num: 2,
        },
      ],
    }
  },
  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.page-my-order-first {
  padding: 35px 1.9%;
  display: flow-root;

  .menu-wapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding: 7px;

    .type-item {
      position: relative;
      grid-column: span 4;
      height: 105px;
      align-items: center;
      justify-content: center;
      margin: 5px;
      border-radius: 6px;
      background-color: #fff;

      .item-icon {
        align-items: center;
        justify-content: center;
      }

      .icon {
        width: 29px;
        height: 29px;
        font-size: 29px !important;
      }

      .name {
        margin-top: 11px;
        font-size: 15px;
        color: #585858;
      }

      .tag {
        position: absolute;
        right: 0;
        top: 0;
        padding: 3px 6px;
        border-radius: 10px;
        font-size: 13px;
        background: #ff3d3d;
        color: #fff;
      }
    }
  }
}
</style>
