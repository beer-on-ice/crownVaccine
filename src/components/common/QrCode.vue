<template>
  <div class="qrcode"
    ref="qrCodeUrl"></div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'vueQr',
  props: {
    width: {
      required: false,
      default: 200
    },
    height: {
      required: false,
      default: 200
    },
    text: {
      required: false,
      default: ''
    }
  },
  methods: {
    creatQrCode () {
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.text,
        width: this.width,
        height: this.height,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  },
  mounted () {
    this.creatQrCode()
  }

}
</script>

<style lang="stylus" scoped>
.crown-appoint-detail
  background #f6f6f6;
</style>
