<template>
  <ss-page-simple backgound="transparent"
    title="接种预约">
    <ss-card class="margin-item"
      style="margin-bottom: -50px;z-index: 999;">
      <div class="flex-space-between">
        <div class="flex-common"
          style="align-items: flex-start;margin-top: 4px;">
          <img :src="require('@/assets/images/bespeak/index_title.png')"
            style="height: 80px;" />
          <div class="bespeak-title">{{ bespeakDate }}</div>
        </div>
        <img :src="require('@/assets/images/bespeak/bespeak_desc.png')"
          style="height: 48px;margin-top: -16px;margin-right: -30px;" />
      </div>
      <div class="bespeak-note flex-center">
        <ss-icon iconType="bespeak-note"
          size="36px"></ss-icon>
        <div class="margin-left">点击疫苗名称，可以查看疫苗详情</div>
      </div>
    </ss-card>
    <div class="main-class scroll"
      style="height: calc(100% - 320px);padding-top: 50px;padding-bottom: 20px;">
      <template v-for="(item, index) in bespeakList">
        <div :key="'div' + index"
          class="margin-item bespeak-bact-title flex-common">
          <ss-icon iconType="bespeak-shot"></ss-icon>
          <div class="margin-left">{{ item.bactname }}</div>
        </div>
        <ss-card :key="'card' + index"
          class="margin-item">
          <div class="margin-item bespeak-product-title">{{ item.bactname }}（第{{ item.bactname }}剂次）</div>
          <div class="margin-item bespeak-card-note"
            v-if="item.children.length">
            以下疫苗
            <span class="yellow">{{ item.children.length }}选1</span>
          </div>
          <div class="bespeak-card-child"
            :key="'child' + cind"
            v-for="(child, cind) in item.children">
            <div class="margin-left flex-common">
              <ss-checkbox v-model="item.checked"
                :label="item.name"></ss-checkbox>
              <div class="margin-left">{{ child.bactname }}</div>
            </div>
            <img class="charge-item"
              :src="require('@/assets/images/bespeak/charge_item.png')"
              v-if="child.charge" />
          </div>
        </ss-card>
      </template>
    </div>
    <div class="fixed-bottom">
      <ss-button class="flex-grow"
        style="width: 30%;margin: 0 20px;"
        @click="nextStep">下一步</ss-button>
      <ss-button class="flex-grow"
        style="width: 30%;margin: 0 40px;"
        v-if="$store.state.payFlag">直接付款</ss-button>
    </div>
  </ss-page-simple>
</template>

<script>
import currentBaby from '@/mixins/currentBaby'
export default {
  name: 'BespeakIndex',
  mixins: [currentBaby],
  data () {
    return {
      bespeakDate: '',
      bespeakList: []
    }
  },
  methods: {
    nextStep () {
      this.$utils.goPage('./mrc')
    }
  },
  created () {
    this.bespeakDate = '2020-05-05'
    this.bespeakList = [
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] },
      { bactname: 'aaaa', children: [{ bactname: 'bbb' }, { bactname: 'ccc' }, { bactname: 'ddd' }] }
    ]
  }
}
</script>

<style scoped lang="stylus">
.bespeak-title
  font-size $fontSizeHeader;
  font-weight bold;
.bespeak-note
  margin 10px 0;
  padding 20px;
  background-color #fff5f8;
  color #f34a4d;
  border-radius 40px;
.bespeak-bact-title
  align-items center;
  color $colorTitle;
  font-size $fontSizeS;
.bespeak-product-title
  color $colorTitle;
.bespeak-card-note
  color $colorTitle;
  font-size $fontSizeS;
.bespeak-card-child
  background-color #f9fbfd;
  color $colorTitle;
  margin 10px;
  padding 10px;
  position relative;
  border-radius 10px;
  overflow hidden;
.charge-item
  position absolute;
  top 0;
  right 0;
  height $fontSizeL;
</style>
