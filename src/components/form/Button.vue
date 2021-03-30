<template>
  <van-button @click="clickHandler"
    :size="size"
    :plain="plain"
    :class="{'disabled':disabled || clickDisable}"
    :color="disabled || clickDisable ? '#b4b4b4' : color"
    :type="type"
    :round="round"
    :disabled="disabled || clickDisable"
    :text="text"
    :loading="loading"
    loading-type="spinner">
    <slot></slot>
  </van-button>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'ssButton',
  components: {
    [Button.name]: Button
  },
  props: {
    text: {
      required: false
    },
    size: {
      default: 'normal'
    },
    plain: {
      default: false
    },
    type: {
      default: 'info'
    },
    round: {
      default: true
    },
    disabled: {
      default: false
    },
    loading: {
      default: false
    },
    color: {
      required: false
    }
  },
  data () {
    return {
      clickDisable: false
    }
  },
  methods: {
    clickHandler () {
      this.clickDisable = true
      this.$emit('click')
      setTimeout(() => {
        this.clickDisable = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="stylus">
.disabled
  background #c6c6c6 !important;
  border-color #c6c6c6 !important;
  color #222 !important;
</style>
