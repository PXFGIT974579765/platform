<template>
  <div class="page-my-complain-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="title flex">
        <span class="time">{{ complainDetail.time | formatDate }}</span>
        <span
          :class="complainDetail.status | statusClass"
          v-if="complainDetail.status === 0"
        >
          {{ complainDetail.status | statusName }}
        </span>
      </div>
      <div class="tag">
        [{{ complainDetail.tag }}] {{ complainDetail.title }}
      </div>
      <div class="content">{{ complainDetail.content }}</div>
    </div>
    <div
      class="reply"
      v-if="complainDetail.status === 1 && complainDetail.reply !== ''"
    >
      <div class="title flex">
        <span class="tag">官方回复</span>
        <span :class="complainDetail.status | statusClass">
          {{ complainDetail.status | statusName }}
        </span>
      </div>
      <div class="content">{{ complainDetail.reply }}</div>
    </div>
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
      complainDetail: {
        id: '12345',
        tag: '问题咨询',
        title: '关于积分兑换商品的问题',
        content: '请问积分兑换的商品可以退货吗？ 退货后积分是否会返还？',
        time: 1500000000,
        status: 0, // 0 处理中  1 已回复
        reply:
          '尊敬的用户您好，商品如果有质量问题，是可以退换的，如果是因为某些原因需要退货，是不可以的，大家都是成年人，心里没点B数吗',
      },
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
.page-my-complain-detail {
  padding: 0;

  .container {
    margin-top: 10px;
    padding: 16px 15px 25px;
    background-color: #fff;

    .title {
      justify-content: space-between;
      font-size: 14px;

      .status-0 {
        color: #ff8400;
      }

      .status-1 {
        color: #12b54c;
      }
    }

    .time {
      color: #9f9f9f;
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

  .reply {
    margin-top: 10px;
    padding: 16px 15px 28px;
    background-color: #fff;

    .title {
      justify-content: space-between;
      font-size: 15px;

      .status-0 {
        color: #ff8400;
      }

      .status-1 {
        color: #12b54c;
      }

      .tag {
        color: #353434;
      }
    }

    .content {
      margin-top: 15px;
      line-height: 20px;
      font-size: 14px;
      color: #868686;
    }
  }
}
</style>
