<template>
  <div class="comp-appreaise-dialog">
    <van-dialog
      v-model="showDialog"
      class="dialog"
      closeOnPopstate
      closeOnClickOverlay
      :beforeClose="onCancel"
      :showConfirmButton="false"
    >
      <div class="header flex">
        <img :src="info.headImgUrl" alt />
        <div class="text flex-col">
          <div>{{ info.nickName }}</div>
          <span>{{ info.createTime.slice(0, 10) }}</span>
        </div>
      </div>
      <div class="middle">
        <div>对您的服务进行了评价</div>
        <van-rate class="rate" v-model="rate" size="35" />
        <div class="rate-desc">{{ info.rates | rateFilter }}</div>
      </div>

      <div class="tag-area flex">
        <div class="tag-item">
          <div
            v-for="item in index0()"
            :key="item"
            :class="['tag', tagInclude(item) && 'light']"
          >
            {{ item }}
          </div>
        </div>
        <div class="tag-item">
          <div
            v-for="item in index1()"
            :key="item"
            :class="['tag', tagInclude(item) && 'light']"
          >
            {{ item }}
          </div>
        </div>
        <div class="tag-item">
          <div
            v-for="item in index2()"
            :key="item"
            :class="['tag', tagInclude(item) && 'light']"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

const RATE_STATUS = {
  1: '不满意',
  2: '一般',
  3: '比较满意',
  4: '满意',
  5: '非常满意',
}
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: function() {
        return {
          id: '',
          nickName: '',
          headImgUrl: '',
          commContent: '',
          rates: 4.5,
          userId: '',
          createTime: '',
        }
      },
    },
  },
  data() {
    return {
      message: '',
      rate: 5,
      rateList: [
        '服务态度好',
        '配送及时',
        '外貌整洁',
        '说话文明',
        '服务态度好1',
        '服务态度好2',
      ],
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    tagInclude(value) {
      return this.info.commContent.includes(value)
    },
    index0() {
      return this.rateList.filter((item, index) => index % 3 === 0)
    },
    index1() {
      return this.rateList.filter((item, index) => index % 3 === 1)
    },
    index2() {
      return this.rateList.filter((item, index) => index % 3 === 2)
    },
  },
  filters: {
    dateFormat: function(value) {
      return dateTime(value, 'YYYY-MM-DD')
    },
    rateFilter: function(value) {
      return RATE_STATUS[Math.floor(value)]
    },
  },
}
</script>

<style lang="less" scoped>
.comp-appreaise-dialog {
  .dialog {
    padding: 33px 21px;

    .header {
      align-items: center;

      img {
        width: 55px;
        height: 55px;
      }

      .text {
        margin-left: 15px;
        font-size: 18px;
        font-weight: bold;
        color: #585858;

        span {
          margin-top: 10px;
          font-size: 14px;
          color: #9d9d9d;
        }
      }
    }

    .middle {
      margin-top: 39px;
      text-align: center;

      .rate {
        margin-top: 23px;
      }
      .rate-desc {
        margin-top: 23px;
        font-size: 16px;
        color: #ffad43;
      }
    }

    .tag-area {
      margin-top: 37px;
      justify-content: space-between;

      .tag-item {
        .tag {
          margin-top: 13px;
          padding: 11px 5px;
          text-align: center;
          border: 1px solid #757575;
          border-radius: 4px;
          font-size: 14px;
          color: #757575;
        }

        .light {
          color: #07c2af !important;
          border: 1px solid #07c2af !important;
        }
      }
    }
  }
}
</style>
