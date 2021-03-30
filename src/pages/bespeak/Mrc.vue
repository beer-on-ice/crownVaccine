<template>
  <ss-page-simple backgound="transparent"
    title="电子知情告知书">
    <ss-card class="margin-item scroll"
      style="height: calc(100% - 40px);margin-bottom: 0;">
      <ss-no-data v-if="false">《XXX疫苗》获取不到电子知情告知书，请到现场签署！</ss-no-data>
      <div class="mrc-content"
        v-html="content"></div>
    </ss-card>
    <div class="mrc-fixed-bottom">
      <div class="flex-column">
        <div class="flex-space-between">
          <div class="flex-column flex-no-grow">
            <div class="flex-common">
              <ss-checkbox-yellow v-model="mrcChecked"
                label="1"></ss-checkbox-yellow>
              <div class="margin-left">我已阅读并同意接种</div>
            </div>
            <div class="flex-common">
              <ss-checkbox-yellow v-model="mrcChecked"
                label="2"></ss-checkbox-yellow>
              <div class="margin-left">我已阅读，不同意接种</div>
            </div>
            <div class="flex-common">
              <ss-checkbox-yellow v-model="mrcChecked"
                label="3"></ss-checkbox-yellow>
              <div class="margin-left">到接种点再考虑</div>
            </div>
          </div>
          <div class="flex-grow flex-center"
            v-if="signed"><img style="max-width: 70%;max-height: 100%;"
              :src="require('@/assets/images/bespeak/signed.png')" /></div>
        </div>
        <ss-button style="margin: 20px 0;"
          :disabled="cnt > 0"
          @click="nextStep">
          <span v-if="cnt > 0">倒计时（{{ cnt }}S）</span>
          <span v-else>下一步</span>
        </ss-button>
      </div>
    </div>
  </ss-page-simple>
</template>

<script>
import yRadio from '@/components/views/bespeak/Radio'
export default {
  name: 'BespeakMrc',
  components: {
    'ss-checkbox-yellow': yRadio
  },
  data () {
    return {
      content: '',
      mrcChecked: null,
      cnt: 3,
      signed: true
    }
  },
  methods: {
    countDown () {
      this.cnt--
      if (this.cnt <= 0) {
        return
      }
      setTimeout(this.countDown, 1000)
    },
    nextStep () {
      if (this.mrcChecked === 3) {
        this.$utils.goPage('./stationTime')
        return
      }
      if (this.mrcChecked === 2) {
        this.$utils.goPage('/index')
        return
      }
      if (!this.signed) {
        this.$utils.goPage('./sign')
        return
      }
      this.$utils.goPage('./stationTime')
    }
  },
  mounted () {
    setTimeout(this.countDown, 1000)
  }
}
</script>

<style scoped lang="stylus">
.mrc-fixed-bottom
  position absolute;
  left 60px;
  right 60px;
  bottom 20px;
  line-height 80px;
</style>
