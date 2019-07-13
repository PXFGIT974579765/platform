<template>
  <div class="good">
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

    <div class="good-info">
      <div class="good-price">
        ￥
        <span>235</span>.00
      </div>
      <div class="good-type">5-10人团</div>
      <div class="good-count">已拼50件</div>
    </div>
    <div class="good-name">新款时尚简约休闲小西服阔腿短裤韩国两件</div>
    <div class="good-verdor">厂商：贵州省莫白传媒科技有限公司</div>
  </div>
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

<style lang="less" scoped>
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

.good {
  margin-bottom: 8px;
}

.good-info {
  display: flex;
  align-items: center;
  padding: 15px 15px 0;
  background: #fff;
}

.good-price {
  margin-right: 15px;
  font-size: 15px;
  color: #ff2d2d;
  span {
    font-size: 24px;
  }
}

.good-count {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: #a4a4a4;
}

.good-type {
  width: 62px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 2px;
  font-size: 13px;
  color: #fff;
  background-image: linear-gradient(#f94141, #f94141),
    linear-gradient(#ff4444, #ff4444);
}

.good-name {
  margin-bottom: 1px;
  padding: 15px 15px 18px;
  font-size: 18px;
  color: #222222;
  background: #fff;
}

.good-verdor {
  padding: 10px 15px;
  font-size: 11px;
  color: #888888;
  background: #fff;
}
</style>
