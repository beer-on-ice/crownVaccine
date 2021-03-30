<template>
  <div class="commonPicker">
    <van-popup :value="showFlag"
      round
      position="bottom"
      @click-overlay="popClick"
      @click-close-icon="popClick">
      <van-picker :show-toolbar="showToolBar"
        :confirm-button-text="confirmButtonText"
        :cancel-button-text="cancelButtonText"
        :title="title"
        :columns="columns"
        :default-index="defaultIndex"
        :value-key="valKey"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange">
        <template #confirm>
          <slot name="confirm"></slot>
        </template>
        <template #cancel>
          <slot name="cancel"></slot>
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'commonPicker',
  props: {
    defaultIndex: {
      required: false,
      default: 0
    },
    valKey: {
      required: false
    },
    showFlag: {
      type: Boolean,
      default: false,
      required: false
    },
    columns: {
      type: Array,
      default: () => ([]),
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    showToolBar: {
      type: Boolean,
      default: true,
      required: false
    },
    confirmButtonText: {
      type: String,
      default: '确定',
      required: false
    },
    cancelButtonText: {
      type: String,
      default: '取消',
      required: false
    }
  },
  methods: {
    popClick () {
      this.$emit('popClick', this.columns.length ? this.columns[0] : '')
    },
    onChange (picker, value, index) {
      // console.log(value, index)
      this.$emit('pickerChange', value)
    },
    onConfirm (value, index) {
      const item = { value, index }
      this.$emit('pickerConfirm', item)
    },
    onCancel () {
      this.$emit('pickerCancel')
    }
  }
}

</script>

<style lang="stylus">
.commonPicker
  width 100%;
</style>
