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
          error-message-align="right"
          :error-message="err.phone"
          @input="onPhoneHandler"
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
          error-message-align="right"
          :error-message="err.email"
          @input="onEmailHandler"
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
        title="学院"
        class="cell"
        :value="user.department"
        is-link
        @click="selectDepartment"
      />

      <van-cell title="专业" class="cell" value="计算机相关专业" is-link>
        <van-field
          v-model="user.majors"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入专业"
        />
      </van-cell>

      <van-cell title="班级" class="cell" value="18级2班" is-link>
        <van-field
          v-model="user.clas"
          class="input"
          clearable
          input-align="right"
          placeholder="请输入班级"
        />
      </van-cell>

      <van-cell
        title="入学时间"
        class="cell"
        :value="`${user.admission || admission}年`"
        is-link
        @click="selectAdmission"
      ></van-cell>

      <van-cell title="身份认证" class="cell" is-link>
        <span v-if="user.isReviewed" class="is-authed">
          <span class="iconfont">&#xe75e;</span>已认证
        </span>
        <span v-else-if="user.cardImg">证件审核中</span>
        <span v-else @click="routeStudentCard">请上传学生证</span>
      </van-cell>
    </van-cell-group>

    <div class="footer">
      <div class="btn-submit" @click="onSubmit">提交</div>
    </div>

    <!-- 学校弹框 -->
    <van-action-sheet
      v-model="showSchool"
      title="请选择学校"
      @closed="closeSchool"
    >
      <div class="selection">
        <p
          :class="['item', user.school === item.schoolName && 'light']"
          v-for="item in school"
          :key="item.shoolName"
          @click="onSchoolItemSelect(item.schoolName)"
        >
          {{ item.schoolName }}
        </p>
      </div>
    </van-action-sheet>

    <!-- 学院弹框 -->
    <van-action-sheet
      v-model="showDepartment"
      title="请选择学院"
      @closed="closeDepartment"
    >
      <div class="selection">
        <p
          :class="['item', user.department === item.departmentName && 'light']"
          v-for="item in departmentList"
          :key="item.departmentName"
          @click="onDepartmentItemSelect(item.departmentName)"
        >
          {{ item.departmentName }}
        </p>
      </div>
    </van-action-sheet>

    <!-- 入学时间弹窗 -->
    <van-action-sheet
      v-model="showAdmission"
      title="请选择入学时间"
      @closed="closeAdmission"
    >
      <van-datetime-picker
        v-model="currentDate"
        :show-toolbar="false"
        type="year-month"
        @change="onAdmissionChange"
      />
    </van-action-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { curDate } from '@/lib/format'

const ERR = {
  EMAIL: '邮箱格式错误',
  PHONE: '手机格式错误',
}
export default {
  computed: mapGetters(['user']),

  data() {
    return {
      showSchool: false,
      showDepartment: false,
      showAdmission: false,
      admission: curDate('yyyy'),
      school: [],
      departmentList: [],
      currentDate: new Date(),
      err: {
        phone: '',
        email: '',
      },
    }
  },
  created() {},
  methods: {
    ...mapActions(['setUser']),

    // 学校选择
    selectSchool() {
      this.fetchSchool()
      this.showSchool = true
    },
    closeSchool() {
      this.showSchool = false
    },
    onSchoolItemSelect(value) {
      this.user.school = value
      this.showSchool = false
    },

    // 时间选择
    selectAdmission() {
      this.showAdmission = true
    },
    closeAdmission() {
      this.showAdmission = false
    },
    onAdmissionChange(picker) {
      const values = picker.getValues()
      const year = `${values[0]}`
      this.admission = year
    },

    // 学院选择
    selectDepartment() {
      const school = this.school.find(
        item => item.schoolName === this.user.school
      )
      const schoolId = school && school.schoolId
      this.fetchDepartmentList(schoolId)
      this.showDepartment = true
    },
    closeDepartment() {
      this.showDepartment = false
    },
    onDepartmentItemSelect(value) {
      this.user.department = value
      this.showDepartment = false
    },

    // 学生证路由
    routeStudentCard() {
      this.$router.push('/my/student-card')
    },

    // 邮箱校验
    onEmailHandler(value) {
      if (value !== '') {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)) {
          this.err.email = ERR.EMAIL
        } else {
          this.err.email = ''
        }
      }
    },

    // 电话校验
    onPhoneHandler(value) {
      if (value !== '') {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(value)) {
          this.err.phone = ERR.PHONE
        } else {
          this.err.phone = ''
        }
      }
    },

    // 请求学校数据
    fetchSchool() {
      this.$http.get('/api-wxmp/cxxz/school/findSchools').then(({ data }) => {
        if (data.resp_code === 0) {
          this.school = data.datas
        } else if (data.resp_msg) {
          this.$toast.fail(data.resp_msg)
        } else {
          this.$toast.fail('系统繁忙')
        }
      })
    },

    // 请求学院数据
    fetchDepartmentList(schoolId) {
      this.$http
        .get('/api-wxmp/cxxz/school/findDepartments', {
          params: {
            universityId: schoolId,
          },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.departmentList = data.datas
          } else if (data.resp_msg) {
            this.$toast.fail(data.resp_msg)
          } else {
            this.$toast.fail('系统繁忙')
          }
        })
    },

    // 提交修改
    onSubmit() {
      if (this.err.phone || this.err.email) {
        return
      }
      if (!this.user.name) {
        this.$toast.fail('姓名不能为空')
        return
      }
      if (!this.user.phone) {
        this.$toast.fail('电话不能为空')
        return
      }
      if (!this.user.email) {
        this.$toast.fail('邮箱不能为空')
        return
      }
      if (!this.user.school) {
        this.$toast.fail('学校不能为空')
        return
      }
      if (!this.user.department) {
        this.$toast.fail('学院不能为空')
        return
      }
      if (!this.admission) {
        this.$toast.fail('入学时间不能为空')
        return
      }
      if (!this.user.majors) {
        this.$toast.fail('专业不能为空')
        return
      }
      if (!this.user.clas) {
        this.$toast.fail('班级不能为空')
        return
      }
      if (!this.user.cardImg) {
        this.$toast.fail('请上传证件')
        return
      }
      this.$http
        .post('/api-wxmp/cxxz/registerUser/registerUserInfo', {
          ...this.user,
          admission: this.admission,
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.$toast.success('保存成功')
            this.setUser(this.user)
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
