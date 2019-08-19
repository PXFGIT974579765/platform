<template>
  <div class="goods">
    <div class="block-header">
      <div class="title">跑腿订单</div>
    </div>

    <commodity :good="good" />

    <div class="address">
      <div class="address-item address-get">
        <div class="type">取</div>
        <div class="detail">
          <div class="name">{{ good.pickUpAddress }}</div>
          <div class="phone">
            <span>联系电话</span>
            {{ good.phone }}
          </div>
        </div>
        <!-- <div class="button">选择</div> -->
      </div>

      <div v-if="!detail" class="address-item address-put">
        <div class="type">送</div>
        <div class="detail">
          <div class="name">{{ addressList[0].address }}</div>
          <div class="phone">
            <span>联系电话</span>
            {{ addressList[0].telephone }}
          </div>
        </div>
        <div class="button" @click="onSelect">选择</div>
      </div>
      <div v-else class="address-item address-put">
        <div class="type">送</div>
        <div class="detail">
          <div class="name">
            {{ addressDetail.address || good.sendAddress }}
          </div>
          <div class="phone">
            <span>联系电话</span>
            {{ addressDetail.mobile || good.userPhone }}
          </div>
        </div>
      </div>
    </div>

    <van-dialog
      v-if="!detail"
      v-model="addressShow"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <div class="address-select">
        <van-icon name="cross" :size="16" class="close" @click="onClose" />

        <div class="addres-list">
          <van-radio-group v-model="address" @change="onChange">
            <van-radio
              v-for="a in addressList"
              :key="a.id"
              :name="a.id"
              checked-color="#07c160"
              class="addres-item"
            >
              <div class="address-detail">
                <div class="address-name">{{ a.address }}</div>
                <div class="contact">
                  {{ a.trueName }}
                  <span class="phone">{{ a.mobile }}</span>
                </div>
              </div>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Commodity from './Commodity'

export default {
  components: {
    Commodity,
  },

  props: {
    good: Object,
    addressList: {
      type: Array,
      default: () => [],
    },
    detail: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      addressShow: false,
      address: '',
      addressDetail: {},
    }
  },

  methods: {
    onSelect() {
      this.addressShow = true
    },

    onClose() {
      this.addressShow = false
    },

    onChange(value) {
      this.addressShow = false
      this.addressDetail = this.addressList.find(({ id }) => id === value)
      this.$emit('selectAddress', this.addressDetail)
    },
  },
}
</script>

<style lang="less" scoped>
.commodity {
  margin-bottom: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
}

.address-item {
  display: flex;
  line-height: 1.5;

  .type {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin: 0.3em 15px 0 0;
    border-radius: 100%;
    font-size: 12px;
    color: #fff;
    background-color: #029eff;
  }
  &.address-put .type {
    background-color: #1cd547;
  }
  .detail {
    flex: 1;
  }
  .name {
    margin-bottom: 10px;
    font-size: 15px;
    color: #585858;
  }
  .phone {
    font-size: 12px;
    color: #a4a4a4;
    span {
      margin-right: 8px;
    }
  }
  .button,
  .detail {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #c8c8c8;
  }
  .button {
    margin-top: 0.1em;
    padding-left: 15px;
    font-size: 13px;
    color: #029eff;
  }
}
</style>
