<template>
  <p>code: {{ code }} state: {{ state }}</p>
</template>

<script>
import http from '@/lib/http'

export default {
  data() {
    return {
      code: '',
      state: '',
    }
  },

  created() {
    const { code, state } = this.$route.query
    this.code = code
    this.state = state
    console.log(code, state)
    http
      .post('/wxmp-anon/client/credentials', {
        sign: '9ae4934e5068f95e05975669eb182ce7',
        code: code,
        sourceType: 4,
      })
      .then(({ data }) => {
        console.log(data)
      })
  },
}
</script>
