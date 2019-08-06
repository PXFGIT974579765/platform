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
        <exchange :list="exchange" />
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
      exchange: [],
      category: [],
    }
  },

  created() {
    this.$http
      .get('/api-wxmp/cxxz/goods/score/page', {
        params: { pageIndex: 1, pageSize: 20 },
      })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.exchange = data.datas.data
        }
      })

    this.$http.get('/api-wxmp/cxxz/category/types').then(({ data }) => {
      if (data.resp_code === 0) {
        this.category = data.datas
      }
    })
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 13px 20px;
  background: #fff;
}
</style>
