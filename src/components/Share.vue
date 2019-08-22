<template>
  <div class="shares clearfix">
    <!-- <div class="share">
      <div class="icon">
        <span class="iconfont" style="color: #6cc630">&#xe765;</span>
      </div>
      <div class="name">微信好友</div>
    </div>
    <div class="share">
      <div class="icon">
        <span class="iconfont" style="color: #3fc264">&#xe75c;</span>
      </div>
      <div class="name">微信朋友圈</div>
    </div>
    <div class="share">
      <div class="icon">
        <span class="iconfont" style="color: #43acee">&#xe75b;</span>
      </div>
      <div class="name">QQ好友</div>
    </div>
    <div class="share">
      <div class="icon">
        <span class="iconfont" style="color: #faba35">&#xe75a;</span>
      </div>
      <div class="name">QQ空间</div>
    </div>-->
    <div class="share clipboard" :data-clipboard-text="url" @click="onCopyUrl">
      <div class="icon">
        <span class="iconfont" style="color: #8e9aaa">&#xe72f;</span>
      </div>
      <div class="name">复制网址</div>
    </div>
    <!-- <div class="share">
      <div class="icon">
        <span class="iconfont" style="color: #8e9aaa">&#xe730;</span>
      </div>
      <div class="name">二维码</div>
    </div>-->
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  data() {
    return {
      url: '',
    }
  },

  mounted() {
    this.url = window.location.origin + this.$route.fullPath
    this.clipboard = new ClipboardJS('.clipboard')
  },

  beforeDestroy() {
    this.clipboard.destroy()
  },

  methods: {
    onCopyUrl() {
      this.$toast('复制成功')
    },
  },
}
</script>

<style lang="less" scoped>
.shares {
  padding: 25px 25px 0;
}

.share {
  float: left;
  width: 25%;
  text-align: center;
  margin-bottom: 25px;
}

.icon {
  margin-bottom: 6px;
}

.iconfont {
  font-size: 34px;
}
</style>
