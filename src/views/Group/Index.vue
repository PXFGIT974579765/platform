<template>
  <div>
    <div class="header">
      <search light />

      <ul class="clearfix category">
        <li v-for="c in category" :key="c.categoryId">
          <img :src="c.iconUrl" alt="" />
          <div class="name">{{ c.name }}</div>
        </li>
      </ul>
    </div>

    <div class="ticket">
      <img src="~@/assets/images/group_ad.png" alt />
      <div class="ticket-info">
        <div class="ticket-name">打印专用抵扣券</div>
        <div class="ticket-value">
          ￥
          <span>10</span>
        </div>
        <button>立即领取</button>
      </div>
    </div>

    <div class="block list">
      <div class="block-header">
        <div class="block-title">最新拼团</div>
      </div>
      <div class="block-content clearfix">
        <div class="list-item-wrap" v-for="l in list" :key="l.id">
          <router-link :to="`/group/detail/${l.id}`" class="list-item">
            <img :src="l.picUrl" alt />
            <div class="name ellipsis-2">{{ l.name }}</div>
            <div class="detail">
              <div class="price">
                ￥
                <span>{{ l.price }}</span
                >.00
              </div>
              <div class="count">
                {{ l.limitMinSize }}-{{ l.limitMaxSize }}人团
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  components: {
    Search,
  },

  data() {
    return {
      category: [],
      list: [],
    }
  },

  created() {
    this.$http.get('/api-wxmp/cxxz/category/ptTypes').then(({ data }) => {
      if (data.resp_code === 0) {
        this.category = data.datas
      }
    })

    this.$http
      .get('/api-wxmp/cxxz/assemble/pageList', {
        params: { pageIndex: 1, pageSize: 20 },
      })
      .then(({ data }) => {
        if (data.resp_code === 0) {
          this.list = data.datas.data
        }
      })
  },
}
</script>

<style lang="less" scoped>
.header {
  margin-bottom: 10px;
  padding: 13px 20px 0;
  background: #fff;
}

.category {
  text-align: center;
  margin-top: 23px;

  li {
    float: left;
    width: 25%;
    margin-bottom: 20px;
  }

  img {
    max-width: 22px;
  }

  .name {
    margin-top: 10px;
    font-size: 13px;
    color: #565656;
  }
}

.ticket {
  display: flex;
  padding: 15px;
  background: #fff;

  img {
    width: 66%;
  }

  .ticket-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 11px;
    padding: 13px 14px;
    color: #fff;
    background: url(~@/assets/images/group_print.png) 0 0 no-repeat;
    background-size: 100% 100%;
  }

  .ticket-name {
    font-size: 15px;
    line-height: 1.5;
  }

  .ticket-value span {
    font-size: 24px;
  }

  button {
    width: 62px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 10px;
    background-color: #c70300;
  }
}

.block {
  margin-top: 21px;
  padding: 0 15px;
}

.block-header {
  display: flex;
  margin-bottom: 15px;
}

.block-title {
  flex: 1;
  font-size: 18px;
  font-weight: 700;
}

.list {
  margin-bottom: 150px;
}

.list-item-wrap {
  width: 50%;
  float: left;
  margin-bottom: 15px;
  &:nth-child(2n + 1) {
    padding-right: 7.5px;
  }
  &:nth-child(2n) {
    padding-left: 7.5px;
  }
}

.list-item {
  display: block;
  text-align: center;
  border-radius: 4px;
  background: #fff;

  img {
    // TODO: height
    height: 165px;
    background-color: #fff;
  }

  .name {
    text-align: left;
    margin-bottom: 3px;
    padding: 6px 7px;
    line-height: 1.5;
    height: 3.5em;
    font-size: 16px;
    color: #4e4e4e;
  }

  .detail {
    display: flex;
    align-items: center;
    padding: 0 6px 15px;
  }

  .price {
    flex: 1;
    font-size: 12px;
    color: #ff2d2d;
    span {
      font-size: 17px;
    }
  }

  .count {
    width: 43px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 11px;
    border-radius: 2px;
    background: #f94141;
    color: #fff;
  }
}
</style>
