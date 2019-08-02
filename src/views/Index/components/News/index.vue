<template>
  <div class="news">
    <router-link
      v-for="d in dynamicNews"
      :key="d.contentId"
      :to="`/index/news/${d.contentId}`"
      class="new-link"
    >
      <new-item
        :key="d.contentId"
        :title="d.title"
        :date="d.releaseDate"
        :read="452"
        :image="d.headerImage.split('@')[0]"
      />
    </router-link>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'

export default {
  components: {
    NewItem,
  },

  data() {
    return {
      dynamicNews: [],
    }
  },

  created() {
    this.$http
      .get('/api-media/news-anon/news/dynamicNewsPage', {
        params: { pageIndex: 1, pageSize: 20 },
      })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.dynamicNews = data.datas.data
        }
      })
  },
}
</script>

<style lang="less" scoped>
.news {
  padding: 20px 15px;
  background: #fff;
}
</style>
