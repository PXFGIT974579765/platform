<template>
  <div class="earn">
    <div class="comment">{{ content }}</div>

    <div class="btn-wrap">
      <router-link to="/my/sign">
        <button class="btn">去做任务，赚积分</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
    }
  },

  created() {
    this.$http.get('/api-media/cxxz/score/desc').then(({ data }) => {
      if (data.resp_code === 0) {
        this.content = data.datas.content
      }
    })
  },
}
</script>

<style lang="less" scoped>
.comment {
  padding: 15px;
  line-height: 1.5;
  background: #fff;
}

.btn-wrap {
  padding: 17px 15px 0;
}

.btn {
  display: block;
  width: 100%;
  padding: 14px 0;
  font-size: 15px;
  border-radius: 4px;
  color: #fff;
  background-color: #07c2af;
}
</style>
