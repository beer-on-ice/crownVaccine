<template>
  <div class="card-group-wrap"
    @touchstart="startSliding($event)"
    @mousedown="startSliding($event)"
    @touchmove="setSliding($event)"
    @mousemove="setSliding($event)"
    @touchend="endSliding($event)"
    @mouseup="endSliding($event)">
    <div style="width: 100%;"
      class="flex-center"
      v-if="!login">
      <ss-login-card></ss-login-card>
    </div>
    <div style="width: 100%;"
      class="flex-center"
      v-else-if="!children || !children.length">
      <ss-no-child-card></ss-no-child-card>
    </div>
    <div class="card-group-inner flex-nowrap"
      :class="startX===0?'':'on-touch'"
      :style="'margin-left:' + marginLeft + 'px;'"
      v-else>
      <ss-child-card v-for="(item, index) in children"
        :key="index"
        :child="item"></ss-child-card>
    </div>
  </div>
</template>

<script>
import LoginCard from './LoginCard'
import NoChildCard from './NoChildCard'
import ChildCard from './ChildCard'
export default {
  name: 'cardGroup',
  components: {
    'ss-login-card': LoginCard,
    'ss-no-child-card': NoChildCard,
    'ss-child-card': ChildCard
  },
  data () {
    return {
      children: [],
      startX: -1,
      endX: 0,
      scrollX: 0,
      marginLeft: 0,
      lastEndX: 0
    }
  },
  watch: {
    endX (val) {
      let left = val - this.startX - this.scrollX
      if (left > 0) {
        left = 0
      }

      if (left < -this.maxLeft) {
        left = -this.maxLeft
      }
      this.marginLeft = left
    }
  },
  computed: {
    login () {
      return true // sessionStorage.getItem('token');
    },
    maxLeft () {
      let cardWidth = document.body.clientWidth * 0.8
      return cardWidth * (this.children.length - 1)
    },
    currentBaby () {
      // todo
      return ''
    }
  },
  methods: {
    startSliding (evt) {
      if (!evt.targetTouches) {
        return
      }
      this.lastEndX = evt.targetTouches[0].clientX
      this.startX = evt.targetTouches[0].clientX
      this.endX = evt.targetTouches[0].clientX
    },
    endSliding (evt) {
      let cardWidth = document.body.clientWidth * 0.8
      if (this.lastEndX < this.endX && (this.endX - this.lastEndX) > 3.5) {
        this.scrollX = -Math.ceil((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      } else if ((this.lastEndX - this.endX) > 3.5) {
        this.scrollX = -Math.floor((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      } else {
        this.scrollX = -Math.round((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      }
      this.lastEndX = 0
      this.startX = 0
      this.endX = -1
      this.$nextTick(() => {
        this.endX = 0
      })
    },
    setSliding (evt) {
      if (!evt.targetTouches) {
        return
      }
      this.lastEndX = this.endX
      this.endX = evt.targetTouches[0].clientX
      // evt.preventDefault();
    }
  },
  mounted () {
    this.children = [{ name: '测试' }, { name: 'bbb' }, { name: 'ccc' }, { name: 'ddd' }, { name: 'eee' }, { name: 'fff' }]
    this.$nextTick(() => {
      this.startX = 0
    })
  }
}
</script>

<style scoped lang="stylus">
.card-group-wrap
  width 100%;
  overflow hidden;
.card-group-inner
  padding 0 10vw;
  transition all 0.8s linear;
.on-touch
  transition none;
</style>
