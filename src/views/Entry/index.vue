<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
// import store from '@/store'

export default {
  computed: mapGetters(['user']),

  created() {
    // store.dispatch('clearUser')

    if (this.user.id) {
      this.$router.push('/index/home')
      return
    }

    this.$http
      .post('/api-wxmp/wxmp-anon/client/wxUrl', {
        url: process.env.VUE_APP_REDIRECT,
      })
      .then(({ data }) => {
        if (data.resp_code !== 0) {
          this.$router.push('/')
          return
        }
        location.href = data.datas.url
      })
  },
}
</script>
