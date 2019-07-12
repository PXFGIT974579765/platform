<template>
  <div class="page-my-address-edit" v-wechat-title="$route.meta.title">
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    >
      <slot name="name">
        <van-radio-group v-model="radio">
          <van-radio name="1" checked-color="#07c160">男</van-radio>
          <van-radio name="2" checked-color="#07c160">女</van-radio>
        </van-radio-group>
      </slot>
    </van-address-edit>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: {
        name: '刘国贵',
        phone: '19987451243',
        address: '贵州省贵阳市花溪区大学城贵州师范大学科创园XXX',
      },
    }
  },
  methods: {
    onLoad() {},
  },
}
</script>

<style lang="less" scoped>
.page-my-address-edit {
  padding: 15px 0;
}
</style>
