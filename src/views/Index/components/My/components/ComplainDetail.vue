<template>
  <div class="page-my-complain-detail" v-wechat-title="$route.meta.title">
    <div class="container">
      <div class="title flex">
        <span class="time">{{ complainDetail.createTime }}</span>
        <span
          :class="complainDetail.status | statusClass"
          v-if="complainDetail.status === 0"
          >{{ complainDetail.status | statusName }}</span
        >
      </div>
      <div class="tag">
        [{{ complainDetail.suggestionType | tagFilter }}]
        {{ complainDetail.title }}
      </div>
      <div class="content">{{ complainDetail.suggestionContent }}</div>
      <img v-for="item in suggestionImgs" :key="item" :src="item" alt />
    </div>
    <div class="reply" v-if="complainDetail.status === 1 && replies.length > 0">
      <div class="title flex">
        <span class="tag">官方回复</span>
        <span :class="complainDetail.status | statusClass">{{
          complainDetail.status | statusName
        }}</span>
      </div>
      <div v-for="item in replies" :key="item.id" class="content line">
        <div>{{ item.content }}</div>
        <span class="time">{{ item.replyTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const STATUS_HASH = {
  0: '处理中',
  1: '已回复',
}

const SATUS_CLASS = {
  0: 'status-0',
  1: 'status-1',
}

const TAT = {
  1: '问题咨询',
  2: '问题投诉',
}

export default {
  data() {
    return {
      replies: [],
      complainDetail: {},
      suggestionImgs: [],
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchDetail(id)
  },
  methods: {
    // 请求详情信息
    fetchDetail(id) {
      this.$http
        .get('/api-media/suggestion/mySuggestionDetail', {
          params: {
            suggestionId: id,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            const { replies, suggestionDeal } = data.datas
            this.replies = replies
            this.complainDetail = suggestionDeal

            if (suggestionDeal.suggestionImgs) {
              this.suggestionImgs = suggestionDeal.suggestionImgs.split('@')
            }
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },
  },
  filters: {
    tagFilter: status => TAT[status],

    statusName: status => STATUS_HASH[status],

    statusClass: status => SATUS_CLASS[status],
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

    .tag {
      margin-top: 17px;
      font-size: 16px;
      line-height: 17px;
      font-weight: 600;
      color: #353434;
    }

    img {
      width: 100%;
      height: auto;
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
  }

  .content {
    margin-top: 15px;
    line-height: 20px;
    font-size: 14px;
    color: #868686;
  }

  .line {
    border-bottom: 1px solid #eee;
  }

  .time {
    color: #9f9f9f;
  }
}
</style>
