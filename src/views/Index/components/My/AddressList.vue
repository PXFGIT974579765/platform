<template>
  <div class="page-my-address-list" v-wechat-title="$route.meta.title">
    <van-radio-group v-model="radio">
      <div
        v-for="item in addressList"
        :key="item.name"
        class="address-item flex-col"
      >
        <div class="flex-between">
          <span>{{ item.name }}</span>
          <span>{{ item.phone }}</span>
        </div>
        <span class="address">{{ item.address }}</span>
        <hr />

        <div class="flex-between">
          <van-radio name="index" checked-color="#07c160"
            >设为默认地址</van-radio
          >
          <div class="flex-between">
            <span :style="{ 'margin-right': '35px' }">修改</span>
            <span>删除</span>
          </div>
        </div>
      </div>
      <div class="btn-add">新增</div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [
        {
          name: '刘国贵',
          phone: '19987451243',
          address: '贵州省贵阳市花溪区大学城贵州师范大学科创园XXX',
        },
        {
          name: '刘国贵',
          phone: '19987451243',
          address: '贵州省贵阳市花溪区大学城贵州师范大学科创园XXX',
        },
      ],
    }
  },
  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.page-my-address-list {
  padding: 15px 0;

  .address-item {
    margin-top: 15px;
    padding: 10px 15px 24px 15px;
    font-size: 15px;
    color: #8e8e8e;
    background-color: #fff;
    border-bottom: 1px solid #eee;

    .address {
      margin-top: 19px;
    }

    hr {
      margin-top: 28px;
      height: 1px;
      margin: 22px 0 26px;
      border: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .btn-add {
    margin-left: 15px;
    margin-right: 15px;
    height: 47px;
    line-height: 47px;
    margin-top: 20px;
    background-color: #fff;
    text-align: center;
    color: #585858;
    font-size: 15px;
  }
}
</style>
