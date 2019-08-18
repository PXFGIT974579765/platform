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
      <van-tab
        v-for="type in couponTypes"
        :key="type.status"
        :title="type.statusName"
      >
        <div v-if="couponList.length > 0">
          <ul>
            <li v-for="item in couponFilter(type.status)" :key="item.id">
              <coupon-card :coupon="item" />
            </li>
          </ul>
        </div>
        <div class="no-more">无更多数据</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CouponCard from '@/components/Coupon'

export default {
  components: {
    CouponCard,
  },

  data() {
    return {
      active: 0,
      couponTypes: [],
      couponList: [],
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      this.$http.get('/api-wxmp/cxxz/coupon/findCoupons').then(({ data }) => {
        if (data.resp_code === 0) {
          const { couponTypes, couponList } = data.datas
          this.couponTypes = couponTypes
          this.couponList = couponList
        }
      })
    },
    couponFilter: function(status) {
      return this.couponList.filter(item => item.status == status)
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
    margin-bottom: 50px;

    li {
      margin-top: 20px;
    }
  }
  .no-more {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #7d7e80;
  }
}
</style>
