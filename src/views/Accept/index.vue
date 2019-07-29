<template>
  <p>code: {{ code }} state: {{ state }}</p>
</template>

<script>
// import http from '@/lib/http'

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
    // console.log(code, state);
    // http
    //   .post('/api-wxmp/client/credentials', {
    //     sign: '9ae4934e5068f95e05975669eb182ce7',
    //     url: 'http://j24i562194.wicp.vip/index.html',
    //   })
    //   .then(({ data }) => {
    //     // location.href = data.datas.url
    //   })
  },
}
</script>
