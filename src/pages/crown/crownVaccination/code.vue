<template>
  <div class="crown-vaccination-code-wrapper full-screen-s">
    <ss-header title="新冠移动接种二维码"
      :leftArrow="false">
      <template #right>
        <p @click="close">关闭</p>
      </template>
    </ss-header>
    <div class="main full-screen">
      <div class="wrapper">
        <div class="top">
          <p>{{name}}</p>
          <p>{{cid}}</p>
        </div>
        <div class="center">
          <div class="qr">
            <h3>新冠移动接种二维码</h3>
            <div class="code fl-c-c">
              <qr-code v-if="qrCodeValue"
                :text="qrCodeValue"></qr-code>
            </div>
            <p class="tip">请将此二维码展示给医生</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from '@/components/common/QrCode'
export default {
  components: {
    QrCode
  },
  data () {
    return {
      name: '',
      cid: '',
      qrCodeValue: ''
    }
  },
  methods: {
    async getUserXG () {
      const {
        $api: {
          crown: { getUserXG }
        }
      } = this
      const userName = sessionStorage.getItem('user')
      const res = await getUserXG({ user_name: userName })
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('获取新冠受种者二维码:', res.data)
        this.qrCodeValue = res.data.qrCodeValue || ''
        this.name = res.data.name
        this.cid = res.data.cid
      }
    },
    close () {
      if (this.$route.query.from === 'crownVaccination') {
        window.location.href = '/HAINANZHYYJMBWeb/main.html'
      } else {
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.getUserXG()
  }
}
</script>

<style lang="stylus">
.crown-vaccination-code-wrapper
  width 100%;
  height 100%;
  background-color #efeff4;
  .main
    padding-top 150px;
    text-align center;
    .top
      margin 0 30px;
      border-bottom 2px dashed #ccc;
      p
        color #000;
        font-size 32px;
    .center
      color #000;
    .tip
      color #ffa126;
    .wrapper
      width 90%;
      padding 20px 0;
      background #fff;
      margin 0 auto;
      border-radius 20px;
</style>
