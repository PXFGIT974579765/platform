<template>
  <div class="page-my-base-info">
    <van-cell-group class="cell-group">
      <van-cell title="头像" class="cell" is-link>
        <div class="avatar-box">
          <img src="~@/assets/images/avatar.png" alt class="avatar" />
        </div>
      </van-cell>
      <van-cell title="昵称" class="cell" value="小刘哥" is-link />
      <van-cell title="姓名" class="cell" value="刘国贵" is-link />
      <van-cell title="性别" class="cell" value="男" is-link />
      <van-cell title="手机号码" class="cell" value="199****1144" is-link />
      <van-cell
        title="电子邮箱"
        class="cell"
        value="540***202@qq.com"
        is-link
      />
    </van-cell-group>

    <van-cell-group class="cell-group">
      <van-cell title="学校" class="cell" value="贵州师范大学" is-link />
      <van-cell title="专业" class="cell" value="计算机科学与技术" is-link />
      <van-cell title="班级" class="cell" value="18级2班" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseInfo: {},
    }
  },
}
</script>

<style lang="less" scoped>
.page-my-base-info {
  background-color: #eee;

  .cell-group {
    margin-top: 15px;

    .cell {
      height: 55px;
      line-height: 55px;
      align-items: center;
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
