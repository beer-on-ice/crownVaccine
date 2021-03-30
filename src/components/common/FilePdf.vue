<template>
  <div class="distributionList-mask">
    <div class="card-box">
      <!-- <vue-scroll> -->
      <div id="demo"></div>
      <!-- </vue-scroll> -->
      <!-- <div @click="closeMask"
        class="close-icon"><img class="img-block"
          src="@/assets/img/close-icon.png"
          alt=""></div> -->
    </div>
    <water-mark :inputText="markText"
      :inputDestroy="true"
      :inputAllowDele="true"></water-mark>
  </div>
</template>
<script>
import WaterMark from './WaterMark'
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
export default {
  components: {
    WaterMark
  },
  props: ['productContent', 'pdfUrl', 'markText'],
  data () {
    return {
      pdfh5: null,
      show: true
    }
  },
  mounted () {
    this.pdfh5 = new Pdfh5('#demo', {
      pdfurl: this.pdfUrl,
      lazy: true
      // background: { color: '#fff', image: "url('https://i.loli.net/2021/02/08/Ml2srB7zXHptJbo.jpg')", position: "left top", size: "cover" }
    })
    this.pdfh5.on('complete', (status, msg, time) => {
      console.log('状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum)
    })
  },
  methods: {
    closeMask () {
      this.$emit('closeMask')
    }
  },
  beforeDestroy () {
    this.show = false
  }
}
</script>

<style lang="stylus" scoped>
.distributionList-mask
  position fixed;
  left 0;
  right 0;
  top 100px;
  bottom 0;
  background-color #e6c498;
  overflow hidden;
  z-index 999;
  .card-box
    position absolute;
    height 100%;
    left 0;
    right 0;
    background #fff;
    z-index 999;
    padding 0.1rem;
.close-icon
  width 0.35rem;
  height 0.35rem;
  position absolute;
  bottom -0.38rem;
  left 50%;
  transform translateX(-50%);
/deep/.vBarVisible
  overflow visible !important;
  .__panel
    overflow scroll !important;
  .__rail-is-vertical
    right -0.05rem !important;
</style>
