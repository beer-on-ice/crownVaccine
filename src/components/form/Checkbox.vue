<template>
  <div class="checkbox">
    <div class="flex-center">
      <img @click="changeSelected"
        :src="selected ? require('@/assets/images/common/checkbox_checked.png') : require('@/assets/images/common/checkbox_unchecked.png')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ssCheckbox',
  props: {
    value: {
      default: false
    },
    label: {
      required: false
    },
    multi: {
      default: true
    }
  },
  data () {
    return {
      selected: this.label ? this.value === this.label : !!this.value
    }
  },
  watch: {
    value (val) {
      this.selected = this.label ? val === this.label : !!val
    }
  },
  methods: {
    changeSelected () {
      this.selected = !this.selected
      if (!this.label) {
        this.$emit('input', this.selected)
      } else if (this.selected) {
        this.$emit('input', this.label)
      } else if (!this.multi) {
        this.$emit('input', null)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.checkbox
  display inline-block;
  width fit-content;
  cursor pointer;
.checkbox img
  width $fontSizeL;
  hieght $fontSizeL;
</style>
