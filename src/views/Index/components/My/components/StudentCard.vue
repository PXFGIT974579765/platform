<template>
  <div class="page-student-card">
    <div class="img-area" @click="showDailog">
      <div v-show="status == 0" class="status success flex-col">
        <span class="iconfont">&#xe77d;</span>
        <span class="message">上传成功</span>
      </div>
      <div v-show="status == 1" class="status fail flex-col">
        <span class="iconfont">&#xe77f;</span>
        <span class="message">上传失败,请重新上传</span>
      </div>
      <div v-if="imgs.length == 0" class="white flex-col">
        <span class="iconfont">&#xe77e;</span>
        <span class="message">上传证件</span>
      </div>
      <div v-else class="imgs">
        <img v-for="(img, index) in imgs" :key="index" :src="img" alt />
      </div>
      <input
        style="float: left;  display: none;"
        type="file"
        id="uploadFile"
        accept="image/*"
        v-on:change="readLocalFile()"
      />
    </div>
    <div class="btn-submit" @click="onSubmit">{{ btnName }}</div>
  </div>
</template>

<script>
import httpUpload from '@/lib/httpUpload'

import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      imgs: [],
      resultUrl: '',
      btnName: '提交认证',
      status: -1, // -1 无状态 0 成功 1 失败
    }
  },
  created() {
    if (this.user.cardImg) {
      this.imgs.push(this.user.cardImg)
    }
  },
  methods: {
    ...mapActions(['setUser']),

    // 手动触发图片输入框
    showDailog() {
      document.getElementById('uploadFile').click()
    },
    //点击选中图片
    readLocalFile: function() {
      this.status = -1
      const localFile = document.getElementById('uploadFile').files[0] || ''

      if (!localFile) {
        return
      }

      const fileSize = localFile.size / 1024 / 1024

      if (fileSize > 10) {
        this.$toast.fail('图片大小不能超过 10MB!')
        return
      }

      // 展示图片
      this.renderImage(localFile)

      // 上传图片
      this.uploadImage(localFile)
    },

    // 读取base64展现图片
    renderImage(localFile) {
      let reader = new FileReader()
      reader.onload = event => {
        //获取图片base64代码
        this.imgs = []
        this.imgs.push(event.target.result)
      }
      reader.onerror = () => {
        this.$toast.fail('图片上传失败，请重新选择上传')
      }
      reader.readAsDataURL(localFile, 'UTF-8')
    },
    // 上传图片
    uploadImage(localFile) {
      this.btnName = '图片上传中'
      let param = new FormData()
      param.append('file', localFile)
      httpUpload.post('/api-file/foreign/files', param).then(({ data }) => {
        if (data.resp_code == 0) {
          this.resultUrl = data.datas
          this.status = 0
          this.btnName = '提交认证'
        } else if (data.resp_msg) {
          this.$toast.fail(data.resp_msg)
          this.status = 1
          this.btnName = '上传失败'
        } else {
          this.status = 1
          this.btnName = '上传失败'
        }
      })
    },

    // 提交保存
    onSubmit() {
      if (this.status == 1) {
        this.$toast.fail('图片上传失败，请重新选择上传')
        return
      }
      if (this.status == -1) {
        this.$toast.fail('你未选择任何图片')
        return
      }
      this.$http
        .post('/api-wxmp/cxxz/registerUser/registerUserInfo', {
          ...this.user,
          cardImg: this.resultUrl,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.status = -1
            this.user.cardImg = this.resultUrl
            this.setUser(this.user)
            this.$toast.success('信息保存成功')
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
.page-student-card {
  padding: 28px 15px;

  .img-area {
    position: relative;
    width: 100%;
    height: 190px;
    background-color: #fff;

    .white {
      height: 100%;
      justify-content: center;
      align-items: center;
      color: #6b6b6b;
    }

    .iconfont {
      font-size: 30px;
    }

    .message {
      margin-top: 22px;
      font-size: 15px;
    }

    .status {
      position: absolute;
      width: 100%;
      height: 100%;
      letter-spacing: 2px;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .fail {
      color: #ff5050;
    }

    .success {
      color: #06c0b5;
    }

    .imgs {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .dialog {
    font-size: 15px;

    .ul {
      .li {
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-top: 1px solid #eee;
      }
    }
  }

  .btn-submit {
    margin-top: 38px;
    height: 47px;
    line-height: 47px;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
    background-color: #06c0b5;
    color: #fff;
  }
}
</style>
