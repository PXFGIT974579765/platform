<template>
  <div class="person-card">
    <img src="~@/assets/images/errand_avatar.png" alt class="avatar" />
    <div class="content">
      <div class="name">{{ data.name }}</div>
      <div class="info">
        <div class="count">已跑 {{ data.count }} 单</div>
        <div class="score">
          <div>
            <van-rate
              :value="(data.score * 5) / 10"
              :size="12"
              color="#ffad43"
            />
          </div>
          <div class="score-num">{{ data.score }}</div>
        </div>
      </div>
    </div>
    <router-link :to="`/errand/order/${data.id}`" class="order"
      >雇TA</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>

<style lang="less" scoped>
.person-card {
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
