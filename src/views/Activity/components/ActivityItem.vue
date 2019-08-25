<template>
  <router-link :to="`/activity/detail/${data.id}`" class="activity-item">
    <div class="img-wrap">
      <img :src="data.itemPicUrl" alt />
      <div class="tag">{{ data.categoryName }}</div>
    </div>
    <div class="content">
      <div class="name ellipsis-2">{{ data.title }}</div>
      <div class="date">
        <span>{{ convertDateTime(data.startTime, data.endTime) }}</span>
      </div>
      <div class="address">{{ data.address }}</div>
      <div class="others">
        <div class="price">
          {{ data.priceInfo ? `¥${data.priceInfo}` : '免费参加' }}
        </div>
        <div class="count">{{ data.enrollmentNum }}人报名</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { convertDateTime } from '@/lib/format'

export default {
  props: {
    data: {
      type: Object,
    },
  },

  methods: {
    convertDateTime,
  },
}
</script>

<style lang="less" scoped>
.activity-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px #dadada;

  .img-wrap {
    position: relative;
    margin-right: 12px;
  }

  img {
    display: block;
    width: 150px;
    height: 112px;
  }

  .tag {
    position: absolute;
    right: 7px;
    bottom: 7px;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    border-radius: 2px;
    font-size: 11px;
    color: #fff;
    background-image: linear-gradient(#258bfd, #258bfd),
      linear-gradient(#ff3434, #ff3434);
  }

  .content {
    flex: 1;
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
