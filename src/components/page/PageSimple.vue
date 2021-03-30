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
    <div class="page-content"
      :style="'background-color:' + backgound">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'PageSimple',
  components: {
    [NavBar.name]: NavBar
  },
  props: {
    title: {
      required: false
    },
    backgound: {
      default: 'white'
    }
  }
}
</script>

<style scoped lang="stylus">
.page-container
  background-size 100% 100%;
  background-image url('../../assets/images/common/page_background.png');
.page-header
  padding 12px 24px 0 24px;
  height 100px;
  font-size $fontSizeHeader;
  color $colorHeader;
  width calc(100% - 48px);
  position relative;
.page-header-left, .page-header-right
  font-size $fontSizeS;
  cursor pointer;
.page-content
  position relative;
  overflow auto;
  height calc(100% - 124px);
</style>
