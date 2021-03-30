<template>
  <ss-page-simple class="sign-wrapper"
    backgound="transparent">
    <ss-header title="签核"
      @backClick="goBack"></ss-header>
    <div class="flex-center white font-small">请在下面空白处签署您的姓名（请用正楷体签字）</div>
    <ss-card class="margin-item scroll flex-column"
      style="height: calc(100% - 40px);margin-bottom: 0;">
      <vue-esign ref="canvas"
        :width="w"
        :height="h"></vue-esign>
      <div class="margin-item flex-space-between"
        style="margin-bottom: 0;height: 64px;overflow: hidden;">
        <div class="button-reset">
          <img class="img-button margin-right"
            style="height: 72px;"
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
import { mapMutations, mapGetters } from 'vuex'
import vueEsign from 'vue-esign'
import Vue from 'vue'

Vue.use(vueEsign)
export default {
  name: 'Sign',
  data () {
    return {
      sign: null,
      w: document.body.clientWidth - 60,
      h: document.body.clientHeight - 160
    }
  },
  computed: {
    ...mapGetters(['priceId', 'bactId', 'childCode', 'vaccineCode', 'stationCode', 'productNo', 'factoryNo', 'signed'])
  },
  methods: {
    ...mapMutations([
      'setsigned'
    ]),
    async approveVaccineRemindCheckImg (tofile) {
      const { bactId, childCode, vaccineCode } = this
      const param = {
        photo_key: tofile,
        vaccine_code: vaccineCode,
        bactId: bactId,
        child_code: childCode
      }
      const res = await this.$api.crownAppoint.approveVaccineRemindCheckImg(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('提交签名', res)
        this.$toast('提交签字成功！')
        this.setsigned(1)
        this.$router.replace({
          name: 'crownAppointStationMrc',
          query: {
            fromIndex: this.$route.query.fromIndex
          }
        })
      }
    },
    dataURLtoBlob (dataurl) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // 将blob转换为file
    blobToFile (theBlob, fileName) {
      theBlob.lastModifiedDate = new Date()
      theBlob.name = fileName
      return theBlob
    },
    resetSign () {
      this.$refs.canvas.reset()
    },
    confirmSign () {
      this.$refs.canvas
        .generate()
        .then(async res => {
          // 转成文件
          var blob = this.dataURLtoBlob(res)
          let files = new window.File([blob], '签名.png', { type: 'image/png' })
          setTimeout(async () => {
            await this.approveVaccineRemindCheckImg(files)
          })
        })
        .catch(() => {
          this.$dialog.alert({
            title: '提示',
            message: '请书写签名！'
          })
        })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus">
.sign-wrapper
  .headTitleWrapper
    height auto;
</style>
