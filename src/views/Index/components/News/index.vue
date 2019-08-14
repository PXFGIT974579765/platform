<template>
  <div class="news">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
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
    </van-list>
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
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      dynamicNews: [],
    }
  },

  created() {
    this.fetchList(this.page)
  },

  methods: {
    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, dynamicNews } = this
      if (dynamicNews.length >= count) {
        this.finished = true
      }
    },

    fetchList(pageIndex = 1, pageSize = 10) {
      this.startLoading()

      this.$http
        .get('/api-media/news-anon/news/dynamicNewsPage', {
          params: {
            pageIndex,
            pageSize,
          },
        })
        .then(({ data }) => {
          this.stopLoading()

          if (data.resp_code !== 0) {
            this.error = true
            return
          }

          this.page = pageIndex
          this.count = data.datas.count
          this.dynamicNews = this.dynamicNews.concat(data.datas.data)

          this.finishCheck()
        })
        .catch(() => {
          this.error = true
          this.stopLoading()
        })
    },

    onLoad() {
      this.fetchList(this.page + 1)
    },
  },
}
</script>

<style lang="less" scoped>
.news {
  padding: 20px 15px 60px;
  background: #fff;
}
</style>
