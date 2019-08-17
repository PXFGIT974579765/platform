<template>
  <div class="errand-comment">
    <van-icon name="cross" :size="16" class="close" @click="onClose" />

    <img class="avatar" src="~@/assets/images/errand_avatar.png" alt />
    <div class="name">王多鱼</div>
    <div class="title">请对本次服务进行评价</div>

    <van-rate v-model="ratings" :size="24" color="#ffad43" />

    <div class="result">满意</div>

    <div class="detail clearfix">
      <div v-for="(t, i) in tags" :key="t.tag" class="item-wrap">
        <div :class="['item', { active: t.selected }]" @click="onClick(i)">
          {{ t.tag }}
        </div>
      </div>
    </div>

    <div class="submit">
      <button @click="onSubmit">提交评价</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },

  data() {
    return {
      ratings: 0,
      tags: [],
    }
  },

  created() {
    this.$http.get('/api-wxmp/cxxz/comment/tag/list').then(({ data }) => {
      if (data.resp_code === 0) {
        this.tags = data.datas.tags.map(t => ({ tag: t, selected: false }))
      }
    })
  },

  methods: {
    onClose() {
      this.$emit('close')
    },

    onClick(index) {
      const value = this.tags[index]
      this.$set(this.tags, index, { ...value, selected: !value.selected })
    },

    onSubmit() {
      const { ratings, tags } = this
      this.$emit('comment', { ratings, tags: tags.filter(t => t.selected) })
    },
  },
}
</script>

<style lang="less" scoped>
.errand-comment {
  position: relative;
  text-align: center;
  padding: 0 20px;
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #adadad;
}

.avatar {
  width: 55px;
  height: 55px;
  margin: 33px 0 9px;
  border-radius: 100%;
}

.name {
  font-size: 16px;
  color: #585858;
}

.title {
  margin: 20px 0;
  font-size: 15px;
  color: #525252;
}

.result {
  margin-top: 15px;
  font-size: 16px;
  color: #ffad43;
}

.detail {
  margin: 27px -12px 0 0;
}

.item-wrap {
  float: left;
  width: 33.333333%;
  margin-bottom: 12px;
  padding-right: 12px;
}

.item {
  height: 34px;
  line-height: 34px;
  border-radius: 4px;
  border: solid 1px #bdbdbd;
  color: #757575;

  &.active {
    color: #07c2af;
    border-color: #07c2af;
  }
}

.submit {
  padding: 28px 20px 30px;
}

button {
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #07c2af;
}
</style>
