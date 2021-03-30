<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped lang="stylus">
.card
  background-color white;
  padding 10px 30px;
  border-radius 30px;
  /* box-shadow:0px 0px 20px 0px rgba(50,182,252,0.3); */
  position relative;
  overflow hidden;
.card >>> .title
  color $colorTitle;
  font-size $fontSizeL;
  font-weight bold;
.card >>> .title-note
  color $colorTitleNote;
  font-size $fontSizeN;
  margin 10px 0;
</style>
