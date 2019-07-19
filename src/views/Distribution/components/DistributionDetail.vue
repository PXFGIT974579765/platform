<template>
  <div class="page-my-distribution-detail" v-wechat-title="$route.meta.title">
    <div class="time area flex">
      <div>
        <div>{{ info.startTime | timeFormat }}</div>
        <span>开始时间</span>
      </div>
      <div class="date">{{ info.startTime | dateFormat }}</div>
      <div>
        <div>{{ info.status === 0 ? '--:--' : timeFormat(info.endTime) }}</div>
        <span>结束时间</span>
      </div>
    </div>
    <div class="goods area">
      <div class="title">跑腿商品</div>
      <div class="goods-item flex">
        <img :src="info.imgUrl" alt />
        <div class="goods-right flex-col">
          <span class="title">{{ info.title }}</span>
          <span class="tag">{{ info.tagName }}: {{ info.tagDesc }}</span>
        </div>
      </div>
      <div class="getNo">取单码 {{ info.getNo }}</div>
    </div>
    <div class="detail area">
      <div class="title">跑腿编号：{{ info.errandNo }}</div>
      <div class="address-price flex">
        <div class="address-area">
          <div class="from">
            <span class="icon get">取</span>
            <span class="address">{{ info.fromAddress }}</span>
          </div>
          <div class="to">
            <span class="icon send">送</span>
            <span class="address">{{ info.toAddress }}</span>
          </div>
        </div>
        <div class="price-area">
          <span class="price">{{ info.errandPrice }}</span>
          <span>元</span>
        </div>
      </div>
      <div class="person-info flex">
        <div class="info-area">
          <div class="to-name">
            <span class="name">收货人</span>
            <span class="value">{{ info.toName }}</span>
          </div>
          <div class="phone">
            <span class="name">电 话</span>
            <span class="value">{{ info.toPhone }}</span>
          </div>
        </div>
        <span class="iconfont">&#xe745;</span>
      </div>
      <div class="remark-info">
        <span>备注</span>
        <span class="remark">{{ info.remark }}</span>
      </div>
    </div>

    <div class="footer">
      <div v-if="info.status === 1" class="btn-finished">已完成配送</div>
      <div v-else class="flex">
        <input
          class="flex-2"
          v-model="curSendNo"
          type="text"
          placeholder="请输入收货码"
        />
        <div :class="['btn-will', 'flex-1', curSendNo === '' && 'btn-disable']">
          完成派送
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

export default {
  data() {
    return {
      curSendNo: '', // 收货码
      info: {
        startTime: 1500000000,
        endTime: 1500000000,
        status: 0, // 0 正在派送   1 已完成派送
        imgUrl: require('../images/goods.png'),
        title: '华为路由器无线全千兆端口家用WIFI穿墙王大功率户型',
        tagName: '标准套餐',
        tagDesc: '白色-定制版',
        errandNo: '1504955',
        getNo: '201906199527',
        errandPrice: 6,
        fromAddress: '科技园实训中心',
        toAddress: '图书馆6号楼704',
        toName: '张小先',
        toPhone: 199893848484,
        remark: '跑腿小哥哥快点送哦',
      },
    }
  },
  methods: {
    onLoad() {},
    timeFormat: function(value) {
      return dateTime(value, 'hh:mm')
    },
  },
  filters: {
    dateFormat: function(value) {
      return dateTime(value, 'YYYY-MM-DD')
    },
    timeFormat: function(value) {
      return dateTime(value, 'hh:mm')
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-distribution-detail {
  padding: 5px 15px;
  display: flow-root;

  .area {
    margin-top: 9px;
    padding: 13px 13px 25px;
    border-radius: 4px;
    background-color: #fff;
  }

  .title {
    font-size: 14px;
    color: #585858;
  }

  .time {
    padding: 20px 25px;
    justify-content: space-between;
    align-items: center;
    font-size: 21px;
    font-weight: bold;
    color: #2d2d2d;

    span {
      margin-top: 15px;
      font-weight: 500;
      font-size: 14px;
      color: #787878;
    }

    .date {
      font-weight: 500;
      font-size: 14px;
      color: #a4a4a4;
    }
  }

  .goods {
    padding: 18px 17px 0;

    .goods-item {
      margin-top: 20px;
      padding-bottom: 21px;
      border-bottom: 1px dashed #a0a0a0;

      img {
        width: 70px;
        height: 70px;
      }

      .goods-right {
        margin-left: 14px;

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
    }

    .getNo {
      height: 55px;
      line-height: 55px;
      text-align: center;
      font-size: 23px;
      color: #0294fe;
    }
  }

  .detail {
    padding: 18px 17px 20px;

    .address-price {
      margin-top: 14px;
      padding: 20px 6px;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #a0a0a0;
      border-bottom: 1px dashed #a0a0a0;

      .address-area {
        .icon {
          margin-right: 9px;
          padding: 3px 5px;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border-radius: 50%;
          text-align: center;
          color: #fff;
        }

        .get {
          background-color: #0294fe;
        }
        .send {
          background-color: #f34b01;
        }

        .address {
          font-size: 14px;
          color: #555555;
        }

        .to {
          margin-top: 15px;
        }
      }

      .price-area {
        .price {
          margin-right: 5px;
          font-size: 28px;
          color: #ff7e00;
        }
      }
    }

    .person-info {
      padding: 20px 6px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px dashed #a0a0a0;

      .info-area {
        .name {
          margin-right: 19px;
          width: 45px;
          display: inline-block;
          font-size: 14px;
          color: #8d8d8d;
        }

        .value {
          font-size: 14px;
          color: #555555;
        }

        .phone {
          margin-top: 15px;
        }
      }

      .iconfont {
        font-size: 30px;
        color: #029eff;
      }
    }

    .remark-info {
      margin-top: 18px;
      padding: 0 6px;
      font-size: 14px;
      color: #8d8d8d;

      .remark {
        margin-left: 19px;
        color: #555555;
      }
    }
  }

  .footer {
    margin-top: 16px;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    margin-bottom: 50px;

    .btn-finished {
      border-radius: 4px;
      text-align: center;
      color: #fff;
      background-color: #07c2af;
    }

    .btn-will {
      margin-left: 9px;
      text-align: center;
      background-color: #07c2af;
      color: #fff;
    }

    .btn-disable {
      opacity: 0.3;
    }

    input {
      border: 0;
      text-align: center;
    }
  }
}
</style>
