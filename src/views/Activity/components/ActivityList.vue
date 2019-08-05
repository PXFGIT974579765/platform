<template>
  <div class="activity-list">
    <router-link
      v-for="l in list"
      :key="l.id"
      :to="`/activity/detail/${l.id}`"
      class="activity-item"
    >
      <img :src="l.itemPicUrl" alt />
      <div class="content">
        <div class="name ellipsis-2">{{ l.title }}</div>
        <div class="date">
          <span>{{ l.startTime }}</span>
          <!-- <span></span> -->
          <!-- <span>{{l.startTime}}</span> -->
        </div>
        <div class="address">{{ l.address }}</div>
        <div class="others">
          <div class="price">
            {{ l.priceInfo ? `¥${l.priceInfo}` : '免费参加' }}
          </div>
          <div class="count">{{ l.enrollmentNum }}人报名</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
}
</script>

<style lang="less" scoped>
.activity-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px #dadada;

  img {
    width: 150px;
    height: 112px;
    margin-right: 12px;
  }

  .name {
    height: 3em;
    line-height: 1.5;
    margin-bottom: 5px;
    font-size: 15px;
    color: #2d2d2d;
  }

  .date,
  .address {
    font-size: 12px;
    color: #b2b2b2;
  }

  .address {
    margin: 6px 0 15px;
  }

  .others {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #ff9000;
  }
}
</style>
