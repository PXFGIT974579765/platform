<template>
  <div class="comp-order-active-card" v-wechat-title="$route.meta.title">
    <div class="header flex" @click="routeDetail(active.orderId)">
      <span class="order-no">活动编号: {{ active.orderId }}</span>
      <span v-if="showOrderStatus" class="status">
        {{ orderStatusFilter(active.orderStatus, active.status) }}
      </span>
    </div>
    <div class="img" @click="routeDetail(active.orderId)">
      <img :src="active.goodsImg" />
      <span :class="['tag', active.orderMoney != 0 ? 'tag-race' : 'tag-pg']">
        {{ active.orderMoney != 0 ? '比赛' : '公益' }}
      </span>
    </div>

    <div class="title-area flex">
      <span class="title">{{ active.goodsName }}</span>
      <div v-if="showPrice" class="price">￥{{ active.orderMoney }}</div>
    </div>
    <div class="time-area">
      <span>日期</span>
      <span class="time">
        {{ convertDateTime(active.beginTime, active.endTime) }}
      </span>
    </div>
    <div class="address-area flex">
      <span>地址</span>
      <span class="address">{{ active.address }}</span>
    </div>
    <div class="scan-sign-area flex" v-if="active.isScanSign == 0">
      <span class="iconfont icon">&#xe746;</span>
      <span @click="qrCodeSign">现场扫码签到</span>
    </div>
    <div class="footer">
      <div class="btn-area flex">
        <span
          v-if="showOrderStatusBtn"
          :class="['btn', active.orderStatus === 2 ? 'btn-gray' : 'btn-yellow']"
          >{{ orderStatusFilter(active.orderStatus, active.status) }}</span
        >
        <span v-else></span>
        <div>
          <span class="btn">{{
            active.isScanSign === 0 ? '未签到' : '已签到'
          }}</span>
          <!-- 待付款对应的按钮 -->
          <router-link
            v-if="active.orderStatus == 0"
            :to="`/activity/order/${active.goodsId}?order=${active.orderId}`"
            class="btn"
            >付款</router-link
          >
          <span
            v-if="
              active.orderStatus == 0 ||
                (active.orderStatus == 1 && active.goodsStatus == 0)
            "
            class="btn"
            @click="cancelOrder(active.orderId)"
            >取消活动</span
          >

          <!-- 已结束对应的按钮 -->
          <!-- <span v-if="active.orderStatus == 2" class="btn" @click="onAppraise"
            >待评价</span
          > -->

          <!-- 待评价对应的按钮 -->
          <!-- <span v-if="active.orderStatus == 50" class="btn" @click="onAppraise"
            >待评价</span
          > -->
          <span v-if="active.commentStatus == 1" class="btn" @click="onAppraise"
            >待评价</span
          >
          <span v-if="active.commentStatus == 3" class="btn" @click="onAppraise"
            >重新评价</span
          >
          <!-- 已完成对应的按钮 -->
          <!-- <span
            v-if="active.orderStatus == 80"
            class="btn"
            @click="detailAppraise(active.orderId)"
            >查看评价</span
          > -->

          <span
            v-if="
              active.commentStatus == 3 ||
                active.commentStatus == 2 ||
                group.commentStatus == 4
            "
            class="btn"
            @click="detailAppraise(active.orderId)"
            >查看评价</span
          >
          <span
            v-if="active.orderStatus == 80"
            class="btn"
            @click="routeDetail(active.orderId)"
            >订单详情</span
          >
          <!-- 已取消对应的按钮 -->
          <span
            v-if="active.orderStatus == 90"
            class="btn"
            @click="routeDetail(active.orderId)"
            >订单详情</span
          >
        </div>
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
import AppraiseDialog from '@/components/AppraiseDialog'
import { convertDateTime } from '@/lib/format'

const ORDER_STATUS = {
  0: '待付款',
  1: '进行中',
  2: '已结束',
  50: '待评价',
  80: '已完成',
  90: '已取消',
}

const PAY_STATUS = {
  '-1': '支付失败',
  '-2': '订单超时',
  '-4': '异常关闭',
  '-5': '已退款',
}

export default {
  components: {
    AppraiseDialog,
  },
  props: {
    showOrderStatus: {
      type: Boolean,
      default: true,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    showOrderStatusBtn: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
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
    // 订单详情路由
    routeDetail(orderNo) {
      this.$router.push(`/order/active-detail/${orderNo}`)
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
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
    // 扫码签到
    qrCodeSign() {
      this.$emit('qrCodeSign', this.active)
    },
    // 日期转化
    convertDateTime(beginTime, endTime) {
      return convertDateTime(beginTime, endTime)
    },

    // 提交评价
    onSubmit(appraise) {
      this.$http
        .post('/api-wxmp/cxxz/comment/save', {
          ...appraise,
          orderNo: this.active.orderId,
          goodsId: this.active.goodsId,
          commentType: 2,
          // distributionId
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.showDialog = false
            this.active.commentStatus = 2
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },

    // 状态显示过滤
    orderStatusFilter: function(orderStatus, status) {
      let name = ''
      // 订单状态
      switch (orderStatus) {
        case 50:
          name = '已完成'
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
  },
}
</script>

<style lang="less" scoped>
.comp-order-active-card {
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

  .img {
    position: relative;
    margin-top: 13px;
    width: 100%;
    height: 150px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
    }

    .tag {
      position: absolute;
      top: 11px;
      left: 12px;
      width: 35px;
      height: 17px;
      line-height: 17px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
    }

    .tag-race {
      background-color: #16b459;
    }

    .tag-pg {
      background-color: #ff3434;
    }
  }

  .title-area {
    margin-top: 14px;
    justify-content: space-between;
    font-size: 13px;

    .title {
      font-size: 16px;
      color: #2d2d2d;
    }

    .price {
      font-size: 12px;
      color: #ff6c00;
    }
  }

  .time-area {
    margin-top: 24px;
    font-size: 13px;
    color: #878787;

    .time {
      margin-left: 13px;
      color: #2d2d2d;
    }
  }

  .address-area {
    margin-top: 15px;
    font-size: 13px;
    color: #878787;

    span:first-child {
      width: 30px;
    }

    .address {
      line-height: 16px;
      margin-left: 13px;
      color: #2d2d2d;
    }
  }

  .scan-sign-area {
    margin-top: 20px;
    height: 39px;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid#1b8cff;
    font-size: 14px;
    color: #1b8cff;

    span:last-child {
      margin-left: 10px;
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
      justify-content: space-between;

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

      .btn-yellow {
        margin-left: 0;
        color: #ff6c00;
        border: 1px solid #ff6c00;
      }

      .btn-gray {
        margin-left: 0;
        color: #ababab;
        border: 1px solid #ababab;
      }
    }
  }
}
</style>
