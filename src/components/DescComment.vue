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
      <comment v-for="item in list" :key="item.id" :comment="item" />
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
    goodId: String,
    active: String,
    desc: String,
  },

  data() {
    return {
      list: [],
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.$http
        .get('/api-wxmp/cxxz/comment/findGoodsComment', {
          params: { goodsId: this.goodId },
        })
        .then(({ data }) => {
          if (data.resp_code === 0) {
            this.list = data.datas
          }
        })
    },

    onChange(type) {
      this.$emit('onChange', type)
    },
  },
}
</script>

<style lang="less" scoped>
.desc-comment {
  margin-bottom: 68px;
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
  font-size: 14px;
}
</style>
