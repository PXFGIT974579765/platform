<template>
  <div class="lobby">
    <p>当前共有 {{ list.length }} 名跑腿员等待接单</p>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <person-card
        class="list-item"
        v-for="item in list"
        :key="item.id"
        :data="item"
        link
      />
    </van-list>
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'

export default {
  components: {
    PersonCard,
  },

  data() {
    return {
      count: 18,
      list: [],
      loading: false,
      finished: true,
      error: false,
    }
  },

  created() {
    this.$http
      .get('/api-wxmp/cxxz/runner/runnerErrands', {
        params: { pageIndex: 1, pageSize: 20, sourceType: 4 },
      })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.list = data.datas.data
        }
      })
  },

  methods: {
    onLoad() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.lobby {
  padding: 0 15px;
}

p {
  text-align: center;
  padding: 32px 0 16px;
  font-size: 16px;
  color: #585858;
}
</style>
