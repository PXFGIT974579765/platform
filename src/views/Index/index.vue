<template>
  <div class="index">
    <router-view v-wechat-title="$route.meta.title" />
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  name: 'Home',

  components: {
    BottomNav,
  },
}
</script>
