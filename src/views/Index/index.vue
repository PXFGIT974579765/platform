<template>
  <div class="index">
    <router-view />
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  name: 'Index',

  components: {
    BottomNav,
  },

  created() {
    // this.$http.post('/api-wxmp/cxxz/wx/getMpConfig').then(({ data }) => {
    //   if (data.resp_code === 0) {
    //     wx.config({
    //       debug: true,
    //       jsApiList: ['scanQRCode', 'chooseWXPay'],
    //       ...data.datas,
    //     })
    //   }
    // })
  },
}
</script>
