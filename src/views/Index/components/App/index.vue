<template>
  <div class="app">
    <search light />

    <div class="block apps apps-my">
      <div class="block-header">
        <div class="block-title">我的应用</div>
        <div class="block-header-link" @click="toggleEdit">管理应用</div>
      </div>

      <div class="block-content">
        <div v-for="app in myApps" :key="app.id" class="app-item-wrap">
          <a
            class="app-item"
            :href="app.appUrl"
            :style="{ 'background-image': `url(${app.appImg})` }"
          >
            <div class="app-name">{{ app.appName }}</div>
            <div class="app-desc">{{ app.appDescribe }}</div>
            <button
              v-if="editable"
              class="editing"
              @click.stop.prevent="onRemove(app.setId)"
            >
              <span class="iconfont">&#xe72b;</span>
            </button>
          </a>
        </div>
      </div>
    </div>

    <div class="sep" />

    <div class="block apps apps-all">
      <div class="block-header">
        <div class="block-title">全部应用</div>
      </div>

      <div class="block-content">
        <div v-for="app in allApps" :key="app.id" class="app-item-wrap">
          <a
            class="app-item"
            :href="app.appUrl"
            :style="{ 'background-image': `url(${app.appImg})` }"
          >
            <div class="app-name">{{ app.appName }}</div>
            <div class="app-desc">{{ app.appDescribe }}</div>
            <button
              v-if="editable"
              class="editing"
              @click.stop.prevent="onAdd(app.id)"
            >
              <span class="iconfont">&#xe72a;</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Search from '@/components/Search'

export default {
  components: {
    Search,
  },

  data() {
    return {
      editable: false,
      myApps: [],
      allApps: [],
    }
  },

  created() {
    this.fetchMyApps()
    this.fetchAllApps()
  },

  methods: {
    fetchMyApps() {
      this.$http.get('/api-wxmp/cxxz/app/myAppList').then(({ data }) => {
        if (data.resp_code === 0) {
          this.myApps = data.datas
        } else if (data.resp_msg) {
          this.$toast.fail(data.resp_msg)
        } else {
          this.$toast.fail('系统繁忙')
        }
      })
    },

    fetchAllApps() {
      this.$http.get('/api-wxmp/cxxz/app/findAppList').then(({ data }) => {
        if (data.resp_code === 0) {
          this.allApps = data.datas
        } else if (data.resp_msg) {
          this.$toast.fail(data.resp_msg)
        } else {
          this.$toast.fail('系统繁忙')
        }
      })
    },

    toggleEdit() {
      this.editable = !this.editable
    },

    onAdd(setId) {
      this.post(setId, 1)
    },

    onRemove(setId) {
      this.post(setId, 0)
    },

    post(setId, isSub) {
      return this.$http
        .post('/api-wxmp/cxxz/app/subOrUnSubscribeApp', {
          setId,
          isSub, // 0 取消 1 订阅
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            Toast.success('操作成功')
            this.fetchMyApps()
            return
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.app {
  min-height: 100vh;
  padding-top: 12px;
  background-color: #fff;
}

.sep {
  height: 10px;
  background: #f4f4f4;
}

.search {
  margin: 0 20px;
}

.block {
  padding: 0 15px;
}

.block-header {
  display: flex;
  margin-bottom: 15px;
}

.block-title {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
}

.block-header-link {
  color: #a4a4a3;
}

.apps {
  margin-top: 25px;

  .block-content {
    margin-right: -15px;
    overflow: hidden;
  }

  .app-item-wrap {
    width: 33.333333%;
    float: left;
    margin-bottom: 14px;
    &:nth-child(3n + 1) {
      padding-right: 15px;
    }
    &:nth-child(3n + 2) {
      padding-right: 15px;
    }
    &:nth-child(3n + 3) {
      padding-right: 15px;
    }
  }

  .app-item {
    display: block;
    position: relative;
    height: 34vw;
    padding: 15px;
    border-radius: 4px;
    background-size: 100% 100%;
  }
}

.editing {
  top: 0;
  right: 0;
  position: absolute;
}

.apps-my {
  .iconfont {
    color: #ff2f2f;
  }
}

.apps-all {
  .iconfont {
    color: #2297ff;
  }
}

.app-name {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 700;
  color: #2d2d2d;
}

.app-desc {
  line-height: 1.5;
  font-size: 12px;
  color: #767676;
}
</style>
