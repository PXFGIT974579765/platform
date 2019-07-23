<template>
  <div class="order">
    <order-good />
    <order-distribution />

    <div class="pay">
      <div class="pay-header">
        <div class="title">支付方式</div>
      </div>

      <div class="methods">
        <div class="method">
          <div class="price">
            <span class="name">积分抵扣：</span>
            <span class="value">5000 积分</span>
          </div>
          <div class="balance">
            <span class="name">可用积分：</span>
            <span class="value">8796分</span>
          </div>
        </div>

        <div class="method">
          <div class="price">
            <span class="name">余额支付：</span>
            <span class="value">1.00元</span>
          </div>
          <div class="balance">
            <span class="name">账户余额：</span>
            <span class="value">58.00元</span>
          </div>
        </div>
      </div>
    </div>

    <div class="submit-wrap">
      <button class="submit">立即兑换</button>
    </div>
  </div>
</template>

<script>
import OrderGood from '@/components/OrderGood'
import OrderDistribution from '@/components/OrderDistribution'

export default {
  components: {
    OrderGood,
    OrderDistribution,
  },
}
</script>

<style lang="less" scoped>
.pay {
  margin: 10px 0;
  padding: 20px 15px 5px;
  background: #fff;
}

.pay-header {
  padding-bottom: 15px;
  border-bottom: solid 1px #d7d7d7;
  font-size: 15px;

  .title {
    font-weight: 700;
  }
}

.method {
  display: flex;
  padding: 14px 0;
  border-bottom: dashed 1px #d7d7d7;
  color: #a4a4a4;

  &:last-child {
    border: 0;
  }

  .price {
    flex: 1;

    .value {
      color: #ff6000;
    }
  }
}

.submit-wrap {
  padding: 15px;
}

.submit {
  width: 100%;
  padding: 13px 0;
  font-size: 15px;
  border-radius: 4px;
  color: #fff;
  background-image: linear-gradient(#06bcbf, #06bcbf),
    linear-gradient(#07c060, #07c060);
}
</style>
