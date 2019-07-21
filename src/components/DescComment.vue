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

    <div v-if="active === 'desc'" class="desc">
      <p>
        首届以物联网、大数据、云计算、人工智能、互联网等产业融合发展为主题的“智能互联融合创新发展论坛”(简称：智融大会)由中国信息通信研究院主导，以“智融未来，慧聚创新”主题，针对政策、技术、应用三大方向，深入探讨智能技术与相关产业融合与创新发展，进一步加强政产学研各界的交流沟通。届时，国家发改委、工信部等有关领导，中国科学院院士、中国工程院院士等权威专家，华为、腾讯、阿里等行业领军企业高管将齐聚重庆，共筑产业“融合·创新·发展”之路。
      </p>
    </div>
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
  color: #2d2d2d;
}
</style>
