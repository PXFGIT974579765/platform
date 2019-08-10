<template>
  <div class="page-order-active-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="goods-item">
        <Card
          :active="active"
          :showStatus="false"
          :showPrice="false"
          :showStatusBtn="true"
        />
      </div>
      <div class="price-group">
        <div class="price-item flex">
          <span>活动收费</span>
          <span>￥{{ active.price }}</span>
        </div>
        <div class="price-item flex">
          <span>优惠</span>
          <span>-{{ active.couponMoney }}</span>
        </div>
        <div class="price-item flex total">
          <span>订单总价</span>
          <span>￥{{ active.orderMoney }}</span>
        </div>
        <div class="price-item flex actual">
          <span>实付款</span>
          <span style="color: #ff6c00">￥{{ active.money }}</span>
        </div>
      </div>

      <div class="order-info">
        <div class="title">
          {{ active.refundStatus === 0 ? '订单信息' : '退款信息' }}
        </div>
        <div class="order-item">
          <span>订单状态 :</span>
          <span>{{ active.status | statusFilter }}</span>
        </div>
        <div class="order-item">
          <span>个人积分 :</span>
          <span>获得{{ active.userGetScore }}点积分</span>
        </div>
        <div class="order-item">
          <span>订单编号 :</span>
          <span>{{ active.orderId }}</span>
        </div>
        <div class="order-item">
          <span>创建时间 :</span>
          <span>{{ active.createTime | dateFormat }}</span>
        </div>
        <div class="order-item">
          <span>付款时间 :</span>
          <span>{{ active.payTime | dateFormat }}</span>
        </div>
      </div>

      <div class="contact flex">
        <span class="iconfont icon">&#xe745;</span>
        <span>联系客服</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'
import Card from './ActiveOrderCard'

const ORDER_STATUS = {
  0: '待付款',
  1: '待配送',
  2: '待提货',
  3: '待评价',
}
export default {
  components: {
    Card,
  },
  data() {
    return {
      active: {
        activeNo: '557879582',
        imgUrl: require('../images/active1.jpg'),
        title: '刀剑2贵州赛区英雄争霸赛',
        tag: 'race',
        price: 20,
        score: 20,
        couponAmount: 0,
        createTime: 1500000000,
        payTime: 1500000000,
        time: 1500000000,
        address: '贵州大学城师范学院 同心路15号 （创星校园实训中心）',
        signStatus: 0, // 签到状态  0 未签到 1 已签到
        status: 0,
        refundStatus: 0, // 0 没有退款  1 退款中  2 已退款
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchOrderDetail(id)
  },
  methods: {
    // 拉去详情信息
    fetchOrderDetail(orderId) {
      this.$http
        .post('/api-wxmp/cxxz/order/getHD', {
          orderId,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.active = data.datas
          }
        })
    },
  },
  filters: {
    statusFilter: function(status) {
      return ORDER_STATUS[status]
    },
    dateFormat: function(value) {
      return dateTime(value, 'YYYY-MM-DD hh:mm:ss')
    },
  },
}
</script>

<style lang="less" scoped>
.page-order-active-detail {
  .container {
    padding-bottom: 10px;

    .goods-item {
      margin: 10px 0 0;
      width: 100%;
      padding: 21px 15px 9px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }

    .price-group {
      padding: 16px 15px;
      background-color: #fff;

      .price-item {
        margin-top: 10px;
        justify-content: space-between;
        font-size: 12px;
        color: #8d8d8d;

        &:first-child {
          margin-top: 0;
        }
      }

      .total {
        padding-bottom: 16px;
        font-size: 13px;
        color: #2d2d2d;
        border-bottom: 1px solid #eee;
      }

      .actual {
        font-size: 13px;
        color: #2d2d2d;
      }
    }

    .order-info {
      margin: 10px 0 0;
      padding: 21px 13px 25px;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      .title {
        font-size: 14px;
        color: #2d2d2d;
      }

      .order-item {
        margin-top: 10px;
        font-size: 12px;
        color: #8d8d8d;

        span:last-child {
          margin-left: 10px;
        }
      }
    }

    .contact {
      justify-content: center;
      align-items: center;
      height: 45px;
      background-color: #fff;

      .icon {
        margin-right: 11px;
        color: #00a2ff;
      }
    }
  }
}
</style>
