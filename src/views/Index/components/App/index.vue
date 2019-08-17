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
            <div class="app-name">共享打印</div>
            <div class="app-desc">一键发送 送货上门</div>
            <button v-if="editable" class="editing" @click="onRemove(app.id)">
              <span class="iconfont">&#xe72b;</span>
            </button>
          </a>
        </div>
      </div>
    </div>

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
            <button v-if="editable" class="editing" @click="onAdd(app.id)">
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
        }
      })
    },

    fetchAllApps() {
      this.$http.get('/api-wxmp/cxxz/app/findAppList').then(({ data }) => {
        if (data.resp_code === 0) {
          this.allApps = data.datas
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
          isSub,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.fetchMyApps()
            return
          }
          Toast.fail('系统繁忙')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.app {
  padding-top: 12px;
  background-color: #fff;
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
  margin-top: 35px;
  .block-content {
    overflow: hidden;
  }
  .app-item-wrap {
    width: 33.333333%;
    float: left;
    margin-bottom: 14px;
    &:nth-child(3n + 1) {
      padding-right: 7px;
    }
    &:nth-child(3n + 2) {
      padding: 0 7px;
    }
    &:nth-child(3n + 3) {
      padding-left: 7px;
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
