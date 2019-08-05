<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: mapActions(['setUser', 'setAccess']),

  created() {
    const { code } = this.$route.query
    this.$http
      .post('/api-wxmp/wxmp-anon/client/credentials', {
        code: code,
      })
      .then(({ data }) => {
        if (data.resp_code !== 0) {
          this.$router.push('/')
          return
        }
        const { accessToken, userInfo } = data.datas
        this.setUser(userInfo)
        this.setAccess(accessToken)
        this.$router.push('/index/home')
      })
  },
}
</script>
