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
            <div class="flex">
              <img v-for="(img, index) in imgs" :key="index" :src="img" alt />
              <div class="camera" @click="onCameraClick">
                <span class="iconfont">&#xe761;</span>
                <input
                  style="float: left;  display: none;"
                  type="file"
                  id="uploadFile"
                  accept="image/*"
                  v-on:change="readLocalFile()"
                />
              </div>
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
              <span :class="item.status | statusClass">{{
                item.status | statusName
              }}</span>
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
import httpUpload from '@/lib/httpUpload'
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
      complainList: [],
      suggestionType: 1,
      err: {
        title: '',
        content: '',
      },
      imgs: [],
    }
  },
  created() {
    this.fetchComplain({})
  },
  methods: {
    // 拉去咨询建议信息
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

    // 调起相机或相册
    onCameraClick() {
      document.getElementById('uploadFile').click()
    },

    // 路由转发
    routeDetail(item) {
      this.$router.push(`/my/complain-detail/${item}`)
    },

    //点击选中图片
    readLocalFile: function() {
      const localFile = document.getElementById('uploadFile').files[0]

      // 展示图片
      this.renderImage(localFile)

      // 上传图片
      this.uploadImage(localFile)
    },

    // 读取base64展现图片
    renderImage(localFile) {
      let reader = new FileReader()
      reader.onload = function() {
        //获取图片base64代码
      }
      reader.onerror = function() {
        this.$toast.success('图片上传失败')
      }
      reader.readAsDataURL(localFile, 'UTF-8')
    },
    // 上传图片
    uploadImage(localFile) {
      let param = new FormData()
      param.append('file', localFile)
      httpUpload.post('/api-file/foreign/files', param).then(({ data }) => {
        if (data.resp_code == 0) {
          this.imgs.push(data.datas)
        } else {
          this.$toast.success('上传图片失败')
        }
      })
    },

    // 监听title字数变化
    onTitleChanged(value) {
      if (value.length > 15) {
        this.title = value.slice(0, 15)
        this.err.title = '标题不超过15个字符'
        return
      }
    },

    // 监听内容字数变化
    onContentChanged(value) {
      if (value.length > 200) {
        this.content = value.slice(0, 200)
        this.err.content = '内容不超过200个字符'
        return
      }
    },

    // 监听radio变化 咨询 投诉
    onRadioChanged(name) {
      this.suggestionType = name
    },

    // 提交保存
    onSubmit() {
      this.$http
        .post('/api-media/suggestion/handleSuggestion', {
          title: this.title,
          suggestionContent: this.content,
          suggestionType: this.suggestionType,
          suggestionImgs: this.imgs.join('@'),
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.$toast.success('保存成功')
            this.activeTab = '1'
            this.fetchComplain({})
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
.page-my-complain {
  padding: 0;

  img {
    display: inline-block;
    margin-top: 15px;
    margin-right: 20px;
    width: 70px;
    height: 55px;
  }

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
