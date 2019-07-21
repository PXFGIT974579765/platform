<template>
  <van-swipe @change="onChange">
    <van-swipe-item>
      <img src="~@/assets/images/group_good.png" alt />
    </van-swipe-item>
    <van-swipe-item>
      <img src="~@/assets/images/group_good.png" alt />
    </van-swipe-item>
    <van-swipe-item>
      <img src="~@/assets/images/group_good.png" alt />
    </van-swipe-item>
    <van-swipe-item>
      <img src="~@/assets/images/group_good.png" alt />
    </van-swipe-item>

    <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
  </van-swipe>
</template>

<script>
export default {
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

<style>
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
