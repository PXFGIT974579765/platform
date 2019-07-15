<template>
  <div class="page-my-coupon" v-wechat-title="$route.meta.title">
    <van-tabs
      v-model="active"
      title-active-color="#06bcbf"
      color="#06bcbf"
      line-height="1px"
      :border="false"
      :swipe-threshold="5"
    >
      <van-tab title="未使用">
        <ul>
          <li v-for="(item, index) in couponFilter(0)" :key="index">
            <coupon :coupon="item" />
          </li>
        </ul>
      </van-tab>
      <van-tab title="已使用">
        <ul>
          <li v-for="(item, index) in couponFilter(1)" :key="index">
            <coupon :coupon="item" />
          </li>
        </ul>
      </van-tab>
      <van-tab title="已过期">
        <ul>
          <li v-for="(item, index) in couponFilter(2)" :key="index">
            <coupon :coupon="item" />
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Coupon from '@/components/Coupon'

export default {
  components: {
    Coupon,
  },

  data() {
    return {
      active: 0,
      coupons: [
        {
          amount: 10,
          fullAmount: 50,
          name: '超值神券',
          desc: '打印抵扣券',
          fromTime: 1500000000,
          toTime: 1500000000,
          status: 0, // 0 未使用   1 已使用  2 已过期
        },
        {
          amount: 10,
          fullAmount: 50,
          name: '超值神券',
          desc: '打印抵扣券',
          fromTime: 1500000000,
          toTime: 1500000000,
          status: 0, // 0 未使用   1 已使用  2 已过期
        },
        {
          amount: 10,
          fullAmount: 50,
          name: '超值神券',
          desc: '打印抵扣券',
          fromTime: 1500000000,
          toTime: 1500000000,
          status: 1, // 0 未使用   1 已使用  2 已过期
        },
        {
          amount: 10,
          fullAmount: 50,
          name: '超值神券',
          desc: '打印抵扣券',
          fromTime: 1500000000,
          toTime: 1500000000,
          status: 2, // 0 未使用   1 已使用  2 已过期
        },
      ],
    }
  },
  methods: {
    onLoad() {},
    couponFilter: function(status) {
      return this.coupons.filter(function(item) {
        return item.status === status
      })
    },
  },
  computed: {},
}
</script>

<style lang="less" scoped>
.page-my-coupon {
  padding: 0;

  ul {
    margin-top: 4px;
    padding: 0 15px;

    li {
      margin-top: 20px;
    }
  }
}
</style>
