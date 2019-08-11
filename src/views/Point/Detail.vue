<template>
  <div class="detail">
    <div class="good">
      <img-swipe :images="[detail.picUrl]" />

      <div class="content">
        <div class="point">
          <div class="price">
            <div class="point-num">{{ detail.score }}</div>
            积分
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
        支付:
        <span>￥{{ detail.score }}积分</span>
      </div>
      <button @click="onClick">立即支付</button>
    </div>
  </div>
</template>

<script>
import ImgSwipe from '@/components/ImgSwipe'
import DescComment from '@/components/DescComment'
import ShareButton from '@/components/ShareButton'
// import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    DescComment,
    ImgSwipe,
    ShareButton,
    // OrderSubmit,
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
    padding: 21px 0;
    color: #565656;
    span {
      color: #06c0b5;
    }
  }

  button {
    padding: 21px 30px;
    color: #fff;
    background: #06c0b5;
  }
}
</style>
