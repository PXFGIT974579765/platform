<template>
  <div class="order">
    <person-card :data="person" />

    <good class="block" />

    <div class="comment block">
      <label class="input-field">
        <span>备注</span>
        <input type="text" placeholder="物品描述或配送要求" />
      </label>
    </div>

    <div class="cost block">
      <div class="block-header">
        <div class="title">费用</div>
        <router-link to="/news" class="block-header-link">收费标准</router-link>
      </div>
      <div class="prices">
        <button class="active">2元</button>
        <button>3元</button>
        <button>4元</button>
        <button>自定义</button>
      </div>
    </div>

    <div class="pay-methods block">
      <van-radio-group v-model="radio">
        <div class="pay-method weixin">
          <span class="iconfont">&#xe758;</span>
          <div class="name">微信支付</div>
          <van-radio :name="1" checked-color="#07c160" />
        </div>
        <div class="pay-method account">
          <span class="iconfont">&#xe777;</span>
          <div class="name">
            余额
            <span>可用余额: 89.80元</span>
          </div>
          <van-radio :name="2" checked-color="#07c160" />
        </div>
      </van-radio-group>
    </div>

    <div class="pay">
      <div class="price">
        支付
        <span>￥2.00元</span>
      </div>
      <button @click="onSubmit">提交订单</button>
    </div>
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'
import Good from './components/Good'

export default {
  components: {
    PersonCard,
    Good,
  },

  data() {
    return {
      person: {
        id: 3,
        name: '王多鱼',
        sex: '男',
        count: 20,
        score: 9.2,
      },
      comment: '',
      radio: 1,
    }
  },

  methods: {
    onSubmit() {
      this.$router.push('/errand/detail')
    },
  },
}
</script>

<style lang="less" scoped>
.order {
  padding: 18px 15px;
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

.block-header-link {
  font-size: 13px;
  color: #21a7ff;
}

.comment {
  padding: 0 16px;
}

.input-field {
  display: flex;
  align-items: center;
  color: #585858;

  input {
    flex: 1;
    padding: 12px 15px;
  }
}

.cost {
  .prices {
    display: flex;
    margin-top: 20px;
  }
  button {
    flex: 1;
    height: 30px;
    line-height: 30px;
    margin-right: 9px;
    padding: 0;
    border-radius: 3px;
    font-size: 13px;
    border: solid 1px #b4b4b4;
    color: #585858;
    &:last-child {
      margin: 0;
    }
    &.active {
      border-color: #00b034;
      color: #00b034;
    }
  }
}

.pay-method {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #c8c8c8;
  &:last-child {
    margin: 0;
    padding: 0;
    border: 0;
  }
  .name {
    flex: 1;
    margin: 0 11px;
    color: #585858;
    span {
      margin-left: 12px;
      font-size: 13px;
      color: #a4a4a4;
    }
  }
  &.weixin .iconfont {
    color: #00b700;
  }
  &.account .iconfont {
    color: #ffc000;
  }
}

.pay {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 84px -15px 76px;
  background: #ffffff;
  > * {
    flex: 1;
  }
  .price {
    font-size: 12px;
    color: #585858;
    span {
      font-size: 15px;
      color: #ff4545;
    }
  }
  button {
    height: 48px;
    line-height: 48px;
    color: #fff;
    background: #0cc3b1;
  }
}
</style>
