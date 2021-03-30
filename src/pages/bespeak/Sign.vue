<template>
  <ss-page-simple backgound="transparent"
    title="签核">
    <div class="flex-center white font-small">请在下面空白处签署您的姓名（请用正楷体签字）</div>
    <ss-card class="margin-item scroll flex-column"
      style="height: calc(100% - 80px);margin-bottom: 0;">
      <vue-esign ref="canvas"
        :width="w"
        :height="h"></vue-esign>
      <div class="margin-item flex-space-between"
        style="margin-bottom: 0;height: 64px;overflow: hidden;">
        <div class="button-reset">
          <img class="img-button margin-right"
            style="height: 128px;"
            :src="require('@/assets/images/bespeak/clear_button.png')"
            @click="resetSign" />
        </div>
        <ss-button class="flex-grow"
          @click="confirmSign">保存</ss-button>
      </div>
    </ss-card>
  </ss-page-simple>
</template>

<script>
import vueEsign from 'vue-esign'
import Vue from 'vue'

Vue.use(vueEsign)
export default {
  name: 'Sign',
  data () {
    return {
      sign: null,
      w: document.body.clientWidth - 60,
      h: document.body.clientHeight - 150
    }
  },
  methods: {
    resetSign () {
      this.$refs.canvas.reset()
    },
    confirmSign () {
      this.$refs.canvas
        .generate()
        .then(res => {
          this.$utils.goBack()
        })
        .catch(() => {
          this.$dialog.alert({
            title: '提示',
            message: '请书写签名！'
          })
        })
    }
  }
}
</script>

<style scoped lang="stylus"></style>
