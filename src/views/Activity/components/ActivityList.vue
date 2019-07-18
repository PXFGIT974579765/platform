<template>
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
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
