<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import http from '@/lib/http'

export default {
  created() {
    http
      .post('/wxmp-anon/client/wxUrl', {
        sign: '9ae4934e5068f95e05975669eb182ce7',
        url: 'http://j24i562194.wicp.vip/index.html',
      })
      .then(({ data }) => {
        location.href = data.datas.url
      })
  },
}
</script>

<style>
#app {
}
</style>
