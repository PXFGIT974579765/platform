<template>
  <div>
    <good />
    <desc-comment :active="active" @onChange="onChange" />
  </div>
</template>

<script>
import Good from './components/Good'
import DescComment from './components/DescComment'

export default {
  components: {
    Good,
    DescComment,
  },

  data() {
    return {
      active: 'comment',
    }
  },

  methods: {
    onChange(type) {
      this.active = type
    },
  },
}
</script>

<style lang="less" scoped></style>
