<template>
  <div class="page-my-complain" v-wechat-title="$route.meta.title">
    <van-tabs v-model="activeTab" color="#06bcbf">
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
      <van-tab title="我的咨询投诉">
        <ul>
          <li v-for="item in myComplain" :key="item.id">
            <div class="title flex">
              <span class="time">{{ item.time | formatDate }}</span>
              <span :class="item.status | statusClass">{{
                item.status | statusName
              }}</span>
            </div>
            <div class="tag">[{{ item.tag }}] {{ item.title }}</div>
            <div class="content">{{ item.content }}</div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

const STATUS_HASH = {
  0: '处理中',
  1: '已回复',
}

const SATUS_CLASS = {
  0: 'status-0',
  1: 'status-1',
}

export default {
  data() {
    return {
      activeTab: '1',
      complainType: '0',
      content: '',
      myComplain: [
        {
          id: '12345',
          tag: '问题咨询',
          title: '关于积分兑换商品的问题',
          content: '请问积分兑换的商品可以退货吗？ 退货后积分是否会返还？',
          time: 1500000000,
          status: 0, // 0 处理中  1 已回复
        },
        {
          id: '123456',
          tag: '问题咨询',
          title: '关于积分兑换商品的问题',
          content: '请问积分兑换的商品可以退货吗？ 退货后积分是否会返还？',
          time: 1500000000,
          status: 1, // 0 处理中  1 已回复
        },
      ],
    }
  },
  methods: {
    onLoad() {},
  },
  filters: {
    formatDate: dateTime,
    statusName: function(status) {
      return STATUS_HASH[status]
    },
    statusClass: function(status) {
      return SATUS_CLASS[status]
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

  ul {
    li {
      margin-top: 10px;
      padding: 16px 15px 25px;
      background-color: #fff;

      .title {
        justify-content: space-between;
        font-size: 14px;
      }

      .time {
        color: #9f9f9f;
      }

      .status-0 {
        color: #ff8400;
      }

      .status-1 {
        color: #12b54c;
      }

      .tag {
        margin-top: 17px;
        font-size: 16px;
        line-height: 17px;
        font-weight: 600;
        color: #353434;
      }

      .content {
        margin-top: 15px;
        line-height: 20px;
        font-size: 14px;
        color: #868686;
      }
    }
  }
}
</style>
