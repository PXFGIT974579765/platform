<template>
  <div>
    <order-good />
    <distribution />
    <order-price />
    <order-pay />
    <order-submit />
  </div>
</template>

<script>
import OrderGood from './components/OrderGood'
import Distribution from './components/Distribution'
import OrderPrice from '@/components/OrderPrice'
import OrderPay from '@/components/OrderPay'
import OrderSubmit from '@/components/OrderSubmit'

export default {
  components: {
    OrderGood,
    Distribution,
    OrderPrice,
    OrderPay,
    OrderSubmit,
  },
}
</script>

<style lang="less" scoped></style>
