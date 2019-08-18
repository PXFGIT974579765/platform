<template>
  <div class="page-my-address-list" v-wechat-title="$route.meta.title">
    <van-radio-group v-model="defaultAddressId">
      <div
        v-for="item in addressList"
        :key="item.id"
        class="address-item flex-col"
      >
        <div class="flex-between">
          <span>{{ item.trueName }}</span>
          <span>{{ item.mobile }}</span>
        </div>
        <span class="address">{{ item.address }} {{ item.detailAddress }}</span>
        <hr />

        <div class="flex-between">
          <van-radio
            :name="item.id"
            checked-color="#07c160"
            @click="onRadioChanged(item.id)"
            >设为默认地址</van-radio
          >
          <div class="flex-between">
            <span
              :style="{ 'margin-right': '35px' }"
              @click="routeEdit(item.id)"
              >修改</span
            >
            <span @click="deleteAddress(item.id)">删除</span>
          </div>
        </div>
      </div>
      <div class="btn-add" @click="routeAdd">新增</div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAddressId: '',
      addressList: [],
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      this.$http
        .get('/api-wxmp/cxxz/address/findAddressByUserId')
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.addressList = data.datas
            const defualtAddr = this.addressList.find(
              item => item.defultStatus == 1
            )
            this.defaultAddressId = defualtAddr.id
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
    routeAdd() {
      this.$router.push({
        path: '/my/address-edit',
        name: '/my/address-add',
        params: {},
      })
    },
    routeEdit(id) {
      const address = this.addressList.find(item => item.id == id)
      this.$router.push({
        path: `/my/address-edit/${id}`,
        name: '/my/address-edit',
        params: {
          address,
        },
      })
    },
    onRadioChanged(name) {
      const address = this.addressList.find(item => item.id == name)
      this.updateAddress(address)
    },

    // 设置为默认地址
    updateAddress(address) {
      this.$http
        .post('/api-wxmp/cxxz/address/saveAddress', {
          ...address,
          defultStatus: 1,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.$toast.success('设置成功')
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },

    // 删除地址
    deleteAddress(id) {
      this.$http
        .post('/api-wxmp/cxxz/address/deleteByAddressId', {
          id: id,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.$toast.success('删除成功')
            const addresses = this.addressList.filter(item => item.id != id)
            this.addressList = addresses
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-address-list {
  padding: 0;

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
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
    color: #585858;
    font-size: 15px;
  }
}
</style>
