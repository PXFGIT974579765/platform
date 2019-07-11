<template>
  <div class="lobby">
    <p>当前共有 {{ count }} 名跑腿员等待接单</p>

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
      list: [
        {
          id: 1,
          name: '王多鱼',
          sex: '男',
          count: 20,
          score: 9.2,
        },
        {
          id: 2,
          name: '王多鱼',
          sex: '男',
          count: 20,
          score: 9.2,
        },
        {
          id: 3,
          name: '王多鱼',
          sex: '男',
          count: 20,
          score: 9.2,
        },
        {
          id: 4,
          name: '王多鱼',
          sex: '男',
          count: 20,
          score: 9.2,
        },
      ],
      loading: false,
      finished: true,
      error: false,
    }
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
