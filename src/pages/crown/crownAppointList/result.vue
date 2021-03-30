<template>
  <ss-page-simple backgound="#F6F6F6"
    title="预订成功">
    <div class="qrcode-area flex-center flex-column">
      <div class="info">请将此二维码展示给医生</div>
      <qr-code :text="12312312312"></qr-code>
    </div>
    <ss-card class="margin-item"
      style="margin-top: 20px;">
      <div class="title flex-space-between">
        <div class="flex-center"
          style="margin: 5px 0;">
          <ss-icon iconType="bespeak"
            size="28px"></ss-icon>
          <div style="font-size: 14px;">预订单详情</div>
        </div>
      </div>
      <div class="flex-column">
        <div class="bact-class">
          <div style="margin: 15px;">新型冠状疫苗（第1剂次）</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">疫苗制品</div>
          <div class="text">XXXX</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">生产厂家</div>
          <div class="text">XXXX</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">受种者姓名</div>
          <div class="text">XXXX</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">身份证号码</div>
          <div class="text">XXXX</div>
        </div>
        <div class="flex-space-between item-no-line">
          <div class="info">预订时间</div>
          <div class="text">2019-01-01 11:00-12:00</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">预订门诊</div>
          <div class="text">XXXX</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info" style="font-size: 12px;">备注说明</div>
          <div class="text" style="font-size: 12px;color: #FFAB3E;">XXXX</div>
        </div>
      </div>
    </ss-card>
    <div class="flex-space-between"
      style="margin: 20px;">
      <ss-button style="margin: 20px 0;width: 46%;"
        @click="goNext()">
        取消预订
      </ss-button>
      <ss-button style="margin: 20px 0;width: 46%;"
        @click="goNext()">
        <ss-icon iconType="home"
          size="14px"
          style="margin-right: 4px;"></ss-icon>返回首页
      </ss-button>
    </div>
  </ss-page-simple>
</template>

<script>
import QrCode from '@/components/common/QrCode'
export default {
  components: {
    QrCode
  },
  data () {
    return {}
  },
  methods: {
    goNext() {
      this.$utils.goPage('./result')
    }
  }
}
</script>

<style scoped lang="stylus">
.qrcode-area
  background-color white;
  border-radius 10px;
  padding 40px;
  margin 20px 60px;
  .info
    color #FFAB3E;
    margin-bottom 50px;
.bact-class
  background-color #F8F8FA;
  border-left 8px solid #5DC2FA;
  margin 20px 0;
.title
  border-bottom 1px dashed $colorShadow;
.item-line, .item-no-line
  padding 24px 0;
  font-size 32px;
.item-line
  border-bottom 1px dashed $colorShadow;
  .text
    color #353535;
</style>
