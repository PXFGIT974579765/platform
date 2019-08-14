<template>
  <div class="comp-order-goods-card" v-wechat-title="$route.meta.title">
    <div class="header flex" @click="routeDetail(group.orderId)">
      <span class="order-no">订单编号: {{ group.orderId }}</span>
      <span v-if="showOrderStatus" class="status">{{
        orderStatusFilter(group.orderStatus, group.status)
      }}</span>
    </div>
    <div class="content flex" @click="routeGoodsPage(group.goodsId)">
      <img :src="group.goodsImg" />
      <div class="content-right flex flex-1">
        <div class="detail flex-col">
          <span class="title">{{ group.goodsName }}</span>
          <span class="tag">{{ group.tagName }}: {{ group.tagDesc }}</span>
        </div>
        <div class="price">
          <div>￥{{ group.orderMoney }}</div>
          <div>X{{ group.goodsSize || 1 }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="total">
        共{{ group.goodsSize || 1 }}件商品 合计: ￥{{ group.money }}
      </div>
      <div class="btn-area">
        <!-- 待付款对应的按钮 -->
        <router-link
          v-if="group.orderStatus == 0"
          :to="`/group/order?order=${group.orderId}`"
          class="btn"
          >付款</router-link
        >
        <span
          v-if="group.orderStatus == 0"
          class="btn"
          @click="cancelOrder(group.orderId)"
          >取消订单</span
        >
        <!-- 拼团中对应的按钮 -->
        <span
          v-if="group.orderStatus == 91"
          class="btn"
          @click="routeDetail(group.orderId)"
          >订单详情</span
        >
        <!-- 待配送对应的按钮 -->
        <span
          v-if="group.orderStatus == 2"
          class="btn"
          @click="routeDetail(group.orderId)"
          >配货中</span
        >
        <!-- 待提货对应的按钮 -->
        <router-link
          v-if="group.orderStatus == 3"
          :to="`/errand/lobby?order=${group.orderId}`"
          class="btn"
          >找跑腿</router-link
        >
        <span
          v-if="group.orderStatus == 3"
          class="btn"
          @click="routeDetail(group.orderId)"
          >上门自提</span
        >
        <!-- 待评价对应的按钮 -->
        <span v-if="group.orderStatus == 50" class="btn" @click="onAppraise"
          >待评价</span
        >
        <span
          v-if="group.orderStatus == 50"
          class="btn"
          @click="routeDetail(group.orderId)"
          >订单详情</span
        >
        <!-- 已完成对应的按钮 -->
        <span
          v-if="group.orderStatus == 80"
          class="btn"
          @click="detailAppraise(group.orderId)"
          >查看评价</span
        >
        <span
          v-if="group.orderStatus == 80"
          class="btn"
          @click="routeDetail(group.orderId)"
          >订单详情</span
        >
        <!-- 已取消对应的按钮 -->
        <span
          v-if="group.orderStatus == 90"
          class="btn"
          @click="routeDetail(group.orderId)"
          >订单详情</span
        >
        <!-- 拼团失败对应的按钮 -->
        <span
          v-if="group.orderStatus == 91"
          class="btn"
          @click="routeDetail(group.orderId)"
          >订单详情</span
        >
      </div>
    </div>
    <!-- 评价弹框 -->
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
  1: '拼团中',
  2: '待配送',
  3: '待提货',
  50: '待评价',
  80: '已完成',
  90: '已取消',
  91: '拼团失败',
}

const PAY_STATUS = {
  '-1': '支付失败',
  '-2': '订单超时',
  '-4': '异常关闭',
  '-5': '已退款',
}

import AppraiseDialog from '@/components/AppraiseDialog'

export default {
  components: {
    AppraiseDialog,
  },
  props: {
    showOrderStatus: {
      type: Boolean,
      default: true,
    },
    group: {
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
    // 状态显示过滤
    orderStatusFilter: function(orderStatus, status) {
      let name = ''
      // 订单状态
      switch (orderStatus) {
        case 50:
          name = '已完成'
          break
        case 2:
          name = '拼团成功'
          break
        default:
          name = ORDER_STATUS[orderStatus]
      }
      // 支付状态
      if (parseInt(status) < 0) {
        const payStatus = PAY_STATUS[status]
        if (payStatus) {
          name = payStatus
        }
      }
      return name
    },
    // 订单详情路由
    routeDetail(orderNo) {
      this.$router.push(`/order/group-detail/${orderNo}`)
    },

    // 商品路由
    routeGoodsPage(goodsId) {
      this.$router.push(`/group/detail/${goodsId}`)
    },

    // 取消订单
    cancelOrder(orderId) {
      this.$emit('cancelOrder', orderId)
    },

    // 弹出评价窗口
    onAppraise() {
      this.showDialog = true
    },

    // 关掉评价弹窗
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
          orderNo: this.group.orderId,
          commentType: 3, // commentType 0 跑腿 1 积分 活动2 拼团 3
          // distributionId
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.showDialog = false
            this.group.orderStatus = 80
          } else {
            alert(data.resp_msg)
          }
        })
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
