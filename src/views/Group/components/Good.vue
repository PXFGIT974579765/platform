<template>
  <div class="good">
    <img-swipe :images="(good.picUrl || '').split('@')" />

    <div class="good-info">
      <div class="good-price">
        ￥
        <span>{{ good.price }}</span>
      </div>
      <div class="good-type">
        {{ good.limitMinSize }}-{{ good.limitMaxSize }}人团
      </div>
      <div class="good-count">已拼{{ good.sellVolume }}件</div>
    </div>
    <div class="good-name">{{ good.name }}</div>
    <div class="good-verdor">厂商：贵州省莫白传媒科技有限公司</div>
  </div>
</template>

<script>
import ImgSwipe from '@/components/ImgSwipe'

export default {
  components: {
    ImgSwipe,
  },

  props: {
    good: {
      type: Object,
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
