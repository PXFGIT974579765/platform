<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <van-tabs
      v-model="active"
      color="#07bfb6"
      line-height="1px"
      :border="false"
      :swipe-threshold="5"
    >
      <van-tab title="全部" name="a">
        <order-item />
        <order-item />
        <order-item />
        <order-item />
      </van-tab>

      <van-tab title="进行中" name="b">
        <order-item />
        <order-item />
      </van-tab>

      <van-tab title="待支付" name="c">
        <order-item />
        <order-item />
        <order-item />
      </van-tab>

      <van-tab title="已取消" name="d">
        <order-item />
        <order-item />
      </van-tab>

      <van-tab title="已完成" name="e">
        <order-item />
        <order-item />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import OrderItem from './components/OrderItem'

export default {
  components: {
    Search,
    OrderItem,
  },

  data() {
    return {
      active: 'a',
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 13px 20px;
  background: #fff;
}

.van-tab__pane {
  padding: 10px 15px 150px;
}
</style>
