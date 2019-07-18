<template>
  <div>
    <div class="header">
      <search light />
    </div>

    <div class="rec">
      <div class="title">推荐活动</div>
      <div class="activities">
        <img src="~@/assets/images/activity_rec.jpg" alt />
        <div class="content">
          <div class="name">
            <div class="tag">比赛</div>
            刀剑2贵州赛区英雄争霸赛
          </div>
          <div class="detail">
            <div class="date">
              <span>6月13日</span>
              <span>星期六</span>
              <span>09:00 - 12:00</span>
            </div>
            <div class="address">贵州师范大学</div>
          </div>
          <div class="others">
            <div class="price">免费参加</div>
            <div class="count">
              <span>274人报名</span>
              <span>限额300人</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <activity-nav />

    <div class="hot">
      <div class="title">热门活动</div>
      <activity-list />
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import ActivityNav from './components/ActivityNav'
import ActivityList from './components/ActivityList'

export default {
  components: {
    Search,
    ActivityNav,
    ActivityList,
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px 18px;
  background: #fff;
}

.title {
  padding: 15px 0;
  font-size: 17px;
  color: #2d2d2d;
}

.rec {
  margin-bottom: 8px;
  padding: 13px 15px 15px;
  background: #fff;

  img {
    border-radius: 3px 3px 0 0;
  }

  .title {
    margin-bottom: 5px;
  }

  .activities {
    background-color: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(136, 136, 136, 0.3);
    border-radius: 0px 0px 3px 3px;
  }

  .content {
    padding: 12px 13px 15px;
  }

  .name {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 16px;
    color: #2d2d2d;
  }

  .tag {
    width: 35px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    margin-right: 8px;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    background-image: linear-gradient(#16b459, #16b459),
      linear-gradient(#ff3434, #ff3434);
  }

  .detail {
    display: flex;
    font-size: 12px;
    color: #b2b2b2;
  }

  .date {
    flex: 1;
    margin-bottom: 14px;

    span {
      margin-right: 12px;
    }
  }

  .others {
    display: flex;
    font-size: 12px;
    color: #ff9000;
  }

  .price {
    flex: 1;
  }

  .count span:last-child {
    margin-left: 10px;
    color: #565656;
  }
}

.hot {
  margin-bottom: 8px;
  padding: 0 15px;
  background: #fff;
}
</style>
