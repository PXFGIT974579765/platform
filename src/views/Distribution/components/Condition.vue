<template>
  <div
    class="page-my-distribution-condition"
    v-wechat-title="$route.meta.title"
  >
    <div class="school area">
      <div class="title">请选择校区</div>
      <div class="school-bar flex">
        <span>{{ schoolFilter(condition.schoolId) }}</span>
        <span class="btn-select-school" @click="showSchoolList">选择</span>
      </div>
    </div>
    <div class="time area">
      <div class="title">设置接单时间</div>
      <div class="time-bar flex">
        <div class="item">
          <van-datetime-picker
            v-model="condition.startTimeDefault"
            type="time"
            :formatter="timeFormat"
            :show-toolbar="false"
            :visible-item-coun="3"
            @change="onStartTimeChange"
          />
        </div>
        <span>~</span>
        <div class="item">
          <van-datetime-picker
            v-model="condition.endTimeDefault"
            type="time"
            :formatter="timeFormat"
            :show-toolbar="false"
            @change="onEndTimeChange"
          />
        </div>
      </div>
    </div>
    <div class="target area">
      <div class="title">选择配送对象</div>
      <van-radio-group v-model="condition.aims" class="group flex">
        <van-radio :name="0" checked-color="#07c160" class="radio"
          >只送男</van-radio
        >
        <van-radio :name="1" checked-color="#07c160" class="radio"
          >只送女</van-radio
        >
        <van-radio :name="2" checked-color="#07c160" class="radio"
          >不限</van-radio
        >
      </van-radio-group>
    </div>

    <div class="btn-submit" @click="onSubmit">开始接单</div>

    <van-dialog
      v-model="show"
      title="校区选择"
      class="dialog"
      closeOnPopstate
      closeOnClickOverlay
      :beforeClose="onCancel"
      :showConfirmButton="false"
    >
      <ul>
        <li
          v-for="school in condition.schools"
          :key="school.schoolId"
          :class="[condition.schoolId === school.schoolId && 'light']"
          @click="onSchoolSelected(school.schoolId)"
        >
          {{ school.schoolName }}
        </li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
import { curDate } from '@/lib/format'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['user']),
  data() {
    return {
      show: false,
      condition: {
        schoolId: '',
        schools: [],
        startTime: '12:30',
        endTime: '13:30',
        startTimeDefault: '12:30',
        endTimeDefault: '13:30',
        aims: 2, // 接单对象 0 男生 1 女生 2 不限
      },
    }
  },
  created() {
    this.fetchSchool()
  },
  methods: {
    ...mapActions(['setUser']),
    fetchSchool() {
      this.$http.get('/api-wxmp/cxxz/school/findSchools').then(({ data }) => {
        if (data.resp_code === 0) {
          this.condition.schools = data.datas
          this.condition.schoolId = data.datas[0].schoolId
        }
      })
    },
    timeFormat(type, value) {
      if (type === 'hour') {
        value = `<span>${value} <span style="margin-left:12px">:</span></span>`
      }
      return value
    },
    onCancel() {
      this.show = false
    },
    showSchoolList() {
      this.show = true
    },
    onSchoolSelected(schoolId) {
      this.condition.schoolId = schoolId
      this.show = false
    },
    onStartTimeChange(picker) {
      const values = picker.getValues()
      const startTime = `${curDate()} ${values[0].slice(6, 8)}:${values[1]}:00`
      this.condition.startTime = startTime
    },
    onEndTimeChange(picker) {
      const values = picker.getValues()
      const endTime = `${curDate()} ${values[0].slice(6, 8)}:${values[1]}:00`
      this.condition.endTime = endTime
    },
    schoolFilter(schoolId) {
      const school = this.condition.schools.find(
        item => item.schoolId == schoolId
      )
      return school && school.schoolName
    },

    // 开始接单
    onSubmit() {
      const { startTime, endTime } = this.condition
      if (startTime.length != 19) {
        this.condition.startTime = `${curDate()} ${startTime}:00`
      }
      if (endTime.length != 19) {
        this.condition.endTime = `${curDate()} ${endTime}:00`
      }
      const school = this.condition.schools.find(
        item => item.schoolId == this.condition.schoolId
      )
      this.$http
        .post('/api-wxmp/cxxz/distriButtion/receivingOrder', {
          userId: this.user.userId,
          address: school.schoolName || '',
          schoolId: this.condition.schoolId,
          startTime: this.condition.startTime,
          endTime: this.condition.endTime,
          aims: this.condition.aims,
        })
        .then(({ data }) => {
          if (data.resp_code == 0) {
            this.setUser(data.datas.user)
            this.$router.push('/my/distribution')
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
.page-my-distribution-condition {
  padding: 5px 15px;

  .title {
    font-size: 15px;
    font-weight: bold;
  }
  .area {
    margin-top: 9px;
    padding: 13px 13px 25px;
    background-color: #fff;
  }
  .school {
    .school-bar {
      margin-top: 23px;
      justify-content: space-between;

      span {
        font-size: 14px;

        &:last-child {
          color: #07c2af;
        }
      }
    }
  }
  .time {
    .time-bar {
      margin-top: 30px;
      height: 100px;
      overflow: hidden;
      justify-content: space-around;
      align-items: center;

      .item {
        width: 100px;
      }
    }
  }

  .target {
    .group {
      margin: 37px 0;
      height: 50px;
      align-items: center;
      background: #fff;

      .radio:not(:first-child) {
        margin-left: 45px;
      }
    }
  }

  .btn-submit {
    margin-top: 40px;
    height: 45px;
    line-height: 45px;
    border-radius: 3px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 15px;
    color: #fff;
    background-color: #07c2af;
  }

  .dialog {
    height: 350px;
    font-size: 15px;

    .light {
      color: #07c2af;
    }
    ul {
      padding: 16px;

      li {
        height: 45px;
        line-height: 45px;
        text-align: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
