<template>
  <van-swipe @change="onChange">
    <van-swipe-item v-for="url in images" :key="url">
      <img :src="url" alt />
    </van-swipe-item>

    <div class="custom-indicator" slot="indicator">
      {{ current + 1 }}/{{ images.length }}
    </div>
  </van-swipe>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
    },
  },

  data() {
    return {
      current: 0,
    }
  },

  methods: {
    onChange(index) {
      this.current = index
    },
  },
}
</script>

<style lang="less" scoped>
img {
  display: block;
  margin: auto;
}

.custom-indicator {
  position: absolute;
  right: 16px;
  bottom: 11px;
  width: 40px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 9px;
  color: #fff;
  background-color: rgba(49, 49, 49, 0.71);
}
</style>
