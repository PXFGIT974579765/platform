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

      <van-cell title="姓名" class="cell" is-link>
        <van-field
          v-model="baseInfo.name"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入姓名"
        />
      </van-cell>

      <van-cell title="性别" class="cell">
        <van-radio-group v-model="baseInfo.gender" class="group flex">
          <van-radio :name="1" checked-color="#07c160" class="radio"
            >男</van-radio
          >
          <van-radio :name="0" checked-color="#07c160" class="radio"
            >女</van-radio
          >
        </van-radio-group>
      </van-cell>

      <van-cell title="手机号码" class="cell" is-link>
        <van-field
          v-model="baseInfo.phone"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入手机号"
        />
      </van-cell>

      <van-cell title="电子邮箱" class="cell" is-link>
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
        :value="baseInfo.school"
        is-link
        @click="selectSchool"
      />

      <van-cell
        title="专业"
        class="cell"
        :value="baseInfo.majors"
        is-link
        @click="selectMajors"
      />

      <van-cell title="班级" class="cell" value="18级2班" is-link>
        <van-field
          v-model="baseInfo.clas"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入班级"
        />
      </van-cell>

      <van-cell title="身份认证" class="cell" is-link>
        <span v-if="baseInfo.isAuthed">请上传学生证</span>
        <span v-else class="is-authed" @click="routeStudentCard">
          <span class="iconfont">&#xe75e;</span>已认证</span
        >
      </van-cell>
    </van-cell-group>

    <div class="footer">
      <div class="btn-submit">提交</div>
    </div>

    <!-- 弹框部分 -->
    <van-action-sheet
      v-model="showSchool"
      title="请选择学校"
      @closed="closeSchool"
    >
      <div class="selection">
        <p
          :class="['item', baseInfo.school === item.shoolName && 'light']"
          v-for="item in school"
          :key="item.shoolName"
          @click="onSchoolItemSelect(item.shoolName)"
        >
          {{ item.shoolName }}
        </p>
      </div>
    </van-action-sheet>

    <van-action-sheet
      v-model="showMajors"
      title="请选择学院"
      @closed="closeMajors"
    >
      <div class="selection">
        <p
          :class="['item', baseInfo.majors === item.departmentName && 'light']"
          v-for="item in majorsList"
          :key="item.departmentName"
          @click="onMajorsItemSelect(item.departmentName)"
        >
          {{ item.departmentName }}
        </p>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSchool: false,
      showMajors: false,
      baseInfo: {
        name: '刘小刘',
        gender: 1,
        phone: '13985321425',
        email: '9745944@qq.com',
        school: '贵州大学',
        majors: '大数据学院',
        clas: '计算机2班',
        isAuthed: 0,
      },
      school: [
        {
          shoolId: '1150671849489022976',
          shoolName: '贵州大学',
        },
        {
          shoolId: '1150696830930464768',
          shoolName: '贵州医科大学',
        },
        {
          shoolId: '1151872414680543232',
          shoolName: '贵州民族大学',
        },
      ],
      majorsList: [
        {
          departmentName: '大数据学院',
          departId: '1156377442775064576',
        },
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
    selectMajors() {
      this.showMajors = true
    },
    closeMajors() {
      this.showMajors = false
    },
    onSchoolItemSelect(value) {
      this.baseInfo.school = value
      this.showSchool = false
    },
    onMajorsItemSelect(value) {
      this.baseInfo.majors = value
      this.showMajors = false
    },
    routeStudentCard() {
      this.$router.push('/my/student-card')
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

  .group {
    margin-right: 20px;
    align-items: center;
    justify-content: space-between;
    background: #fff;

    .radio {
      &:first-child {
        margin-right: 30px;
      }
    }
  }

  .is-authed {
    color: #06a505;

    span {
      &:first-child {
        margin-right: 10px;
      }
    }
  }

  .selection {
    max-height: 400px;
    overflow-y: scroll;

    .item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px dashed #eee;
    }

    .light {
      color: #07c2af;
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
