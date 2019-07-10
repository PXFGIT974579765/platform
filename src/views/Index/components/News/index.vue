<template>
  <div class="news">
    <router-link to="/news/1" class="new-link">
      <new-item
        :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
        :date="'01.25'"
        :read="452"
        :image="require('@/assets/images/new.png')"
      />
    </router-link>

    <router-link to="/news/1" class="new-link">
      <new-item
        :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
        :date="'01.25'"
        :read="452"
        :image="require('@/assets/images/new.png')"
      />
    </router-link>

    <router-link to="/news/1" class="new-link">
      <new-item
        :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
        :date="'01.25'"
        :read="452"
        :image="require('@/assets/images/new.png')"
      />
    </router-link>

    <router-link to="/news/1" class="new-link">
      <new-item
        :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
        :date="'01.25'"
        :read="452"
        :image="require('@/assets/images/new.png')"
      />
    </router-link>

    <router-link to="/news/1" class="new-link">
      <new-item
        :title="'庆祝改革开放40周年贵州启动首届师生摄影大赛'"
        :date="'01.25'"
        :read="452"
        :image="require('@/assets/images/new.png')"
      />
    </router-link>
  </div>
</template>

<script>
import NewItem from '@/components/NewItem'

export default {
  components: {
    NewItem,
  },
}
</script>

<style lang="less" scoped>
.news {
  padding: 20px 15px;
}
</style>
