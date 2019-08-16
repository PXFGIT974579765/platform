<template>
  <div class="distribution">
    <div class="header">
      <div class="title">配送方式</div>
      <div class="method" @click="onSelect">选择自提门店</div>
      <van-icon name="arrow" color="#a8a8a8" />
      <!-- <div class="link">说明</div> -->
    </div>

    <div v-if="addres.id" class="detail">
      <div class="item">
        <div class="item-name">自提地点:</div>
        <div class="item-value">{{ addres.address }}</div>
      </div>
      <div class="item">
        <div class="item-name">联系客服:</div>
        <div class="item-value">
          <div class="name">{{ addres.name }}</div>
          <span class="phone">{{ addres.phone }}</span>
          <a class="call" :href="`tel:${addres.phone}`">
            <span class="iconfont">&#xe747;</span>
          </a>
        </div>
      </div>
    </div>

    <van-dialog
      v-model="addressShow"
      :showConfirmButton="false"
      closeOnPopstate
      closeOnClickOverlay
    >
      <div class="address-select">
        <van-icon name="cross" :size="16" class="close" @click="onClose" />

        <div class="addres-list">
          <van-radio-group :value="value">
            <van-radio
              v-for="a in addressList"
              :key="a.id"
              :name="a.id"
              checked-color="#07c160"
              class="addres-item"
              @click="onClick(a)"
            >
              <div class="address-detail">
                <div class="address-name">{{ a.address }}</div>
                <div class="contact">
                  {{ a.name }}
                  <span class="phone">{{ a.phone }}</span>
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
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      addressShow: false,
      addres: {},
      addressList: [],
    }
  },

  created() {
    this.fetchAddressList()
  },

  methods: {
    fetchAddressList() {
      this.$http.get('/api-user/cxxz/branch/list').then(({ data }) => {
        if (data.resp_code === 0) {
          this.addressList = data.datas
        }
      })
    },

    onSelect() {
      this.addressShow = true
    },

    onClose() {
      this.addressShow = false
    },

    onClick(addres) {
      this.addressShow = false
      this.addres = addres
      this.$emit('change', addres)
    },
  },
}
</script>

<style lang="less" scoped>
.distribution {
  margin: 8px 0;
  padding: 15px;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  font-size: 15px;

  .title {
    flex: 1;
    font-weight: 700;
  }

  .method {
    margin-right: 8px;
  }
}

.detail {
  margin-top: 15px;
  padding-top: 15px;
  border-top: solid 1px #d7d7d7;
  border-bottom: solid 1px #d7d7d7;
}

.item {
  display: flex;
  margin-bottom: 15px;
  line-height: 1.4;
  color: #a4a4a4;
}

.item-value {
  flex: 1;
  display: flex;
  margin-left: 8px;
  color: #4f4f4f;
}

.phone {
  flex: 1;
  margin-left: 15px;
}

.call .iconfont {
  line-height: 1;
  font-size: 20px;
  color: #029eff;
}
</style>

<style lang="less">
.address-select {
  position: relative;
  padding: 30px 0;

  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #adadad;
    cursor: pointer;
  }

  /deep/ .van-radio__label {
    flex: 1;
  }
}

.addres-list {
  max-height: 60vh;
  overflow: auto;
}

.addres-item {
  display: flex;
  padding: 15px;
  border-bottom: solid 1px #e5e5e5;

  &:last-child {
    border: 0;
  }
}

.address-detail {
  flex: 1;
  margin-left: 8px;
  line-height: 1.5;
  color: #4f4f4f;
}

.address-name {
  margin-bottom: 10px;
}
</style>
