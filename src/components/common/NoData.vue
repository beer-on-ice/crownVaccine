<template>
  <div class="nodataWrapper main-class flex-center flex-column">
    <img :src="require('@/assets/images/common/no_data2.png')"
      class="no-data-img" />
    <div class="no-data-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style scoped lang="stylus">
.nodataWrapper
  position fixed;
  top 0;
  left 0;
  right 0;
  bottom 0;
.no-data-img
  max-width 50%;
  max-height 40%;
.no-data-text
  margin 60px 40px 0 40px;
  color $colorMainLight;
  text-align center;
</style>
