<template>
  <div class="home">
    <div class="header">
      <search />
      <button class="qrcode">
        <span class="iconfont">&#xe746;</span>
      </button>
    </div>

    <person-desc />

    <hr />

    <div class="score">
      <div>
        我的积分
        <span>1724</span>
      </div>
      <div>
        排名
        <span>450</span>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'
import PersonDesc from '@/components/PersonDesc'

export default {
  components: {
    Search,
    PersonDesc,
  },

  data() {
    return {
      value: '',
    }
  },

  methods: {
    onSearch() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  padding: 15px 15px 73px;
  background-image: linear-gradient(90deg, #06bcbf 0%, #07c2af 100%);
}

.header {
  display: flex;
  align-items: center;
}

.search {
  flex: 1;
  margin-right: 18px;
}

.qrcode {
  border: 0;
  background: transparent;
  outline: 0;
  .iconfont {
    font-size: 26px;
    color: #fff;
  }
}

.person-desc {
  margin-top: 20px;
}

hr {
  height: 1px;
  margin: 22px 0 26px;
  border: 0;
  background-image: linear-gradient(#5ceae2, #5ceae2),
    linear-gradient(#feceb7, #feceb7);
  opacity: 0.41;
}

.score {
  display: flex;
  font-size: 14px;
  color: #fff;

  div {
    flex: 1;
    text-align: center;
  }

  span {
    margin-left: 4px;
    font-size: 19px;
  }
}
</style>
