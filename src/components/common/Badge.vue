<template>
  <div class="badge-wrap">
    <slot></slot>
    <div class="badge"
      v-show="showFlag">
      <span v-if="!$slots.text">{{ text }}</span>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  data () {
    return {}
  },
  props: {
    showFlag: {
      default: true
    },
    text: {
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus">
.badge-wrap
  position relative;
.badge
  position absolute;
  right 0;
  top 0;
  background-color #d62b15;
  color white;
  padding 4px 10px;
  border-radius 100px;
  transform translate(60%, -60%) scale(0.65);
  font-size $fontSizeS;
</style>
