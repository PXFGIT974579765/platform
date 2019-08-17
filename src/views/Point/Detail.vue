<template>
  <div class="detail">
    <div class="good">
      <img-swipe :images="[detail.picUrl]" />

      <div class="content">
        <div class="point">
          <div class="point-price">
            <div class="point-num">{{ detail.score }}</div>
            积分
            <div v-if="detail.price > 0" class="money">
              +￥{{ detail.price }}元
            </div>
            <div class="tag">爆款推荐</div>
          </div>
          <div class="count">已兑 {{ detail.sellVolume }} 件</div>
        </div>

        <div class="name-share">
          <div class="name">{{ detail.name }}</div>
          <share-button />
        </div>

        <div class="other">该商品不支持退换货</div>
      </div>
    </div>

    <desc-comment
      :active="active"
      :desc="detail.goodsDesc"
      @onChange="onChange"
    />

    <div class="submit">
      <div class="price">
        <div class="price-point">
          支付:
          <span>{{ detail.score }}积分</span>
        </div>
        <div v-if="detail.price > 0" class="money">+￥{{ detail.price }}元</div>
      </div>
      <button class="submit-btn" @click="onClick">立即支付</button>
    </div>
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
      active: 'desc',
      complete: false,
      detail: {},
    }
  },

  created() {
    this.fetchData()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      this.$http
        .get('/api-wxmp/cxxz/goods/score/findById', {
          params: { id: this.$route.params.id },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.detail = data.datas
          }
        })
    },

    onChange(type) {
      this.active = type
    },

    onClick() {
      this.$router.push(`/point/order/${this.$route.params.id}`)
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

.point-price {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #646464;
}

.money {
  height: 24px;
  line-height: 24px;
  margin-left: 6px;
  padding: 0 4px;
  border-radius: 3px;
  font-size: 14px;
  color: #fff;
  background: #ff4b4b;
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

.submit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  background: #ffffff;

  .price {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .price-point {
    height: 58px;
    line-height: 58px;
    color: #565656;
    span {
      color: #06c0b5;
    }
  }

  .submit-btn {
    padding: 0 30px;
    height: 58px;
    line-height: 58px;
    color: #fff;
    background: #06c0b5;
  }
}
</style>
