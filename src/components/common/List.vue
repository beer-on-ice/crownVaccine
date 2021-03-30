<template>
  <div class="listWrapper">
    <van-pull-refresh :value="refreshing"
      @refresh="onRefresh">
      <van-list :value="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="onLoad">
        <slot></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      default: () => ([]),
      type: Array,
      required: true
    },
    finishedText: {
      default: '暂无更多数据',
      type: String,
      required: false
    },
    loading: {
      default: false,
      type: Boolean,
      required: true
    },
    finished: {
      default: false,
      type: Boolean,
      required: true
    },
    refreshing: {
      default: false,
      type: Boolean,
      required: true
    }
  },
  methods: {
    onLoad () {
      this.$emit('loadData')
    },
    onRefresh () {
      this.$emit('onRefresh')
    }
  }
}
</script>

<style lang="stylus">
.listWrapper
  width 100%;
</style>
