<template>
  <div class="point">
    <div class="header">
      <search light />
    </div>

    <van-tabs
      v-model="active"
      color="#07bfb6"
      line-height="1px"
      background="#f4f4f4"
      :border="false"
      :swipe-threshold="5"
    >
      <van-tab title="积分兑换" name="a">
        <exchange />
      </van-tab>

      <van-tab title="兑换记录" name="b">
        <record />
      </van-tab>

      <van-tab title="玩转积分" name="c">
        <earn />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Search from '@/components/Search'
import Record from './components/Record'
import Exchange from './components/Exchange'
import Earn from './components/Earn'

export default {
  components: {
    Search,
    Record,
    Exchange,
    Earn,
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
</style>
