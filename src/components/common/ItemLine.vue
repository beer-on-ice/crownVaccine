<template>
  <div class="item-line flex-space-between"
    :class="showBottom ? 'bottom-line' : ''">
    <slot></slot>
    <div v-if="!$slots.default">
      <slot name="label"></slot>
    </div>
    <div v-if="!$slots.default">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemLine',
  props: {
    showBottom: {
      default: true
    }
  }
}
</script>

<style scoped lang="stylus">
.bottom-line
  border-bottom 1px solid $colorShadow;
</style>
