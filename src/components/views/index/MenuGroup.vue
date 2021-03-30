<template>
  <div class="card-group-wrap"
    @touchstart="startSliding($event)"
    @mousedown="startSliding($event)"
    @touchmove="setSliding($event)"
    @mousemove="setSliding($event)"
    @touchend="endSliding($event)"
    @mouseup="endSliding($event)">
    <div class="card-group-inner flex-nowrap"
      :class="startX === 0 ? '' : 'on-touch'"
      :style="'margin-left:' + marginLeft + 'px;'">
      <div class="each-card flex-wrap"
        :key="'card' + index1"
        v-for="(card, index1) in menuList">
        <div class="menu-card flex-center flex-column flex-grow"
          :key="'menu' + index2"
          v-for="(item, index2) in card"
          @click="checkGoPage(item)">
          <ss-icon :iconType="item.icon"
            size="10vw"
            v-if="item.icon"></ss-icon>
          <div class="menu-name"
            v-if="item.name">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div @touchstart.capture.stop.prevent
      @mousedown.capture.stop.prevent
      @touchmove.capture.stop.prevent
      @mousemove.capture.stop.prevent
      @touchend.capture.stop.prevent
      @mouseup.capture.stop.prevent
      class="menu-dot-wrap flex-center">
      <div class="menu-dot-outer flex-center"
        @click="setIndex(index)"
        :key="index"
        v-for="(card, index) in menuList">
        <div class="menu-dot"
          :class="currentIndex == index ? 'menu-dot-checked' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuGroup',
  data () {
    return {
      menuList: [
        [
          { name: '预约接种', icon: 'bespeak-menu', router: '/bespeak/index' },
          { name: '接种信息', icon: 'shotinfo-menu', router: '/shotinfo/index' },
          { name: '自助建卡', icon: 'create-menu', router: '/create/index' },
          { name: '指引消息', icon: 'message-menu', router: '/message/index' },
          { name: '接种反馈', icon: 'feedback-menu', router: '/feecback/index' },
          { name: '入学查证', icon: 'check-menu', router: '/check/index' },
          { name: '儿保预约', icon: 'bespeakeb-menu', router: '/bespeakeb-menu/index' },
          { name: '短信定制', icon: 'msgconfig-menu', router: '/msgconfig/index' }
        ],
        [
          { name: '知情告知书', icon: 'mrc-menu', router: '/mrc/index' },
          { name: '电子接种证', icon: 'shotpaper-menu', router: '/shotpaper/index' },
          { name: '家长课堂', icon: 'school-menu', router: '/school/index' },
          { name: '在线询问诊', icon: 'ask-menu', router: '/ask/index' },
          { name: 'AEFI填报', icon: 'common-menu', router: '/aefi/index' },
          { name: '疫苗知识', icon: 'knowledge-menu', router: '/knowledge/index' },
          { name: '更多', icon: 'more-menu' },
          {} // 每一页都必须有8条数据，没有用空数据补齐
        ]
      ],
      startX: 0,
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
    maxLeft () {
      let cardWidth = document.body.clientWidth
      return cardWidth * (this.menuList.length - 1)
    },
    currentIndex () {
      let cardWidth = document.body.clientWidth
      return -Math.round(this.marginLeft / cardWidth)
    }
  },
  methods: {
    checkGoPage (item) {
      if (item.needCheck) {
        // todo
        return
      }
      this.$utils.goPage(item.router)
    },
    setIndex (index) {
      let cardWidth = document.body.clientWidth
      this.scrollX = index * cardWidth
      this.startX = 0
      this.endX = -1
      this.$nextTick(() => {
        this.endX = 0
      })
    },
    startSliding (evt) {
      if (!evt.targetTouches) {
        return
      }
      this.lastEndX = evt.targetTouches[0].clientX
      this.startX = evt.targetTouches[0].clientX
      this.endX = evt.targetTouches[0].clientX
    },
    endSliding (evt) {
      let cardWidth = document.body.clientWidth
      if (this.lastEndX < this.endX && this.endX - this.lastEndX > 3.5) {
        this.scrollX = -Math.ceil((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      } else if (this.lastEndX - this.endX > 3.5) {
        this.scrollX = -Math.floor((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      } else {
        this.scrollX = -Math.round((this.marginLeft + this.endX - this.lastEndX) / cardWidth) * cardWidth
      }
      this.lastEndX = 0
      this.startX = 0
      this.endX = 0
    },
    setSliding (evt) {
      if (!evt.targetTouches) {
        return
      }
      this.lastEndX = this.endX
      this.endX = evt.targetTouches[0].clientX
      // evt.preventDefault();
    }
  }
}
</script>

<style scoped lang="stylus">
.card-group-wrap
  width 100%;
  overflow hidden;
  height 380px;
  position relative;
.card-group-inner
  transition all 0.2s linear;
.on-touch
  transition none;
.each-card
  width 88vw;
  margin 10px 3vw;
  padding 30px 3vw;
  flex-grow 0;
  flex-shrink 0;
  min-height 160px;
.menu-card
  width 25%;
  margin 10px 0;
  cursor pointer;
.menu-name
  font-size $fontSizeS;
  margin 10px 0;
.menu-dot-wrap
  width 100%;
  margin-top -64px;
.menu-dot-outer
  padding 60px 0;
  cursor pointer;
.menu-dot
  width 40px;
  height 4px;
  background-color #e0e6e2;
  margin 0 4px;
  cursor pointer;
.menu-dot-checked
  background-color $colorBackground;
</style>
