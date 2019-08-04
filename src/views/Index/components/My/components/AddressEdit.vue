<template>
  <div class="page-my-address-edit" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="form-item">
        <span class="key">收货人姓名</span>
        <span class="value">
          <input
            type="text"
            v-model="address.trueName"
            placeholder="请输入姓名"
          />
        </span>
      </div>
      <div class="form-item">
        <van-radio-group v-model="address.gender" class="group flex">
          <van-radio
            :name="1"
            checked-color="#07c160"
            class="radio"
            @click="onRadioChanged(1)"
            >男</van-radio
          >
          <van-radio
            :name="0"
            checked-color="#07c160"
            class="radio"
            @click="onRadioChanged(0)"
            >女</van-radio
          >
        </van-radio-group>
      </div>
      <div class="form-item">
        <span class="key">手机号码</span>
        <span class="value">
          <input
            type="text"
            v-model="address.mobile"
            placeholder="请输入电话"
          />
        </span>
      </div>
      <div class="form-item" @click="showArea">
        <span class="key">所在区域</span>
        <span class="value">
          <input
            type="text"
            placeholder="请输入所在区域"
            readonly
            v-model="address.address"
          />
        </span>
      </div>
      <div class="form-item">
        <span class="key">详细地址</span>
        <span class="value">
          <input
            type="text"
            v-model="address.detailAddress"
            placeholder="请输入详细地址"
          />
        </span>
      </div>
    </div>

    <div class="btn-submit" @click="onSubmit">保存</div>
    <van-action-sheet class="area" v-model="areaShow">
      <van-picker
        :columns="colnums"
        @change="onChange"
        :show-toolbar="true"
        @confirm="onConfirm"
        @cancel="cancel"
      />
    </van-action-sheet>
  </div>
</template>

<script>
const DEFAULT_GENDER = 1

export default {
  data() {
    return {
      provinceList: [],
      cityList: [],
      countyList: [],
      colnums: [],
      areaShow: false,
      address: {
        gender: DEFAULT_GENDER,
      },
    }
  },
  created() {
    const { address } = this.$route.params
    if (address) {
      this.address = address
    }
    this.fetchAreas()
  },
  methods: {
    // 获取区域信息
    fetchAreas() {
      this.$http.get('/api-wxmp/cxxz/address/findAreaAll').then(({ data }) => {
        if (data.resp_code === 0) {
          this.areaList = { ...this.createAreaList(data.datas) }
        }
      })
    },

    // 提交保存
    onSubmit() {
      this.$http
        .post('/api-wxmp/cxxz/address/saveAddress', {
          ...this.address,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            alert('保存成功')
            this.$router.push('/my/address-list')
          } else {
            alert(data.resp_msg)
          }
        })
    },

    // 确认区域
    onConfirm(value) {
      this.areaShow = false
      this.address.address = value.join('/')

      // 获取区域 areId
      const country = value[2]
      const areaId = this.countyList.find(item => item.areaName == country).id

      this.address.areaId = areaId
    },

    // 性别
    onRadioChanged(name) {
      this.address.gender = name
    },

    //更新区域组件数据
    onChange(picker, values) {
      const province = values[0]
      const city = values[1]

      const proviceId = this.provinceList.find(
        item => item.areaName == province
      ).id
      const cityId = this.cityList.find(item => item.areaName == city).id

      const cityDefaultList = this.cityList.filter(
        item => item.pId == proviceId
      )
      const countryDefaultList = this.countyList.filter(
        item => item.pId == cityId
      )
      // 更新市级列表
      picker.setColumnValues(1, cityDefaultList.map(item => item.areaName))
      // 更新区域级
      picker.setColumnValues(2, countryDefaultList.map(item => item.areaName))
    },

    // 构造前端所需的区域格式
    createAreaList(areaList) {
      const provinceList = areaList.filter(item => item.areaType == 1)
      const cityList = areaList.filter(item => item.areaType == 2)
      const countyList = areaList.filter(item => item.areaType == 3)

      this.provinceList = provinceList
      this.cityList = cityList
      this.countyList = countyList

      const provinceDefaultIndex = 0
      const cityDefaultIndex = 0
      const countryDefaultIndex = 0

      const provinceDefaultList = provinceList
      const cityDefaultList = cityList.filter(
        item => item.pId == provinceDefaultList[provinceDefaultIndex].id
      )
      const countryDefaultList = countyList.filter(
        item => item.pId == cityDefaultList[cityDefaultIndex].id
      )

      const colnums = [
        {
          values: provinceDefaultList.map(item => item.areaName),
          defaultIndex: provinceDefaultIndex,
        },
        {
          values: cityDefaultList.map(item => item.areaName),
          defaultIndex: cityDefaultIndex,
        },
        {
          values: countryDefaultList.map(item => item.areaName),
          defaultIndex: countryDefaultIndex,
        },
      ]

      this.colnums = colnums
    },

    showArea() {
      this.areaShow = true
    },

    cancel() {
      this.areaShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-address-edit {
  padding: 0;

  .container {
    margin-top: 10px;
    padding: 10px 15px 0 15px;
    background-color: #fff;

    .form-item {
      height: 53px;
      display: flex;
      font-size: 15px;
      align-items: center;

      &:not(:last-child) {
        border-bottom: 1px solid #eee;
      }

      .area {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      .group {
        height: 50px;
        align-items: center;
        background: #fff;

        .radio {
          &:first-child {
            margin-left: 80px;
          }

          &:last-child {
            margin-left: 48px;
          }
        }
      }

      .key {
        color: #9f9f9f;
      }

      .value {
        margin-left: 18px;
        flex: 1;
        color: #585858;

        input {
          width: 100%;
          border: 0;
        }
      }
    }
  }

  .btn-submit {
    margin: 37px 15px;
    height: 47px;
    line-height: 47px;
    border-radius: 4px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    background-color: #06bcbf;
  }
}
</style>
