<template>
  <div class="page-my-complain" v-wechat-title="$route.meta.title">
    <van-tabs
      v-model="activeTab"
      color="#06bcbf"
      line-height="1px"
      :border="false"
      :swipe-threshold="5"
    >
      <van-tab title="我要咨询投诉">
        <div class="i-will">
          <van-radio-group v-model="suggestionType" class="group flex">
            <van-radio
              :name="1"
              checked-color="#07c160"
              class="radio"
              @click="onRadioChanged(1)"
              >问题咨询</van-radio
            >
            <van-radio
              :name="2"
              checked-color="#07c160"
              class="radio"
              @click="onRadioChanged(2)"
              >投诉建议</van-radio
            >
          </van-radio-group>
          <div class="container">
            <div class="title">标题</div>
            <van-field
              v-model="title"
              placeholder="关于xxx的问题"
              @input="onTitleChanged"
              :error-message="err.title"
            />
            <div class="title">内容</div>
            <van-field
              v-model="content"
              type="textarea"
              class="content"
              placeholder="请输入你要咨询的问题 (最多输入200字)"
              @input="onContentChanged"
              :error-message="err.content"
            />
            <div class="camera">
              <span class="iconfont">&#xe761;</span>
            </div>
          </div>
          <div class="btn-submit" @click="onSubmit">提交</div>
        </div>
      </van-tab>
      <van-tab title="我的咨询投诉">
        <ul>
          <li
            v-for="item in complainList"
            :key="item.id"
            @click="routeDetail(item.suggestionId)"
          >
            <div class="title flex">
              <span class="time">{{ item.createTime }}</span>
              <span :class="item.status | statusClass">
                {{ item.status | statusName }}
              </span>
            </div>
            <div class="tag">
              [{{ item.suggestionType | tagFilter }}] {{ item.title }}
            </div>
            <div class="content">{{ item.suggestionContent }}</div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
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
      activeTab: '0',
      title: '',
      content: '',
      suggestionImgs: '',
      complainList: [],
      suggestionType: 1,
      err: {
        title: '',
        content: '',
      },
    }
  },
  created() {
    this.fetchComplain({})
  },
  methods: {
    fetchComplain({ pageIndex = 1, pageSize = 10 }) {
      this.$http
        .get('/api-media/suggestion/mySuggestionPage', {
          params: {
            pageIndex,
            pageSize,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.complainList = data.datas.data
          }
        })
    },
    routeDetail(item) {
      this.$router.push(`/my/complain-detail/${item}`)
    },

    onTitleChanged(value) {
      if (value.length > 15) {
        this.title = value.slice(0, 15)
        this.err.title = '标题不超过15个字符'
        return
      }
    },
    onContentChanged(value) {
      if (value.length > 200) {
        this.content = value.slice(0, 200)
        this.err.content = '内容不超过200个字符'
        return
      }
    },

    onRadioChanged(name) {
      this.suggestionType = name
    },

    // 提交保存
    onSubmit() {
      this.$http
        .post('/api-media/suggestion/handleSuggestion', {
          title: this.title,
          suggestionContent: this.content,
          suggestionImgs: this.suggestionImgs,
          suggestionType: this.suggestionType,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            alert('保存成功')
            this.activeTab = '1'
            this.fetchComplain({})
          } else {
            alert(data.resp_msg)
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

        &:not(:first-child) {
          margin-top: 20px;
        }
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
