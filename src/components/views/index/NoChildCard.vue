<template>
  <ss-index-card class="background-card"
    width="80vw">
    <div class="title">无绑定儿童</div>
    <div class="title-note">快来点击右上角绑定您的第一个宝宝吧</div>
    <img :src="require('@/assets/images/index/icon_bind.png')"
      class="icon-bind" />
  </ss-index-card>
</template>

<script>
import IndexCard from './IndexCard'
export default {
  name: 'NoChildCard',
  components: {
    'ss-index-card': IndexCard
  }
}
</script>

<style scoped lang="stylus">
.icon-bind
  position absolute;
  top 0;
  right 0;
  width 60px;
  cursor pointer;
</style>
