<template>
  <div>
    <div class="article">
      <h1>2019 年数据和人工智能全景图</h1>
      <new-info :date="'01.24'" :read="300" />
      <p>
        随着世界上网民越来越多，所有事物的“数据化”
        都在继续加速。在基础设施、云计算、人工智能、开源以及我们经济和生活的整体数字化的交叉发展的推动下，这一大趋势如风起云涌、波澜壮阔的画卷。
      </p>
      <p>
        几年前，关于“大数据”的讨论大多是技术性的，集中在新一代工具的出现上，这些工具可以收集、处理和分析海量数据。其中许多技术现在已经很好地被人们理解，并得到了大规模的部署。此外，特别是在过去的几年里，我们开始通过数据科学、机器学习和人工智能在许多应用中增加智能层，这些应用现在正越来越多地在各种消费类和
        B2B 产品的生产中运行。
      </p>
      <img src="~@/assets/images/new_detail.png" alt />
    </div>

    <div class="block news">
      <div class="block-header">
        <div class="block-title">相关推荐</div>
      </div>
      <div class="block-content">
        <new-item
          :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
          :date="'01.25'"
          :read="452"
          :image="require('@/assets/images/new.png')"
        />
        <new-item
          :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
          :date="'01.25'"
          :read="452"
          :image="require('@/assets/images/new.png')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'
import NewInfo from '@/components/NewInfo'

export default {
  components: {
    NewInfo,
    NewItem,
  },
}
</script>

<style lang="less" scoped>
.article {
  padding: 20px 15px 15px;
}

h1 {
  margin-bottom: 12px;
}

p {
  margin: 12px 0;
  line-height: 1.5;
}

.news {
  margin-top: 35px;
}
</style>
