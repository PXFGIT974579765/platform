<template>
  <div
    class="page-my-distribution-condition"
    v-wechat-title="$route.meta.title"
  >
    <div class="school area">
      <div class="title">请选择校区</div>
      <div class="school-bar flex">
        <span>{{ condition.curSchool }}</span>
        <span class="btn-select-school" @click="showSchoolList">选择</span>
      </div>
    </div>
    <div class="time area">
      <div class="title">设置接单时间</div>
      <div class="time-bar flex">
        <div class="item">
          <van-datetime-picker
            v-model="condition.curFromTime"
            type="time"
            :formatter="timeFormat"
            :show-toolbar="false"
            :visible-item-coun="3"
          />
        </div>
        <span>~</span>
        <div class="item">
          <van-datetime-picker
            v-model="condition.curToTime"
            type="time"
            :formatter="timeFormat"
            :show-toolbar="false"
          />
        </div>
      </div>
    </div>
    <div class="target area">
      <div class="title">选择配送对象</div>
      <van-radio-group v-model="condition.curTarget" class="group flex">
        <van-radio name="0" checked-color="#07c160" class="radio"
          >只送男</van-radio
        >
        <van-radio name="1" checked-color="#07c160" class="radio"
          >只送女</van-radio
        >
        <van-radio name="-1" checked-color="#07c160" class="radio"
          >不限</van-radio
        >
      </van-radio-group>
    </div>

    <div class="btn-submit">开始接单</div>

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
          :key="school.id"
          :class="[condition.curSchool === school.name && 'light']"
          @click="onSchoolSelected(school.name)"
        >
          {{ school.name }}
        </li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      condition: {
        curSchool: '贵州师范大学花溪校区',
        schools: [
          {
            name: '贵州师范大学花溪校区',
            id: '1233',
          },
          {
            name: '贵州财经大学花溪校区',
            id: '12334',
          },
          {
            name: '贵州轻工业职业技术学院',
            id: '12335',
          },
        ],
        curFromTime: '12:30',
        curToTime: '13:30',
        curTarget: '-1', // -1 不限   0 男  1 女
      },
    }
  },
  methods: {
    onLoad() {},
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
    onSchoolSelected(school) {
      this.condition.curSchool = school
      this.show = false
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-distribution-condition {
  padding: 5px 15px;
  display: flow-root;

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
