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

    <div class="category">
      <div class="category-item">
        <div class="icon">
          <span class="iconfont">&#xe73c;</span>
        </div>
        <div class="name">公益</div>
      </div>
      <div class="category-item">
        <div class="icon">
          <span class="iconfont">&#xe73d;</span>
        </div>
        <div class="name">考试</div>
      </div>
      <div class="category-item">
        <div class="icon">
          <span class="iconfont">&#xe73a;</span>
        </div>
        <div class="name">比赛</div>
      </div>
      <div class="category-item">
        <div class="icon">
          <span class="iconfont">&#xe729;</span>
        </div>
        <div class="name">兴趣</div>
      </div>
      <div class="category-item">
        <div class="icon">
          <span class="iconfont">&#xe737;</span>
        </div>
        <div class="name">技能</div>
      </div>
    </div>

    <div class="hot">
      <div class="title">热门活动</div>
      <div class="activity-list">
        <div class="activity-item">
          <img src="~@/assets/images/activity_item.png" alt />
          <div class="content">
            <div class="name">PS照片调色详细讲解色详细讲解色详细讲解</div>
            <div class="date">
              <span>6月13日</span>
              <span>星期六</span>
              <span>09:00-12:00</span>
            </div>
            <div class="address">贵州师范大学</div>
            <div class="others">
              <div class="price">免费参加</div>
              <div class="count">50人报名</div>
            </div>
          </div>
        </div>

        <div class="activity-item">
          <img src="~@/assets/images/activity_item.png" alt />
          <div class="content">
            <div class="name">PS照片调色详细讲解色详细讲解色详细讲解</div>
            <div class="date">
              <span>6月13日</span>
              <span>星期六</span>
              <span>09:00-12:00</span>
            </div>
            <div class="address">贵州师范大学</div>
            <div class="others">
              <div class="price">免费参加</div>
              <div class="count">50人报名</div>
            </div>
          </div>
        </div>

        <div class="activity-item">
          <img src="~@/assets/images/activity_item.png" alt />
          <div class="content">
            <div class="name">PS照片调色详细讲解色详细讲解色详细讲解</div>
            <div class="date">
              <span>6月13日</span>
              <span>星期六</span>
              <span>09:00-12:00</span>
            </div>
            <div class="address">贵州师范大学</div>
            <div class="others">
              <div class="price">免费参加</div>
              <div class="count">50人报名</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  components: {
    Search,
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

.category {
  display: flex;
  margin: 8px 0;
  background: #fff;
}

.category-item {
  flex: 1;
  text-align: center;

  .icon {
    margin: 22px auto 10px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 100%;
    background-image: linear-gradient(180deg, #ff3232 0%, #ff766e 100%);
  }

  &:nth-child(2) .icon {
    background-image: linear-gradient(180deg, #248afd 0%, #55c2ff 100%);
  }
  &:nth-child(3) .icon {
    background-image: linear-gradient(180deg, #16b459 0%, #6cf088 100%);
  }
  &:nth-child(4) .icon {
    background-image: linear-gradient(180deg, #ff6c00 0%, #ffd163 100%);
  }
  &:nth-child(5) .icon {
    background-image: linear-gradient(180deg, #7c5eff 0%, #b985ff 100%);
  }

  .iconfont {
    color: #fff;
  }

  .name {
    margin-bottom: 17px;
    color: #2d2d2d;
  }
}

.hot {
  margin-bottom: 8px;
  padding: 0 15px;
  background: #fff;
}

.activity-item {
  display: flex;
  padding: 15px 0;
  border-top: solid 1px #dadada;

  img {
    height: 112px;
    margin-right: 12px;
  }

  .name {
    height: 50px;
    line-height: 1.5;
    font-size: 15px;
    color: #2d2d2d;
  }

  .date,
  .address {
    font-size: 12px;
    color: #b2b2b2;
  }

  .address {
    margin: 6px 0 15px;
  }

  .others {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #ff9000;
  }
}
</style>
