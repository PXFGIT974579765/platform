<template>
  <div class="comment">
    <div class="user">
      <img src="~@/assets/images/errand_avatar.png" alt />
      <div class="info">
        <div class="name">小刘哥</div>
        <div class="date">2019.06.27 12:45</div>
      </div>
      <van-rate :value="4" :size="12" color="#ffad43" />
    </div>

    <p>
      "这是用户评价内容，内容一定要控制在100字以内。需不需要上传图片评价？这是用户评价内容，内容一定要控制在100字以内。需不需要上传图片评价？"
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.comment {
  margin: 0 15px;
  padding: 20px 0;
  border-bottom: dashed 1px #d2d2d2;

  &:last-child {
    border: 0;
  }
}

.user {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 9px;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 36px;
  }

  .name {
    font-size: 15px;
  }

  .date {
    font-size: 11px;
    color: #a5a5a5;
  }
}

p {
  line-height: 1.5;
  font-size: 13px;
  color: #424242;
}
</style>
