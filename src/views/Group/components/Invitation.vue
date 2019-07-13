<template>
  <button :class="['invitation', { wireframe: wireframe }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    wireframe: Boolean,
  },
}
</script>

<style lang="less" scoped>
.invitation {
  display: block;
  width: 100%;
  height: 46px;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  background-image: linear-gradient(#f94141, #f94141),
    linear-gradient(#fe5e60, #fe5e60);

  &.wireframe {
    border: solid 1px #9e9e9e;
    color: #787878;
    background: transparent;
  }
}
</style>
