<template>
  <div class="new-page">
    <div class="article">
      <h1>{{ article.title }}</h1>
      <new-info :date="article.releaseDate" :read="300" />
      <div class="content" v-html="article.content"></div>
    </div>

    <a v-if="ad.adId" :href="ad.extUrl || ad.link" class="block banner">
      <div class="rec-block-title">{{ ad.title }}</div>
      <img :src="ad.adImg" alt />
    </a>

    <div class="block news" v-if="recommens.length > 0">
      <div class="block-header">
        <div class="block-title">相关推荐</div>
      </div>
      <div class="block-content">
        <router-link
          v-for="d in recommens"
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
    </div>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'
import NewInfo from '@/components/NewInfo'

export default {
  components: {
    NewInfo,
    NewItem,
  },

  data() {
    return {
      article: {},
      ad: {},
      recommens: [],
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      this.$http
        .get('/api-media/news-anon/news/findDynamicNewsDetail', {
          params: { contentId: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const { articleDetail, detailAd, recommens } = data.datas
            this.article = articleDetail
            this.ad = detailAd
            this.recommens = recommens || []
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.new-page {
  padding: 18px 0 80px;
  background: #fff;
}

.article {
  padding: 0 15px 15px;
  border-bottom: solid 1px #e5e5e5;
}

h1 {
  margin-bottom: 12px;
  line-height: 1.5;
}

.content {
  margin-top: 10px;
  line-height: 1.5;
}

.news {
  margin-top: 15px;
}

.banner {
  display: block;
  padding: 15px;
  font-size: 10px;
  color: #626262;
  background: #fff;

  img {
    display: block;
    margin-top: 7px;
    width: 100%;
  }
}
</style>
