<template>
  <div class="page-my-address-edit" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="form-item">
        <span class="key">收货人姓名</span>
        <span class="value">
          <input type="text" placeholder="请输入姓名" />
        </span>
      </div>
      <div class="form-item">
        <van-radio-group v-model="sex" class="group flex">
          <van-radio name="1" checked-color="#07c160" class="radio"
            >男</van-radio
          >
          <van-radio name="2" checked-color="#07c160" class="radio"
            >女</van-radio
          >
        </van-radio-group>
      </div>
      <div class="form-item">
        <span class="key">手机号码</span>
        <span class="value">
          <input type="text" placeholder="请输入电话" />
        </span>
      </div>
      <div class="form-item" @click="showArea">
        <span class="key">所在区域</span>
        <span class="value">
          <input type="text" placeholder="请输入所在区域" v-model="area" />
        </span>
      </div>
      <div class="form-item">
        <span class="key">详细地址</span>
        <span class="value">
          <input type="text" placeholder="请输入详细地址" />
        </span>
      </div>
    </div>

    <div class="btn-submit">保存</div>
    <van-action-sheet class="area" v-model="areaShow" :actions="actions">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" />
    </van-action-sheet>
  </div>
</template>

<script>
import areaList from '@/mock/area.js'

export default {
  props: {
    address: {
      id: '1234',
      name: '刘国贵',
      phone: '19987451243',
      address: '贵州省贵阳市花溪区大学城贵州师范大学科创园XXX',
    },
  },
  data() {
    return {
      sex: '1',
      areaList,
      areaShow: false,
      area: '',
    }
  },
  methods: {
    onLoad() {},
    showArea() {
      this.areaShow = true
    },
    confirm(arr) {
      const area = arr.map(item => item.name).join('/')
      this.area = area
      this.areaShow = false
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
    background-color: #fff;

    .form-item {
      height: 53px;
      display: flex;
      padding: 0 15px;
      font-size: 15px;
      align-items: center;
      border-bottom: 1px solid #eee;

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
        color: #585858;

        input {
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
