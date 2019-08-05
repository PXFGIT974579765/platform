<template>
  <div class="category">
    <router-link
      v-for="t in topics"
      :key="t.id"
      :to="`/activity/list/${t.id}`"
      class="category-item"
    >
      <img class="icon" :src="t.picUrl" alt />
      <div class="name">{{ t.categoryName }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array,
    },
  },
}
</script>

<style lang="less" scoped>
.category {
  display: flex;
  margin: 8px 0;
  background: #fff;
}

.category-item {
  flex: 1;
  text-align: center;

  .icon {
    margin: 22px auto 10px;
    width: 36px;
    height: 36px;
    border-radius: 100%;
  }

  .name {
    margin-bottom: 17px;
    color: #2d2d2d;
  }
}
</style>
