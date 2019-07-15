<template>
  <div class="comp-order-active-card" v-wechat-title="$route.meta.title">
    <router-link :to="'/order/active-detail/' + active.activeNo">
      <div class="header flex">
        <span class="order-no">活动编号: {{ active.activeNo }}</span>
        <span v-if="showStatus" class="status">{{
          active.status | statusFilter
        }}</span>
      </div>
      <div class="img">
        <img :src="active.imgUrl" />
        <span :class="['tag', active.tag === 'race' ? 'tag-race' : 'tag-pg']">{{
          active.tag === 'race' ? '比赛' : '公益'
        }}</span>
      </div>

      <div class="title-area flex">
        <span class="title">{{ active.title }}</span>
        <div v-if="showPrice" class="price">￥{{ active.price }}</div>
      </div>
      <div class="time-area">
        <span>日期</span>
        <span class="time">{{ active.time | dateFormat }}</span>
      </div>
      <div class="address-area flex">
        <span>地址</span>
        <span class="address">{{ active.address }}</span>
      </div>
      <div class="scan-sign-area flex" v-show="active.signStatus === 0">
        <span class="iconfont icon">&#xe746;</span>
        <span>现场扫码签到</span>
      </div>
    </router-link>
    <div class="footer">
      <div class="btn-area flex">
        <span
          v-if="showStatusBtn"
          :class="['btn', active.status === 2 ? 'btn-gray' : 'btn-yellow']"
          >取消活动</span
        >
        <span v-else></span>
        <div>
          <span class="btn">
            {{ active.signStatus === 0 ? '未签到' : '已签到' }}
          </span>
          <span class="btn" @touchstart="onShowDialog">未评价</span>
        </div>
      </div>
    </div>
    <AppraiseDialog :showDialog="showDialog" @cancel="onCancel" />
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'
import AppraiseDialog from '@/components/AppraiseDialog'

const ORDER_STATUS = {
  0: '进行中',
  1: '已结束',
  2: '已取消',
  3: '待评价',
}

export default {
  components: {
    AppraiseDialog,
  },
  props: {
    showStatus: {
      type: Boolean,
      default: true,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    showStatusBtn: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Object,
      default: function() {
        return {
          activeNo: '557879582',
          imgUrl: require('../images/active1.jpg'),
          title: '刀剑2贵州赛区英雄争霸赛',
          tag: 'race',
          price: 20,
          time: 1500000000,
          address: '贵州大学城师范学院 同心路15号 （创星校园实训中心）',
          signStatus: 0, // 签到状态  0 未签到 1 已签到
          status: 0,
        }
      },
    },
  },
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
    onLoad() {},
    onShowDialog() {
      this.showDialog = true
    },
    onCancel() {
      this.showDialog = false
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
