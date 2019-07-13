<template>
  <div class="page-my-complain" v-wechat-title="$route.meta.title">
    <van-tabs v-model="active" color="#06bcbf">
      <van-tab title="我要咨询投诉">
        <div class="i-will">
          <van-radio-group v-model="complainType" class="group flex">
            <van-radio name="0" checked-color="#07c160" class="radio"
              >问题咨询</van-radio
            >
            <van-radio name="1" checked-color="#07c160" class="radio"
              >投诉建议</van-radio
            >
          </van-radio-group>
          <div class="container">
            <div class="title">内容描述</div>
            <textarea
              v-model="content"
              class="content"
              placeholder="请输入你要咨询的问题 (最多输入200字)"
            ></textarea>
            <div class="camera">
              <span class="iconfont">&#xe761;</span>
            </div>
          </div>
          <div class="btn-submit">提交</div>
        </div>
      </van-tab>
      <van-tab title="我的咨询投诉"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

export default {
  data() {
    return {
      complainType: '0',
      content: '',
    }
  },
  methods: {
    onLoad() {},
  },
  filters: {
    formatDate: function(value) {
      return dateTime(value)
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-complain {
  padding: 0;

  .i-will {
    width: 100%;
    margin-top: 10px;

    .group {
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #eee;
      background: #fff;

      .radio {
        &:first-child {
          margin-left: 16px;
        }

        &:last-child {
          margin-left: 48px;
        }
      }
    }

    .container {
      padding: 18px 15px 36px 15px;
      background: #fff;

      .title {
        font-size: 15px;
        color: #585858;
      }

      .content {
        margin-top: 15px;
        width: 100%;
        height: 160px;
        padding: 19px 16px;
        font-size: 14px;
        outline: 0;
        border: 0;
        background-color: #f6f6f6;
      }

      .camera {
        margin-top: 15px;
        width: 70px;
        height: 55px;
        line-height: 55px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 6px;
        border: 1px dashed #c1c1c1;

        .iconfont {
          width: 25px;
          height: 23px;
          color: #bababa;
        }
      }
    }

    .btn-submit {
      margin: 19px 15px;
      height: 47px;
      line-height: 47px;
      border-radius: 4px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      background-color: #07c1b2;
    }
  }
}
</style>
