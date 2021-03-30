<template>
  <div class="page-container main-class flex-column">
    <div class="page-header flex-space-between flex-no-grow">
      <div class="page-header-left flex-common flex-grow">
        <span v-if="title && !$slots.left"
          @click="$utils.goBack()">
          <img class="common-icon-large"
            :src="require('@/assets/images/common/back.png')" />
        </span>
        <slot name="left"></slot>
      </div>
      <div class="page-header-center no-wrap flex-common flex-center">
        <span v-if="title && !$slots.title">{{ title }}</span>
        <slot name="title"></slot>
      </div>
      <div class="page-header-right flex-common flex-end flex-grow">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="page-content">
      <div class="page-content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'PageIndex',
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      required: false
    }
  }
}
</script>

<style scoped lang="stylus">
.page-container
  background-size 100% 100%;
  background-image url('../../assets/images/common/page_background.png');
.page-header
  padding 12px 24px 136px 24px;
  height 112px;
  font-size $fontSizeHeader;
  color $colorHeader;
  width calc(100% - 48px);
  position relative;
.page-header-left, .page-header-right
  font-size $fontSizeS;
  cursor pointer;
.page-content
  background-color white;
  position relative;
  height calc(100% - 124px);
.page-content-inner
  position absolute;
  top -144px;
  left 0;
  right 0;
  bottom 0;
  overflow auto;
</style>
