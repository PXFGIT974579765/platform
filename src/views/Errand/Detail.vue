<template>
  <div class="detail">
    <div class="status block">
      <div class="date">
        <div class="date-start">
          <div class="date-value">14:20</div>
          <div class="date-name">开始时间</div>
        </div>
        <div class="date-detail">2019.06.25</div>
        <div class="date-end">
          <div class="date-value">--:--</div>
          <div class="date-name">结束时间</div>
        </div>
      </div>

      <div class="contacts">
        <div class="status-detail">
          <div class="status-name">取货中</div>
          <div class="status-text">跑腿员 王多鱼 将为您上门取货</div>
        </div>
        <a class="phone" href="tel:18475555555">
          <span class="iconfont">&#xe747;</span>
        </a>
      </div>

      <div class="code">
        收货确认码
        <span class="code-value">9527</span>
      </div>
    </div>

    <good class="block" />

    <div class="order block">
      <div class="item">
        <div class="item-name">订单编号</div>
        <div class="item-value">
          PT2019061901023
          <span class="sep">|</span>复制
        </div>
      </div>
      <div class="item">
        <div class="item-name">跑腿费用</div>
        <div class="item-value">
          2元
          <span class="sep">|</span>
          <router-link to="/news" class="price-detail">价格明细</router-link>
        </div>
      </div>
      <div class="item">
        <div class="item-name">下单时间</div>
        <div class="item-value">2019.06.19 12:30:25</div>
      </div>
      <div class="item">
        <div class="item-name">物品信息</div>
        <div class="item-value">
          文件
          <span class="sep">|</span>小于1公斤
        </div>
      </div>
      <div class="item">
        <div class="item-name">支付方式</div>
        <div class="item-value">微信支付</div>
      </div>
      <div class="item">
        <div class="item-name">备注备注</div>
        <div class="item-value">请跑腿小哥哥加快速度哦！</div>
      </div>
    </div>
  </div>
</template>

<script>
import Good from './components/Good'

export default {
  components: {
    Good,
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
</style>
