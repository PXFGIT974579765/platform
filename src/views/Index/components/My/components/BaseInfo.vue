<template>
  <div class="page-my-base-info" v-wechat-title="$route.meta.title">
    <van-cell-group class="cell-group">
      <van-cell title="头像" class="cell" value-class="right-20">
        <div class="avatar-box">
          <img :src="user.headImgUrl" alt class="avatar" />
        </div>
      </van-cell>

      <van-cell
        title="昵称"
        class="cell"
        :value="user.nicknameStr"
        value-class="right-20"
      />

      <van-cell title="姓名" class="cell" is-link>
        <van-field
          v-model="user.name"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入姓名"
        />
      </van-cell>

      <van-cell title="性别" class="cell">
        <van-radio-group v-model="user.gender" class="group flex">
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
          v-model="user.phone"
          class="input"
          clearable
          type="tel"
          input-align="right"
          placeholder="请输入手机号"
        />
      </van-cell>

      <van-cell title="电子邮箱" class="cell" is-link>
        <van-field
          v-model="user.email"
          class="input"
          clearable
          type="email"
          input-align="right"
          placeholder="请输入电子邮箱"
        />
      </van-cell>
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell
        title="学校"
        class="cell"
        :value="user.school"
        is-link
        @click="selectSchool"
      />

      <van-cell
        title="专业"
        class="cell"
        :value="user.majors"
        is-link
        @click="selectMajors"
      />

      <van-cell title="班级" class="cell" value="18级2班" is-link>
        <van-field
          v-model="user.clas"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入班级"
        />
      </van-cell>

      <van-cell title="身份认证" class="cell" is-link>
        <span v-if="user.isReviewed">请上传学生证</span>
        <span v-else class="is-authed" @click="routeStudentCard">
          <span class="iconfont">&#xe75e;</span>已认证
        </span>
      </van-cell>
    </van-cell-group>

    <div class="footer">
      <div class="btn-submit" @click="onSubmit">提交</div>
    </div>

    <!-- 弹框部分 -->
    <van-action-sheet
      v-model="showSchool"
      title="请选择学校"
      @closed="closeSchool"
    >
      <div class="selection">
        <p
          :class="['item', user.school === item.shoolName && 'light']"
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
          :class="['item', user.majors === item.departmentName && 'light']"
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
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      showSchool: false,
      showMajors: false,
      school: [],
      majorsList: [],
    }
  },
  created() {},
  methods: {
    fetchSchool() {
      this.$http.get('/api-wxmp/cxxz/school/findSchools').then(({ data }) => {
        if (data.resp_code === 0) {
          this.school = data.datas
        }
      })
    },
    fetchMajorsList(schoolId) {
      this.$http
        .get('/api-wxmp/cxxz/school/findDepartments', {
          params: {
            universityId: schoolId,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.school = data.datas
          }
        })
    },
    selectSchool() {
      this.fetchSchool()
      this.showSchool = true
    },
    closeSchool() {
      this.showSchool = false
    },
    selectMajors() {
      const schoolId = this.school.find(
        item => item.schoolName === this.user.school
      ).schoolId
      this.fetchMajorsList(schoolId)
      this.showMajors = true
    },
    closeMajors() {
      this.showMajors = false
    },
    onSchoolItemSelect(value) {
      this.user.school = value
      this.showSchool = false
    },
    onMajorsItemSelect(value) {
      this.user.majors = value
      this.showMajors = false
    },
    routeStudentCard() {
      this.$router.push('/my/student-card')
    },
    onSubmit() {},
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
