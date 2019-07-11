<template>
  <div class="order">
    <person-card :data="person" />

    <div class="goods block">
      <div class="block-header">
        <div class="title">费用</div>
      </div>

      <div class="good-info">
        <img src="~@/assets/images/goods.png" alt />
        <div class="good-info-content">
          <div class="name">
            华为路由器无线全千兆端口家用WIFI穿墙王大功率户型
          </div>
          <div class="type">标准套餐：白色-定制版</div>
        </div>
      </div>

      <div class="address">
        <div class="address-item address-get">
          <div class="type">取</div>
          <div class="detail">
            <div class="name">贵州师范大学花溪校区（创星校园学子实训中心）</div>
            <div class="phone"><span>莫先生</span>19985501144</div>
          </div>
          <div class="button">选择</div>
        </div>

        <div class="address-item address-put">
          <div class="type">送</div>
          <div class="detail">
            <div class="name">贵州师范大学花溪校区-教育科学学院5楼502室</div>
            <div class="phone"><span>马冬梅</span>13314466110</div>
          </div>
          <div class="button">选择</div>
        </div>
      </div>
    </div>

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
        <button>2元</button>
        <button>3元</button>
        <button>4元</button>
        <button>自定义</button>
      </div>
    </div>

    <div class="pay-methods block">
      <span></span>
      <span>微信支付</span>
      <van-checkbox checked-color="#07c160" />
    </div>

    <div class="pay block">
      <div class="price">
        支付
        <span>￥2.00元</span>
      </div>
      <button>提交订单</button>
    </div>
  </div>
</template>

<script>
import PersonCard from './components/PersonCard'

export default {
  components: {
    PersonCard,
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
    }
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

.good-info {
  display: flex;
  margin-bottom: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
  img {
    width: 70px;
    height: 70px;
    margin-right: 14px;
    border-radius: 2px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .name {
    line-height: 1.5;
    font-size: 15px;
    color: #2d2d2d;
  }
  .type {
    font-size: 13px;
    color: #c0c0c0;
  }
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
  }
  .button,
  .detail {
    margin-bottom: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #c8c8c8;
  }
  .button {
    padding-left: 15px;
    font-size: 13px;
    color: #029eff;
  }
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
}

.pay-methods {
}
</style>
