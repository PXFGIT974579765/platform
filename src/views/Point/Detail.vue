<template>
  <div class="detail">
    <div class="good">
      <img-swipe />

      <div class="content">
        <div class="point">
          <div class="price">
            <div class="point-num">5000</div>
            积分
            <div class="tag">爆款推荐</div>
          </div>
          <div class="count">已兑 50 件</div>
        </div>

        <div class="name-share">
          <div class="name">机械手感键盘鼠标套装</div>
          <share-button />
        </div>

        <div class="other">该商品不支持退换货</div>
      </div>
    </div>

    <desc-comment :active="active" @onChange="onChange" />
  </div>
</template>

<script>
import ImgSwipe from '@/components/ImgSwipe'
import DescComment from '@/components/DescComment'
import ShareButton from '@/components/ShareButton'

export default {
  components: {
    DescComment,
    ImgSwipe,
    ShareButton,
  },

  data() {
    return {
      active: 'comment',
      complete: false,
    }
  },

  methods: {
    onChange(type) {
      this.active = type
    },
  },
}
</script>

<style lang="less" scoped>
.good {
  margin-bottom: 10px;
  padding-bottom: 15px;
  background: #fff;
}

.point {
  display: flex;
  align-items: center;
  margin: 13px 15px;
}

.price {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #646464;
}

.point-num {
  margin-right: 3px;
  color: #ff6c00;
}

.tag {
  width: 48px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  margin-left: 10px;
  background-color: #fff1df;
  border-radius: 9px;
  font-size: 10px;
  color: #ff6c00;
}

.name-share {
  display: flex;
  margin: 13px 15px;
}

.name {
  flex: 1;
  align-items: center;
  font-size: 18px;
  color: #222222;
}

.other {
  margin: 13px 15px 0;
  font-size: 13px;
  color: #a7a7a7;
}
</style>
