<template>
  <div class="lobby">
    <p>当前共有 {{ count }} 名跑腿员等待接单</p>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list-item" v-for="item in list" :key="item.id">
        <img src="~@/assets/images/errand_avatar.png" alt class="avatar" />
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="info">
            <div class="count">已跑 {{ item.count }} 单</div>
            <div class="score">
              <div>
                <van-rate
                  :value="(item.score * 5) / 10"
                  :size="12"
                  color="#ffad43"
                />
              </div>
              <div class="score-num">{{ item.score }}</div>
            </div>
          </div>
        </div>
        <router-link :to="`/errand/order/${item.id}`" class="order"
          >雇TA</router-link
        >
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
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

.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 18px 16px;
  border-radius: 4px;
  background-color: #fff;

  &:last-child {
    margin: 0;
  }

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 100%;
  }

  .order {
    width: 57px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    border-radius: 28px;
    border: solid 1px #07c2af;
    font-size: 13px;
    color: #07c2af;
    background-color: transparent;
  }

  .count {
    font-size: 11px;
    margin-right: 12px;
  }

  .score {
    font-size: 13px;
  }

  .score-num {
    margin-left: 5px;
    color: #ffad43;
  }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 36px;
}

.info,
.score {
  display: flex;
  align-items: center;
}
</style>
