<template>
  <van-overlay class="flex-column flex-end"
    :show="showFlag"
    @click="close">
    <van-datetime-picker style="width:100%"
      v-model="val"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      :visible-item-count="3"
      @cancel="cancel"
      @confirm="confirm"></van-datetime-picker>
  </van-overlay>
</template>

<script>
import { Overlay, DatetimePicker } from 'vant'
export default {
  name: 'DatePicker',
  components: {
    [Overlay.name]: Overlay,
    [DatetimePicker.name]: DatetimePicker
  },
  props: {
    value: {
      default: ''
    },
    minDate: {
      default: function () {
        return this.$utils.parseDate('1980-01-01')
      }
    },
    maxDate: {
      default: function () {
        return this.$utils.parseDate('2100-01-01')
      }
    },
    showFlag: {
      default: true
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
    cancel () {
      this.close()
    },
    confirm (val) {
      this.$emit('confirm', val)
      this.close()
    },
    close () {
      this.$emit('update:showFlag', false)
    }
  }
}
</script>

<style scoped lang="stylus"></style>
