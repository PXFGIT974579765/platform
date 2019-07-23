<template>
  <div class="person-desc flex">
    <div class="avatar">
      <img src="~@/assets/images/avatar.png" alt />
      <span :class="['iconfont', 'avatar-icon', info.isAuthed && 'authed']"
        >&#xe76d;</span
      >
    </div>
    <div class="desc">
      <div>
        <span class="name">{{ info.name }}</span>
        <span class="level">
          <span class="iconfont vip-icon">&#xe770;</span>{{ info.level }}
        </span>
      </div>
      <div>
        <span class="iconfont">&#xe771;</span>
        <span class="age">{{ info.age }}</span>
        <span class="university">{{ info.university }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: function() {
        return {
          isAuthed: true,
          name: 'Hi 小刘哥',
          level: '黄金会员',
          age: 22,
          university: '贵州师范大学',
        }
      },
    },
  },
  data: function() {
    return {
      type: Object,
    }
  },
}
</script>

<style lang="less" scoped>
.person-desc {
  color: #fff;
  align-items: center;
}

.avatar {
  width: 55px;
  height: 55px;
  margin-right: 15px;
  position: relative;
  border-radius: 100%;

  .avatar-icon {
    position: absolute;
    bottom: 0;
    right: -11px;
    font-size: 16px;
    color: #aeaeae;
  }

  .authed {
    color: #0cde8d;
  }
}

.desc > div {
  display: flex;
  align-items: center;
}

.desc > div:last-child {
  margin-top: 8px;
  font-size: 12px;
}

.vip-icon {
  color: #f3f2f0 !important;
}

.name {
  font-size: 20px;
}

.level {
  height: 20px;
  line-height: 20px;
  margin-left: 13px;
  padding: 0 5px;
  border-radius: 6px;
  font-size: 12px;
  background-image: linear-gradient(25deg, #eec983 0%, #f7dcb2 100%),
    linear-gradient(#0cde8d, #0cde8d);
  background-blend-mode: normal, normal;
}

.iconfont {
  font-size: 12px;
  margin-right: 7px;
  color: #0072ff;
}

.age {
  margin-right: 10px;
}
</style>
