<template>
  <div class="page-my-base-info" v-wechat-title="$route.meta.title">
    <van-cell-group class="cell-group">
      <van-cell title="头像" class="cell" value-class="right-20">
        <div class="avatar-box">
          <img src="~@/assets/images/avatar.png" alt class="avatar" />
        </div>
      </van-cell>
      <van-cell
        title="昵称"
        class="cell"
        value="小刘哥"
        value-class="right-20"
      />
      <van-cell title="姓名" class="cell" value="刘国贵" is-link>
        <van-field
          v-model="baseInfo.name"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入姓名"
        />
      </van-cell>
      <van-cell title="性别" class="cell" value="男" is-link />
      <van-cell title="手机号码" class="cell" value="199****1144" is-link>
        <van-field
          v-model="baseInfo.phone"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入手机号"
        />
      </van-cell>
      <van-cell title="电子邮箱" class="cell" value="540***202@qq.com" is-link>
        <van-field
          v-model="baseInfo.email"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入手机号"
        />
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell
        title="学校"
        class="cell"
        value="贵州师范大学"
        is-link
        @click.prevent="selectSchool"
      >
        <van-action-sheet
          v-show="showSchool"
          title="请选择学校"
          @closed="closeSchool"
        >
          <p v-for="item in school" :key="item.text">{{ item.text }}</p>
        </van-action-sheet>
      </van-cell>
      <van-cell title="专业" class="cell" value="计算机科学与技术" is-link />
      <van-cell title="班级" class="cell" value="18级2班" is-link />
    </van-cell-group>

    <div class="footer">
      <div class="btn-submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSchool: false,
      baseInfo: {
        name: '刘小刘',
        phone: '13985321425',
        email: '9745944@qq.com',
        school: '贵州师范大学',
        majors: '计算机科学与技术',
        clas: '计算机2班',
      },
      school: [
        { text: '贵州师范大学', value: 0 },
        { text: '贵州财经大学', value: 1 },
        { text: '贵州农业学院', value: 2 },
      ],
    }
  },
  methods: {
    selectSchool() {
      this.showSchool = true
    },
    closeSchool() {
      this.showSchool = false
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-base-info {
  .cell-group {
    &:not(:first-child) {
      margin-top: 15px;
    }

    .right-20 {
      margin-right: 20px;
    }

    .input {
      padding: 0;
      color: #969799;
      text-align: right;
    }

    .cell {
      height: 55px;
      line-height: 55px;
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;
    margin-bottom: 0;
    padding: 20px 15px 60px;
    background-color: #fff;

    .btn-submit {
      height: 40px;
      line-height: 40px;
      border-radius: 3px;
      background-color: #07c2af;
      color: #fff;
      text-align: center;
    }
  }

  .avatar-box {
    display: flex;
    justify-content: flex-end;

    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 100%;
    }
  }
}
</style>
