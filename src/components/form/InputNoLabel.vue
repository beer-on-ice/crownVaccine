<template>
  <van-field v-model="val"
    :size="size"
    :label-width="0"
    :type="type"
    :placeholder="placeholder"
    :rules="rules"
    @input.native="setInput"
    :readonly="readonly"
    :disabled="disabled"
    :maxlength="maxlength"></van-field>
</template>

<script>
import { Field } from 'vant'
export default {
  name: 'InputNoLabel',
  components: {
    [Field.name]: Field
  },
  props: {
    value: {
      default: ''
    },
    type: {
      default: 'text'
    },
    size: {
      default: 'small'
    },
    placeholder: {
      default: ''
    },
    rules: {
      required: false
    },
    readonly: {
      default: false
    },
    disabled: {
      default: false
    },
    maxlength: {
      default: 18
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  watch: {
    value (val) {
      this.val = val
    }
  },
  methods: {
    setInput () {
      this.$nextTick(() => {
        this.$emit('input', this.val)
      })
    }
  }
}
</script>

<style scoped lang="stylus"></style>
