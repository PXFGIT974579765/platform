<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <activity-nav :topics="topics" />

    <div class="list">
      <div class="list-header">
        <div class="title">{{ title }}</div>
        <div class="dropdown">
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="school"
              :options="schools"
              @change="onChange"
            />
          </van-dropdown-menu>
        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <activity-item v-for="l in list" :key="l.id" :data="l" />
      </van-list>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import ActivityNav from './components/ActivityNav'
import ActivityItem from './components/ActivityItem'

const school = {
  text: '全部学校',
  value: undefined,
}

export default {
  components: {
    Search,
    ActivityNav,
    ActivityItem,
  },

  data() {
    return {
      title: '',
      topics: [],
      schools: [],
      school: undefined,
      page: 1,
      count: 0,
      error: false,
      finished: false,
      loading: true,
      list: [],
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route() {
      this.initSchool()
      this.initPage()
      this.fetchData()
    },
  },

  methods: {
    initSchool() {
      this.title = ''
      this.school = undefined
    },

    initPage() {
      this.page = 1
      this.count = 0
      this.error = false
      this.finished = false
      this.list = []
    },

    fetchData() {
      this.$http.get('/api-wxmp/cxxz/topics/banners').then(({ data }) => {
        if (data.resp_code === 0) {
          this.topics = data.datas
          this.title = data.datas.find(
            ({ id }) => id === this.$route.params.id
          ).categoryName
        }
      })

      this.$http.get('/api-wxmp/cxxz/school/findSchools').then(({ data }) => {
        if (data.resp_code === 0) {
          const schools = data.datas.map(x => ({
            text: x.schoolName,
            value: x.schoolId,
          }))
          this.schools = [school, ...schools]
          this.school = this.schools[0].value
        }
      })

      this.fetchList(this.page)
    },

    startLoading() {
      this.loading = true
      this.error = false
    },

    stopLoading() {
      this.loading = false
    },

    finishCheck() {
      const { count, list } = this
      if (list.length >= count) {
        this.finished = true
      }
    },

    fetchList(pageIndex = 1, pageSize = 10) {
      this.startLoading()

      this.$http
        .get('/api-wxmp/cxxz/topics/pageTopics', {
          params: {
            pageIndex,
            pageSize,
            address: this.school,
            topicCategoryId: this.$route.params.id,
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
          this.list = this.list.concat(data.datas.data)

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

    onChange() {
      this.initPage()
      this.fetchList()
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 18px;
  background: #fff;
}

.list-header {
  position: relative;
  display: flex;
  align-items: center;

  .title {
    flex: 1;
    font-size: 17px;
  }
}

.dropdown {
  margin-right: 13px;
}

.van-hairline--top-bottom::after {
  border: 0;
}

.list {
  margin-bottom: 8px;
  padding: 0 15px;
  background: #fff;
}
</style>
