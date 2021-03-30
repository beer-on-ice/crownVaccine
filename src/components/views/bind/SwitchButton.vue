<template>
  <div class="switch-button flex-center"
    :class="selected ? 'button-selected' : 'button-unselected'">
    <ss-icon :iconType="iconType + (selected ? '-selected' : '-unselected')"
      size="36px"
      v-if="iconType"></ss-icon>
    <div class="flex-grow margin-left">
      <span v-if="label && !$slots.default">{{ label }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    selected: {
      default: true
    },
    iconType: {
      required: false
    },
    label: {
      required: false
    }
  }
}
</script>

<style scoped lang="stylus">
.switch-button
  padding 20px 40px;
  border-radius 40px;
  font-size $fontSizeS;
  transform scale(0.8);
  margin-right calc(-15% + 10px);
.button-selected
  background-color #6782fe;
  color white;
.button-unselected
  background-color #e7ecff;
  color #8d9bd4;
</style>
