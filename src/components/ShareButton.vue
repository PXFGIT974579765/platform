<template>
  <div>
    <div class="share-button" @click="onShowShare">
      <span class="iconfont">&#xe748;</span>
      <span>分享</span>
    </div>

    <van-popup
      v-model="shareShow"
      position="bottom"
      :style="{ maxHeight: '75%' }"
    >
      <share />
    </van-popup>
  </div>
</template>

<script>
import Share from '@/components/Share'

export default {
  components: {
    Share,
  },

  data() {
    return {
      shareShow: false,
    }
  },

  methods: {
    onShowShare() {
      this.shareShow = true
    },
  },
}
</script>

<style lang="less" scoped>
.share-button {
  height: 20px;
  line-height: 20px;
  padding: 0 7px;
  border-radius: 10px;
  font-size: 12px;
  background-color: #efefef;
}

.iconfont {
  margin-right: 3px;
  font-size: 12px;
  color: #06bcbf;
}
</style>
