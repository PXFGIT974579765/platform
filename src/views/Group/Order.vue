<template>
  <div>
    <order-good />
    <order-distribution />
    <order-price />
    <order-pay />
    <order-submit />
  </div>
</template>

<script>
import OrderGood from '@/components/OrderGood'
import OrderDistribution from '@/components/OrderDistribution'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    OrderGood,
    OrderDistribution,
    OrderPrice,
    OrderPay,
    OrderSubmit,
  },
}
</script>

<style lang="less" scoped></style>
