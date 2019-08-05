<template>
  <div class="page-student-card">
    <div class="img-area" @click="showDailog">
      <div v-if="imgs.length == 0" class="white flex-col">
        <span class="iconfont">&#xe754;</span>
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
    <div class="btn-submit">提交认证</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [],
    }
  },
  created() {},
  methods: {
    // 手动触发图片输入框
    showDailog() {
      document.getElementById('uploadFile').click()
    },
    //点击选中图片
    readLocalFile: function() {
      const localFile = document.getElementById('uploadFile').files[0]

      let reader = new FileReader()
      let content
      let _self = this
      reader.onload = function(event) {
        content = event.target.result
        console.log(content)
        //获取图片base64代码
        _self.imgs.push(content)
      }
      reader.onerror = function() {
        alert('图片上传失败')
      }
      content = reader.readAsDataURL(localFile, 'UTF-8')
      var sss = document.getElementById('uploadFile').value
      console.log(sss)
    },
  },
}
</script>

<style lang="less" scoped>
.page-student-card {
  padding: 28px 15px;

  .img-area {
    width: 100%;
    height: 190px;
    background-color: #fff;

    .white {
      height: 100%;
      justify-content: center;
      align-items: center;

      .iconfont {
        color: #dedede;
      }

      .message {
        margin-top: 22px;
        font-size: 15px;
        color: #6b6b6b;
      }
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
