<template>
  <div class="index-card"
    :style="'width:' + width">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IndexCard',
  props: {
    width: {
      default: '72vw'
    }
  }
}
</script>

<style scoped lang="stylus">
.index-card
  height 240px;
  margin 10px 1vw;
  background-color white;
  padding 30px 3vw;
  flex-grow 0;
  flex-shrink 0;
  border-radius 5px;
  box-shadow 0px 0px 40px 0px rgba(50, 182, 252, 0.3);
  position relative;
  overflow hidden;
.background-card
  background-image url('../../../assets/images/index/login_card.png');
  background-size cover;
  background-position bottom;
  background-repeat no-repeat;
.index-card >>> .title
  color $colorTitle;
  font-size $fontSizeL;
.index-card >>> .title-note
  color $colorTitleNote;
  font-size $fontSizeN;
  margin 10px 0;
</style>
