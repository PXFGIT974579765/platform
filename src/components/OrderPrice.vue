<template>
  <div class="order-price">
    <div class="item" @click="onSelect">
      <div class="item-name">优惠券</div>
      <div class="tag">下单立减10元</div>
      <div class="item-value ticket">
        ￥10.00
        <span class="iconfont">&#xe76e;</span>
      </div>
    </div>
    <div class="item">
      <div class="item-name">订单总价</div>
      <div class="item-value price">￥{{ order.price }}</div>
    </div>

    <van-dialog
      v-model="ticketShow"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <div class="ticket-select">
        <van-icon name="cross" :size="16" class="close" @click="onClose" />
        <div class="ticket-list">
          <van-radio-group v-model="radio">
            <div class="ticket-item">
              <van-radio :name="2" checked-color="#07c160" />
              <div class="ticket-detail">
                <div class="ticket-name">
                  贵阳市花溪大学城贵州师范大学科创园B5栋负一层
                </div>
                <div class="contact">
                  白小姐
                  <span class="phone">19985501144</span>
                </div>
              </div>
            </div>
            <div class="ticket-item">
              <van-radio :name="1" checked-color="#07c160" />
              <div class="ticket-detail">
                <div class="ticket-name">
                  贵州财经大学（大学城校区）A3栋一楼12号
                </div>
                <div class="contact">
                  李小姐
                  <span class="phone">18085070709</span>
                </div>
              </div>
            </div>
          </van-radio-group>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      radio: 1,
      ticketShow: false,
    }
  },

  methods: {
    onSelect() {
      this.ticketShow = true
    },

    onClose() {
      this.ticketShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.order-price {
  padding: 0 15px;
  background: #fff;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #d7d7d7;

  &:last-child {
    border: 0;
  }
}

.item-name {
  padding: 15px 0;
}

.tag {
  margin-left: -3em;
  padding: 5px;
  border-radius: 2px;
  border: solid 1px #ff4444;
  color: #ff4444;
}

.ticket {
  color: #232323;
}

.price {
  font-size: 16px;
  color: #ff4a4a;
}

.ticket-select {
  position: relative;
  padding: 40px 17px;

  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #adadad;
    cursor: pointer;
  }
}

.ticket-list {
  max-height: 60vh;
  overflow: auto;
}

.ticket-item {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: solid 1px #e5e5e5;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border: 0;
  }
}

.ticket-detail {
  flex: 1;
  margin-left: 8px;
  line-height: 1.5;
  color: #4f4f4f;
}

.ticket-name {
  margin-bottom: 10px;
}
</style>
