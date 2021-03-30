<template>
  <ss-index-card>
    <div class="flex-common">
      <ss-avatar :img="child.headimg"
        style="margin-right: 20px;"></ss-avatar>
      <div class="flex-column">
        <div class="flex-common"
          style="align-items: flex-end;">
          <span class="child-name margin-right">{{ child.name }}</span>
          <img style="margin-bottom: 4px;"
            class="common-icon"
            :src="require('@/assets/images/index/identified.png')"
            v-if="child.identified" />
          <img style="margin-bottom: 4px;"
            class="common-icon"
            :src="require('@/assets/images/index/unidentified.png')"
            v-else />
          <span class="margin-left">10岁4月</span>
        </div>
        <div class="flex-common"
          style="align-items: flex-end;">
          <span class="child-info margin-right">体重：36kg</span>
          <span class="child-info margin-right">身高：114cm</span>
          <img class="common-icon"
            :src="require('@/assets/images/index/edit_button.png')" />
        </div>
      </div>
    </div>
    <div class="flex-common">
      <ss-icon iconType="clock"
        style="margin: 10px 10px 10px 0;"></ss-icon>
      <marquee class="flex-grow marquee"
        scrollamount="2">测试测试</marquee>
    </div>
    <div class="flex-column bespeak-info">
      <div class="main-class flex-center"
        style="color: #2B538F;"
        v-if="false">您无可预约的接种疫苗!</div>
      <div class="main-class flex-space-between"
        style="color: #2B538F;"
        v-if="true">
        <div class="flex-column van-multi-ellipsis--l3"
          style="align-items: center;">
          <div class="flex-common">
            <ss-icon iconType="bespeak-time margin-left margin-right"></ss-icon>
            <span class="font-small">2010-01-01</span>
            <ss-icon iconType="bespeak-more margin-left margin-right"></ss-icon>
          </div>
          <div class="flex-common">
            <ss-icon iconType="bespeak-bact margin-left margin-right"></ss-icon>
            <span class="font-small">XXXXXX疫苗1</span>
          </div>
          <div class="flex-common">
            <ss-icon iconType="bespeak-bact margin-left margin-right"></ss-icon>
            <span class="font-small">XXXXXX疫苗2</span>
          </div>
        </div>
        <div class="flex-center flex-const">
          <img class="img-button"
            :src="require('@/assets/images/index/button_sign.png')"
            v-if="true" />
          <img class="img-button"
            :src="require('@/assets/images/index/button_bespeak.png')"
            v-if="false" />
        </div>
      </div>
    </div>
  </ss-index-card>
</template>

<script>
import IndexCard from './IndexCard'
export default {
  name: 'ChildCard',
  components: {
    'ss-index-card': IndexCard
  },
  props: {
    child: {
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.child-name
  font-size 36px;
.child-info
  font-size $fontSizeS;
.marquee
  color $colorTitle;
  font-size $fontSizeS;
.bespeak-info
  background-image url('../../../assets/images/index/bespeak_info.png');
  background-size contain;
  height 108px;
  margin 10px 0;
</style>
