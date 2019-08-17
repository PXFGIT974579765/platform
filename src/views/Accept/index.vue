<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
import local from '@/lib/local'

export default {
  methods: mapActions(['setUser', 'setAccess']),

  created() {
    const { code } = this.$route.query
    console.log(code)
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

        const redirectUrl = local.get('redirectUrl')

        if (redirectUrl) {
          this.$router.push(`${redirectUrl}`)
        } else {
          this.$router.push('/index/home')
        }
      })
  },
}
</script>
