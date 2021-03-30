<template>
  <div class="headTitleWrapper"
    v-show="!isShare">
    <van-nav-bar :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :fixed="fixed"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #right>
        <slot name="right"></slot>
      </template>
      <template #left>
        <slot name="left"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'HeadTitle',
  data () {
    return {
      isShare: 1
    }
  },
  props: {
    title: {
      required: false,
      type: String,
      default: ''
    },
    rightText: {
      required: false,
      type: String,
      default: ''
    },
    leftText: {
      required: false,
      type: String,
      default: ''
    },
    leftArrow: {
      required: false,
      type: Boolean,
      default: true
    },
    fixed: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('backClick')
    },
    onClickRight () {
      this.$emit('editClick')
    }
  },
  created () {
    this.isShare = this.$route.query.isShare
  }
}
</script>

<style lang="stylus">
.headTitleWrapper
  width 100%;
  height 100px;
  .van-nav-bar
    background rgb(29, 176, 254);
    color #fff;
    &.van-hairline--bottom::after
      border-bottom none;
      border-bottom-width 0;
    .van-icon-arrow-left
      color #fff;
    .van-nav-bar__title
      color #fff;
    .van-nav-bar__content
      height 100px;
</style>
