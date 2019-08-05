<template>
  <div class="desc-comment">
    <div class="tabs">
      <div
        :class="['tab', { active: active === 'desc' }]"
        @click="onChange('desc')"
      >
        描述
      </div>
      <div
        :class="['tab', { active: active === 'comment' }]"
        @click="onChange('comment')"
      >
        评价
      </div>
    </div>

    <div v-if="active === 'desc'" class="desc" v-html="desc"></div>
    <div v-else class="comments">
      <comment />
      <comment />
      <comment />
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment'

export default {
  components: {
    Comment,
  },

  props: {
    active: String,
    desc: String,
  },

  methods: {
    onChange(type) {
      this.$emit('onChange', type)
    },
  },
}
</script>

<style lang="less" scoped>
.desc-comment {
  background-color: #ffffff;
}

.tabs {
  display: flex;
  height: 40px;
  line-height: 40px;
  margin: 0 15px;
  border-bottom: solid 1px #e5e5e5;
}

.tab {
  margin-right: 50px;
  font-size: 13px;
  color: #656565;

  &.active {
    font-size: 16px;
    color: #2d2d2d;
  }
}

.desc {
  padding: 15px;
  line-height: 1.5;
  font-size: 12px;
}
</style>
