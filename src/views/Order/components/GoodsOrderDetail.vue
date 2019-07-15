<template>
  <div class="page-order-goods-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <GoodsOrderStatusCard :status="goods.status" />
      <AddressCard :contact="goods.contact" />
      <div class="goods-item">
        <Card :goods="goods" :showStatus="false" />
      </div>
      <div class="price-group">
        <div class="price-item flex">
          <span>商品总价</span>
          <span>￥{{ goods.amount }}</span>
        </div>
        <div class="price-item flex">
          <span>运费(快递)</span>
          <span>{{ goods.amount }}</span>
        </div>
        <div class="price-item flex">
          <span>优惠</span>
          <span>-{{ goods.couponAmount }}</span>
        </div>
        <div class="price-item flex total">
          <span>订单总价</span>
          <span>￥{{ goods.amount - goods.couponAmount }}</span>
        </div>
        <div class="price-item flex actual">
          <span>实付款</span>
          <span style="color: #ff6c00"
            >￥{{ goods.amount - goods.couponAmount }}</span
          >
        </div>
      </div>

      <div class="order-info">
        <div class="title">订单信息</div>
        <div class="order-item">
          <span>订单状态 :</span>
          <span>{{ goods.status | statusFilter }}</span>
        </div>
        <div class="order-item">
          <span>个人积分 :</span>
          <span>获得{{ goods.score }}点积分</span>
        </div>
        <div class="order-item">
          <span>订单编号 :</span>
          <span>{{ goods.orderNo }}</span>
        </div>
        <div class="order-item">
          <span>创建时间 :</span>
          <span>{{ goods.creatTime | dateFormat }}</span>
        </div>
        <div class="order-item">
          <span>付款时间 :</span>
          <span>{{ goods.payTime | dateFormat }}</span>
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
import GoodsOrderStatusCard from './GoodsOrderStatusCard'
import AddressCard from './AddressCard'
import Card from './GoodsOrderCard'

const ORDER_STATUS = {
  0: '待付款',
  1: '待配送',
  2: '待提货',
  3: '待评价',
}
export default {
  components: {
    GoodsOrderStatusCard,
    Card,
    AddressCard,
  },
  data() {
    return {
      active: '0',
      keyword: '',
      goods: {
        orderNo: '557879582',
        imgUrl: require('../images/good.png'),
        title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
        tagName: '标准套餐',
        tagDesc: '白色-定制版',
        num: 1, // 数量
        price: 189, // 单价
        couponAmount: 11, // 优惠金额
        amount: 189, // 总金额 = 单价*数量
        status: 0,
        score: 200,
        creatTime: 1500000000,
        payTime: 1500000000,
        contact: {
          name: '刘国贵',
          phone: '19985501144',
          address: '贵州省贵阳市花溪区大学城贵州师范大学B1男生素质302寝室',
        },
      },
    }
  },
  methods: {
    onLoad() {},
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
.page-order-goods-detail {
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
