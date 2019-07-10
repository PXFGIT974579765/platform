<template>
  <div class="page-my-score">
    <div class="page-header">
      <div class="score-box flex-col">
        <span>1500</span>
        <span>可用积分</span>
      </div>
      <span class="btn_exchange">去兑换礼品</span>
    </div>
    <div class="page-list">
      <div class="title">
        <span>积分明细</span>
        <span>积分规则</span>
      </div>
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <div>
            <div class="name">{{ item.name }}</div>
            <div class="time">{{ item.time | formatDate }}</div>
          </div>
          <div>
            <div
              :class="[item.status === 0 ? 'score-in' : 'score-out', 'score']"
            >
              {{ item.status === 0 ? `+${item.score}` : `-${item.score}` }}
            </div>
            <div class="status">{{ item.status === 0 ? '收入' : '支出' }}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { dateTime } from '@/lib/format'

export default {
  data() {
    return {
      list: [
        {
          name: '每日签到',
          time: 1500034995950,
          score: 10,
          status: 0, // 0 收入  1 支出
        },
        {
          name: '礼品兑换',
          time: 1500034995950,
          score: 10,
          status: 1, // 0 收入  1 支出
        },
        {
          name: '每日签到',
          time: 1500034995950,
          score: 10,
          status: 0, // 0 收入  1 支出
        },
        {
          name: '每日签到',
          time: 1500034995950,
          score: 10,
          status: 0, // 0 收入  1 支出
        },
        {
          name: '每日签到',
          time: 1500034995950,
          score: 10,
          status: 0, // 0 收入  1 支出
        },
        {
          name: '每日签到',
          time: 1500034995950,
          score: 10,
          status: 0, // 0 收入  1 支出
        },
      ],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
    },
  },
  filters: {
    formatDate: function(value) {
      return dateTime(value)
    },
  },
}
</script>

<style lang="less" scoped>
.page-my-score {
  background-color: #fff;

  .page-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    background-image: url('./images/bg_score.png');
    background-size: 100% 100%;
    color: #fff;

    .btn_exchange {
      position: absolute;
      right: 15px;
      top: 31px;
      font-size: 13px;
    }

    .score-box {
      width: 150px;
      justify-content: center;
      align-items: center;

      span {
        display: inline-block;

        &:first-child {
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 67px;
        }

        &:last-child {
          margin-top: 20px;
          height: 15px;
          line-height: 15px;
          font-size: 16px;
        }
      }
    }
  }

  .page-list {
    position: relative;
    margin-top: -24px;
    margin-left: 15px;
    padding: 17px 18px;
    margin-right: 15px;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .title {
      display: flex;
      justify-content: space-between;

      span {
        &:first-child {
          line-height: 20px;
          height: 15px;
          font-size: 15px;
          font-weight: bold;
          color: #323232;
        }

        &:last-child {
          line-height: 20px;
          height: 13px;
          font-size: 13px;
          font-weight: bold;
          color: #06beb9;
        }
      }
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding: 13px 0px;
      border-bottom: 1px solid #eee;

      div {
        &:last-child {
          text-align: right;
        }
      }

      .name {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        font-weight: bold;
        color: #3d3d3d;
      }

      .score {
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        font-weight: bold;
      }

      .score-in {
        color: #ffa200;
      }

      .score-out {
        color: #06bdbb;
      }

      .time {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        color: #b4b4b4;
      }

      .status {
        height: 20px;
        line-height: 20px;
        font-size: 10px;
        color: #b4b4b4;
      }
    }
  }
}
</style>
