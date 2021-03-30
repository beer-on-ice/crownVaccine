<template>
  <ss-page-simple class="check-wrapper"
    backgound="transparent">
    <ss-header title="核对预订信息"
      @backClick="goBack"></ss-header>
    <ss-card class="margin-item">
      <div class="title flex-space-between">
        <div class="flex-center"
          style="margin: 5px 0;">
          <ss-icon iconType="bespeak"
            size="28px"></ss-icon>
          <div>预订信息</div>
        </div>
      </div>
      <div class="flex-column">
        <div class="flex-space-between item-line">
          <div class="info">受种者姓名</div>
          <div class="text">{{childInfo.child_name}}</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">身份证号码</div>
          <div class="text">{{childInfo.child_cid}}</div>
        </div>
        <div class="flex-space-between item-line">
          <div class="info">预订门诊</div>
          <div class="text">{{childInfo.station_name}}</div>
        </div>
        <div class="flex-space-between item-no-line">
          <div class="info">预订时间</div>
          <div class="text">{{reservation_date}} {{reservation_begin_time}}-{{reservation_end_time}}</div>
        </div>
      </div>
    </ss-card>
    <ss-card class="margin-item"
      style="margin-top: 20px;">
      <div class="title flex-space-between">
        <div class="flex-center"
          style="margin: 5px 0;">
          <ss-icon iconType="adult-ydjc"
            size="28px"></ss-icon>
          <div style="font-size: 14px;">接种疫苗详细</div>
        </div>
      </div>
      <div class="bact-item flex-column">
        <div class="bact-class">{{vaccineInfo.bactName}}（第{{vaccineInfo.vaccineCount}}剂次）</div>
        <div class="bact-content">
          <div class="bact-enter">【 {{vaccineInfo.factoryName}} 】</div>
          <div class="bact-pro">{{vaccineInfo.vaccine_producer}}</div>
        </div>
      </div>
    </ss-card>
    <ss-button style="margin: 20px 0;width: 100%;"
      @click="goNext">
      提交预订
    </ss-button>
  </ss-page-simple>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      reservationCode: '',
      childInfo: {},
      vaccineInfo: {}
    }
  },
  computed: {
    ...mapGetters(['priceId', 'bactId', 'childCode', 'vaccineCode', 'stationCode', 'productNo', 'factoryNo', 'signed', 'reservation_date', 'reservation_begin_time', 'reservation_end_time',
      'from'])
  },
  methods: {
    ...mapMutations(['setFrom']),
    async getAdultStationDayListNew () {
      const { priceId, bactId, childCode, stationCode } = this
      const userName = sessionStorage.getItem('user')
      const param = {
        user_name: userName,
        child_code: childCode,
        bact_id: bactId,
        priceId,
        station_code: stationCode,
        type: 1
      }
      const res = await this.$api.crownAppoint.getAdultStationDayListNew(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.childInfo = res.data
        console.log('核对预约信息', res.data)
      }
    },
    async getBactPriceById () {
      const { priceId, bactId, childCode, stationCode, vaccineCode } = this
      const param = {
        child_code: childCode,
        bact_id: bactId,
        station_code: stationCode,
        vaccineCode: vaccineCode,
        type: 1,
        priceId
      }
      const res = await this.$api.crownAppoint.getBactPriceById(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('核对预约疫苗的信息', res.data)
        this.vaccineInfo = res.data
      }
    },
    async saveXGReservation () {
      const { priceId, childCode, stationCode, vaccineCode } = this
      const userName = sessionStorage.getItem('user')
      const param = {
        user_name: userName,
        child_code: childCode,
        station_code: stationCode,
        vaccine_code: vaccineCode,
        priceId: priceId,
        reservation_date: this.reservation_date,
        reservation_begin_time: this.reservation_begin_time,
        reservation_end_time: this.reservation_end_time
      }
      const res = await this.$api.crownAppoint.saveXGReservation(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('提交预订', res.data)
        this.reservationCode = res.data.reservationCode
        if (this.from === 'next') {
          this.setFrom('next')
        } else {
          this.setFrom('check')
        }
        sessionStorage.removeItem('reset_factoryName')
        sessionStorage.removeItem('reset_productName')
        sessionStorage.removeItem('reset_productNo')
        sessionStorage.removeItem('reset_factoryNo')
        this.$router.push({
          name: 'crownAppointDetail',
          query: {
            reservationCode: this.reservationCode
          }
        })
      }
    },
    goNext () {
      this.saveXGReservation()
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getAdultStationDayListNew()
    this.getBactPriceById()
  }
}
</script>

<style scoped lang="stylus">
.check-wrapper
  .headTitleWrapper
    height auto;
.title
  border-bottom 1px dashed $colorShadow;
.item-line, .item-no-line
  padding 24px 0;
  font-size 32px;
.item-line
  border-bottom 1px dashed $colorShadow;
  .text
    color #353535;
    text-align right;
    max-width 70%;
.bact-item
  margin 10px;
  .bact-class
    color #0F0F0F;
    font-size 32px;
    font-weight bold;
    margin 20px 0;
  .bact-content
    background-color #F8F8FA;
    padding 20px;
    .bact-enter
      color #636C99;
      margin-bottom 20px;
    .bact-pro
      color #313030;
      margin-top 20px;
</style>
