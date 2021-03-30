<template>
  <ss-page-simple backgound="transparent"
    title="核对预约信息">
    <ss-card class="margin-item"
      style="margin-bottom: -50px;z-index: 999;">
      <div class="title flex-space-between">
        <div class="flex-center">
          <ss-icon iconType="qrcode"
            size="48px"
            style="margin: 10px;margin-top: 20px;"></ss-icon>
          <div style="margin-top: -10px;">预约信息</div>
        </div>
      </div>
      <div class="flex-column">

      </div>
    </ss-card>
  </ss-page-simple>
</template>

<script>
import vueEsign from 'vue-esign'
import Vue from 'vue'

Vue.use(vueEsign)
export default {
  name: 'CheckBespeak',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="stylus">
.title
  border-bottom 1px dashed $colorShadow;
</style>
