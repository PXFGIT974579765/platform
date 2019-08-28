<template>
  <div class="detail">
    <div class="status block">
      <div class="date">
        <div class="date-start">
          <div class="date-value">{{ order.startTime.split(' ')[1] }}</div>
          <div class="date-name">开始时间</div>
        </div>
        <div class="date-detail">{{ order.startTime.split(' ')[0] }}</div>
        <div class="date-end">
          <div class="date-value">
            {{ order.endTime ? order.endTime.split(' ')[1] : '--:--' }}
          </div>
          <div class="date-name">结束时间</div>
        </div>
      </div>

      <div class="contacts">
        <div class="status-detail">
          <div class="status-name">
            {{ order.endTime ? '已结束' : '取货中' }}
          </div>
          <div class="status-text">
            跑腿员 {{ order.distributionName }}
            {{ order.endTime ? '已完成派送' : '将为您上门取货' }}
          </div>
        </div>
        <a class="phone" :href="`tel:${order.phone}`">
          <span class="iconfont">&#xe747;</span>
        </a>
      </div>

      <div class="code">
        收货确认码
        <span class="code-value">{{ order.pickUpCode }}</span>
      </div>
    </div>

    <good class="block" :good="order" detail />

    <div class="order block">
      <div class="item">
        <div class="item-name">订单编号</div>
        <div class="item-value">
          {{ order.id }}
          <span class="sep">|</span>
          <span
            @click="onCopy"
            class="clipboard"
            :data-clipboard-text="order.id"
            >复制</span
          >
        </div>
      </div>
      <div class="item">
        <div class="item-name">跑腿费用</div>
        <div class="item-value">
          2元
          <span class="sep">|</span>
          <span class="price-detail" @click="onShowPrice">价格明细</span>
        </div>
      </div>
      <div class="item">
        <div class="item-name">下单时间</div>
        <div class="item-value">{{ order.startTime }}</div>
      </div>
      <!-- <div class="item">
        <div class="item-name">物品信息</div>
        <div class="item-value">
          文件
          <span class="sep">|</span>小于1公斤
        </div>
      </div>-->
      <div class="item">
        <div class="item-name">支付方式</div>
        <div class="item-value">微信支付</div>
      </div>
      <div class="item">
        <div class="item-name">备注备注</div>
        <div class="item-value">{{ order.remark }}</div>
      </div>
    </div>

    <van-dialog
      v-model="priceVisible"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <div class="price-comment">
        <van-icon name="cross" :size="16" class="close" @click="onClosePrice" />

        <div class="title">配送收费标准</div>

        <p>
          1、由于部分商品的重量可能存在误差，针对该计重收费的订单，系统会自动扣减重量10%后计算运费（例：结算页订单金额200元，商品总重量显示38kg，系统扣减重量10%后按34.2kg计算运费；超出重量4.2kg，向上取整至5kg，按1元/kg收续重运费5元）。如用户对扣减后的重量仍有异议，请及时联系客服沟通核实，经核实确认因商品重量误差导致用户多支付运费的，多支付运费将退还给用户
        </p>
        <p>2、商品重量以毛重计算（含商品销售包装的重量）。</p>
        <p>3、计算运费的订单金额以订单最终实际支付金额为准。</p>
        <p>
          4、当订单拆分成多个订单配送时，按支付页面的运费标准收费，不额外收取多次配送费用。
        </p>
        <p>
          5、运费的收取标准据实进行相应调整，具体以商品详情页及结算页公示的运费为准。"
        </p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Good from './components/Good'
import ClipboardJS from 'clipboard'
import { Toast } from 'vant'

export default {
  components: {
    Good,
  },

  data() {
    return {
      priceVisible: false,
      order: {
        startTime: '',
        endTime: '',
      },
    }
  },

  mounted() {
    this.fetchData()
    this.clipboard = new ClipboardJS('.clipboard')
  },

  beforeDestroy() {
    this.clipboard.destroy()
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData() {
      this.$http
        .post('/api-wxmp/cxxz/runner/findDistritionOrderDetail', {
          id: this.$route.params.id,
          orderId: this.$route.query.good,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.order = data.datas.detail
          }
        })
    },

    onCopy() {
      Toast('复制成功')
    },

    onShowPrice() {
      this.priceVisible = true
    },

    onClosePrice() {
      this.priceVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  padding: 15px 15px 70px;
}

.block {
  margin-bottom: 12px;
  padding: 17px;
  border-radius: 4px;
  background-color: #fff;
}

.block-header {
  display: flex;
  .title {
    flex: 1;
    color: #585858;
  }
}

.date {
  display: flex;
  text-align: center;
  padding: 4px 17px 25px;
  border-bottom: solid 1px #e8e8e8;
}
.date-detail {
  flex: 1;
  color: #a4a4a4;
}
.date-value {
  line-height: 1;
  margin-bottom: 10px;
  font-size: 21px;
  color: #2d2d2d;
}
.date-name {
  color: #787878;
}

.contacts {
  display: flex;
  align-items: center;
  padding: 25px 17px;
  .iconfont {
    font-size: 30px;
    color: #029eff;
  }
}
.status-detail {
  flex: 1;
  .status-name {
    margin-bottom: 16px;
    font-size: 18px;
    color: #383838;
  }
  .status-text {
    color: #585858;
  }
}

.code {
  height: 53px;
  line-height: 54px;
  text-align: center;
  font-size: 18px;
  border-radius: 0px 0px 4px 4px;
  color: #fff;
  background-color: #4c5661;
}
.code-value {
  font-size: 23px;
  // font-weight: 700;
  margin-left: 10px;
}

.item {
  display: flex;
  margin-bottom: 1em;
  .item-name {
    color: #808082;
  }
  .item-value {
    margin-left: 21px;
    flex: 1;
    color: #303032;
  }
  .sep {
    margin: 0 7px;
  }
  .price-detail {
    color: #ff7800;
  }
}

.price-comment {
  position: relative;
  padding: 15px 15px;
  line-height: 1.5;
  font-size: 12px;

  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #adadad;
    cursor: pointer;
  }

  .title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 18px;
  }

  p {
    margin-bottom: 10px;
  }
}
</style>
