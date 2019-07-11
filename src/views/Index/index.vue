<template>
  <div class="index">
    <router-view />
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
