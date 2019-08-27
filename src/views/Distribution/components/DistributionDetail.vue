<template>
  <div class="page-my-distribution-detail" v-wechat-title="$route.meta.title">
    <div class="time area flex">
      <div>
        <div>{{ info.startTime.slice(10, 16) }}</div>
        <span>开始时间</span>
      </div>
      <div class="date">{{ info.startTime.slice(0, 10) }}</div>
      <div>
        <div>
          {{ info.endTime === null ? '--:--' : info.endTime.slice(10, 16) }}
        </div>
        <span>结束时间</span>
      </div>
    </div>
    <div class="goods area">
      <div class="title">跑腿商品</div>
      <div class="goods-item flex">
        <img :src="info.goodsImg" alt />
        <div class="goods-right flex-col">
          <span class="title">{{ info.goodsName }}</span>
          <!-- <span class="tag">{{ info.tagName }}: {{ info.tagDesc }}</span> -->
        </div>
      </div>
      <div class="getNo">取单码 {{ info.orderId }}</div>
    </div>
    <div class="detail area">
      <div class="title">跑腿编号：{{ info.pickUpCode }}</div>
      <div class="address-price flex">
        <div class="address-area">
          <div class="from">
            <span class="icon get">取</span>
            <span class="address">{{ info.pickUpAddress }}</span>
          </div>
          <div class="to">
            <span class="icon send">送</span>
            <span class="address">{{ info.sendAddress }}</span>
          </div>
        </div>
        <div class="price-area">
          <span class="price">{{ info.distributionPrice }}</span>
          <span>元</span>
        </div>
      </div>
      <div class="person-info flex">
        <div class="info-area">
          <div class="to-name">
            <span class="name">收货人</span>
            <span class="value">{{ info.userName }}</span>
          </div>
          <div class="phone">
            <span class="name">电 话</span>
            <span class="value">{{ info.userPhone }}</span>
          </div>
        </div>
        <a :href="`tel:${info.userPhone}`" class="iconfont">&#xe745;</a>
      </div>
      <div class="remark-info">
        <span>备注</span>
        <span class="remark">{{ info.remark }}</span>
      </div>
    </div>

    <div class="footer">
      <div v-if="info.endTime === null" class="flex">
        <input
          class="flex-2"
          v-model="curSendNo"
          type="text"
          placeholder="请输入收货码"
        />
        <div
          :class="['btn-will', 'flex-1', curSendNo === '' && 'btn-disable']"
          @click="finishSend"
        >
          完成派送
        </div>
      </div>
      <div v-else class="btn-finished">已完成配送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curSendNo: '', // 收货码
      id: '',
      info: {
        startTime: '',
        endTime: '',
        status: 0, // status 0 取货中 1已完成 2待评价 3已评价 4审核
      },
    }
  },
  created() {
    const { id } = this.$route.params
    this.id = id
    this.fetchOrderDetail(id)
  },
  methods: {
    // 拉去详情信息
    fetchOrderDetail(id) {
      this.$http
        .get('/api-wxmp/cxxz/distriButtion/order/orderSend', {
          params: {
            id,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.info = data.datas
          }
        })
    },
    // 完成配送提交动作
    finishSend() {
      if (this.curSendNo === '') {
        return
      }
      this.$http
        .post('/api-wxmp/cxxz/distriButtion/order/callBackOrderCode', {
          id: this.id,
          code: this.curSendNo,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.$toast.success('订单已完成配送')
            this.fetchOrderDetail(this.id)
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-distribution-detail {
  padding: 5px 15px;

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
      padding: 30px;
      text-align: center;
      font-size: 18px;
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
