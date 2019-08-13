<template>
  <div class="comp-order-goods-card" v-wechat-title="$route.meta.title">
    <div class="header flex" @click="routeDetail(goods.orderId)">
      <span class="order-no">订单编号: {{ goods.orderId }}</span>
      <span v-if="showStatus" class="status">{{
        goods.status | statusFilter
      }}</span>
    </div>
    <div class="content flex" @click="routeGoodsPage(goods.goodsId)">
      <img :src="goods.goodsImg" />
      <div class="content-right flex flex-1">
        <div class="detail flex-col">
          <span class="title">{{ goods.goodsName }}</span>
        </div>
        <div class="price">
          <div>￥{{ goods.orderMoney }}</div>
          <div>X{{ goods.goodsSize || 1 }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="total">
        共{{ goods.goodsSize || 1 }}件商品 合计: ￥{{ goods.money }}
      </div>
      <div class="btn-area">
        <!-- 待付款对应的按钮 -->
        <router-link
          v-if="goods.status == 0"
          :to="`/point/order?order=${goods.orderId}`"
          class="btn"
          >付款</router-link
        >
        <span
          v-if="goods.status == 0"
          class="btn"
          @click="cancelOrder(goods.orderId)"
          >取消订单</span
        >
        <!-- 待配送对应的按钮 -->
        <span
          v-if="goods.status == 1"
          class="btn"
          @click="routeDetail(goods.orderId)"
          >配货中</span
        >
        <!-- 待提货对应的按钮 -->
        <router-link
          v-if="goods.status == 2"
          :to="`/errand/lobby?order=${goods.orderId}`"
          class="btn"
          >找跑腿</router-link
        >
        <span
          v-if="goods.status == 2"
          class="btn"
          @click="routeDetail(goods.orderId)"
          >上门自提</span
        >
        <!-- 待评价对应的按钮 -->
        <span v-if="goods.status == 50" class="btn" @click="onAppraise"
          >待评价</span
        >
        <span
          v-if="goods.status == 50"
          class="btn"
          @click="routeDetail(goods.orderId)"
          >订单详情</span
        >
        <!-- 已完成对应的按钮 -->
        <span
          v-if="goods.status == 80"
          class="btn"
          @click="detailAppraise(goods.orderId)"
          >查看评价</span
        >
        <span
          v-if="goods.status == 80"
          class="btn"
          @click="routeDetail(goods.orderId)"
          >订单详情</span
        >
        <!-- 已取消对应的按钮 -->
        <span
          v-if="goods.status == 90"
          class="btn"
          @click="routeDetail(goods.orderId)"
          >订单详情</span
        >
      </div>
    </div>

    <AppraiseDialog
      :showDialog="showDialog"
      @onSubmit="onSubmit"
      @cancel="onCancel"
      :info="appraise"
    />
  </div>
</template>

<script>
const ORDER_STATUS = {
  0: '待付款',
  1: '待配送',
  2: '待提货',
  50: '待评价',
  80: '已完成',
  90: '已取消',
}

import AppraiseDialog from '@/components/AppraiseDialog'

export default {
  components: {
    AppraiseDialog,
  },
  props: {
    showStatus: {
      type: Boolean,
      default: true,
    },
    goods: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
      keyword: '',
      showDialog: false,
      appraise: {
        createTime: '',
        commContent: '',
        rates: 0,
        status: -1,
      }, // 评价对象
    }
  },
  methods: {
    // 商品路由
    routeGoodsPage(goodsId) {
      this.$router.push(`/point/detail/${goodsId}`)
    },
    // 订单详情路由
    routeDetail(orderNo) {
      this.$router.push(`/order/goods-detail/${orderNo}`)
    },
    // 取消订单
    cancelOrder(orderId) {
      this.$emit('cancelOrder', orderId)
    },
    // 弹出评价窗口
    onAppraise() {
      this.showDialog = true
    },

    onCancel() {
      this.showDialog = false
    },
    // 查看评价
    detailAppraise(orderId) {
      this.$http
        .get('/api-wxmp/cxxz/comment/findComment', {
          params: {
            orderId,
          },
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.appraise = data.datas
            this.appraise.status = 80
            this.showDialog = true
          } else {
            alert(data.resp_msg)
          }
        })
    },

    // 提交评价
    onSubmit(appraise) {
      this.$http
        .post('/api-wxmp/cxxz/comment/save', {
          ...appraise,
          orderNo: this.goods.orderId,
          commentType: 1,
          // distributionId
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.showDialog = false
            this.goods.status = 80
          } else {
            alert(data.resp_msg)
          }
        })
    },
  },
  filters: {
    statusFilter: function(status) {
      let name = ''
      switch (status) {
        case 3:
          name = '已完成'
          break
        case 1:
          name = '配货中'
          break
        default:
          name = ORDER_STATUS[status]
      }
      return name
    },
  },
}
</script>

<style lang="less" scoped>
.comp-order-goods-card {
  .header {
    justify-content: space-between;
    font-size: 13px;

    .order-no {
      color: #585858;
    }

    .status {
      color: #ff6c00;
    }
  }

  .content {
    margin-top: 18px;

    img {
      width: 85px;
      height: 85px;
    }

    .content-right {
      margin-left: 11px;
      justify-content: space-between;

      .detail {
        margin-right: 15px;

        .title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 20px;
          font-size: 13px;
          color: #2d2d2d;
        }

        .tag {
          margin-top: 13px;
          font-size: 12px;
          color: #c0c0c0;
        }
      }

      .price {
        text-align: right;
        font-size: 13px;
        color: #2d2d2d;

        div:last-child {
          margin-top: 14px;
          color: #2d2d2d;
        }
      }
    }
  }

  .footer {
    margin-top: 18px;
    text-align: right;

    .total {
      font-size: 13px;
      color: #2d2d2d;
    }

    .btn-area {
      margin-top: 21px;

      .btn {
        display: inline-block;
        margin-left: 12px;
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        text-align: center;
        color: #06bcbf;
        border: 1px solid #06bcbf;
      }
    }
  }
}
</style>
