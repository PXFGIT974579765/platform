<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <activity-nav />

    <div class="list">
      <div class="list-header">
        <div class="title">公益活动</div>
        <div class="dropdown">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
          </van-dropdown-menu>
        </div>
      </div>
      <activity-list />
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
      value1: 0,
      option1: [
        { text: '贵州师范大学', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    }
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
    color: #2d2d2d;
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
