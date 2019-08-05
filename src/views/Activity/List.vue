<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <activity-nav :topics="topics" />

    <div class="list">
      <div class="list-header">
        <div class="title">公益活动</div>
        <div class="dropdown">
          <van-dropdown-menu>
            <van-dropdown-item v-model="school" :options="schools" />
          </van-dropdown-menu>
        </div>
      </div>
      <activity-list :list="list" />
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import ActivityNav from './components/ActivityNav'
import ActivityList from './components/ActivityList'

export default {
  components: {
    Search,
    ActivityNav,
    ActivityList,
  },

  data() {
    return {
      option1: [
        { text: '贵州师范大学', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      topics: [],
      list: [],
      schools: [],
      school: '',
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
      this.$http.get('/api-wxmp/cxxz/topics/banners').then(({ data }) => {
        if (data.resp_code === 0) {
          this.topics = data.datas
        }
      })

      this.$http.get('/api-wxmp/cxxz/school/findSchools').then(({ data }) => {
        if (data.resp_code === 0) {
          this.schools = data.datas.map(x => ({
            text: x.schoolName,
            value: x.schoolId,
          }))
          this.school = this.schools[0].value
        }
      })

      this.fetchList()
    },

    fetchList() {
      const { id } = this.$route.params

      this.$http
        .get('/api-wxmp/cxxz/topics/pageTopics', {
          params: { pageIndex: 1, pageSize: 20, topicCategoryId: id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.list = data.datas.data
          }
        })
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
  padding: 15px 0;

  .title {
    flex: 1;
    font-size: 17px;
  }
}

.dropdown {
  margin-right: 13px;
}

.van-dropdown-menu {
  height: auto;
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
