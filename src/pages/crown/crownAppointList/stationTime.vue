<template>
  <ss-page-simple class="appoint-station-time-wrapper"
    backgound="transparent">
    <ss-header title="选择预订日期"
      @backClick="goBack"></ss-header>
    <ss-card class="margin-item">
      <ss-calendar :data="appointTime"
        v-model="currentTimeList"
        @selectDate="selectDate"
        @changeMonth="changeMonth"></ss-calendar>
    </ss-card>
    <ss-card class="timepic margin-item"
      v-if="appointTimeInfo.date_type === '1'">
      <div class="title flex-common">
        <ss-icon iconType="station-time"
          class="margin-left"
          size="26px"></ss-icon>
        <div class="margin-left">选择预订时间段</div>
      </div>
      <div class="flex-column">
        <div class="time-single flex-space-between"
          :key="index"
          v-for="(item, index) in currentTimeList">
          <div class="flex-common flex-grow">
            <div style="margin-right: 50px;">{{ item.work_begin_time }}-{{ item.work_end_time }}</div>
            <div class="margin-left"
              :class="Number(item.reservation_last_count) === 0 || Number(item.is_allow_reservation) === 0 ? 'disabled' : ''">
              剩余：{{ item.reservation_last_count }}
            </div>
          </div>
          <div class="flex-no-grow">
            <ss-button :disabled="Number(item.reservation_last_count) === 0 || Number(item.is_allow_reservation) === 0"
              color="#2DAEF9"
              @click="goNext(item)">&nbsp;&nbsp;&nbsp;预订&nbsp;&nbsp;&nbsp;</ss-button>
          </div>
        </div>
      </div>
    </ss-card>
    <div class="timepic margin-item"
      v-else>
      <div class="title flex-common">
        <ss-icon iconType="station-time"
          class="margin-left"
          size="26px"></ss-icon>
        <div class="margin-left">选择预订时间段</div>
      </div>
      <div class="flex-wrap flex-space-between"
        style="margin-bottom: 50px;">
        <ss-card class="time-single-big flex-center flex-column"
          :key="index"
          v-for="(item, index) in currentTimeList"
          :class="index === selectedIndex ? 'selected-item' : 'common-item'"
          @click.native="selectedIndex = index">
          <div>{{item.time_type}}({{item.work_begin_time}}-{{item.work_end_time}})</div>
          <div class="num-text">{{item.reservation_last_count}}</div>
          <div>剩余可预订名额</div>
        </ss-card>
      </div>
      <div class="time-fixed-bottom">
        <ss-button style="margin: 20px 0;width: 100%;"
          @click="goNext(currentTimeList[selectedIndex])">
          下一步
        </ss-button>
      </div>
    </div>
  </ss-page-simple>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import calendar from '@/components/views/bespeak/Calendar'
export default {
  name: 'StationTime',
  components: {
    'ss-calendar': calendar
  },
  data () {
    return {
      appointTimeInfo: {
        date_type: 1
      },
      appointTime: [],
      currentTimeList: [],
      needSign: 0,
      selectedIndex: '',
      currDate: ''
    }
  },
  computed: {
    ...mapGetters(['priceId', 'bactId', 'childCode', 'vaccineCode', 'stationCode', 'productNo', 'factoryNo'])
  },
  methods: {
    ...mapMutations([
      'setsigned',
      'setreservation_date',
      'setreservation_begin_time',
      'setreservation_end_time'
    ]),
    changeMonth () {
      this.selectedIndex = ''
    },
    selectDate (item) {
      this.selectedIndex = ''
      this.currDate = item.currDate
      this.currentTimeList = item.list
    },
    async getAdultStationDayListNew () {
      const { bactId, priceId, stationCode, childCode } = this
      const userName = sessionStorage.getItem('user')
      const param = {
        user_name: userName,
        bact_id: bactId,
        child_code: childCode,
        priceId: priceId,
        station_code: stationCode,
        type: 1
      }
      const res = await this.$api.crownAppoint.getAdultStationDayListNew(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('接种时间', res.data)
        this.appointTimeInfo = res.data
        this.appointTime = res.data.work_date
        this.needSign = res.data.needSign
      }
    },
    goNext (item) {
      if (this.appointTimeInfo.date_type !== '1' && this.selectedIndex === '') {
        this.$toast('请选择一个时间段')
        return
      }
      if (this.appointTimeInfo.date_type === '1' && item.is_allow_reservation === 0) {
        this.$toast('请选择一个时间段')
        return
      }
      this.setreservation_date(this.currDate)
      this.setreservation_begin_time(item.work_begin_time)
      this.setreservation_end_time(item.work_end_time)
      if (this.needSign === '1') {
        this.setsigned(0)
        this.$router.push({
          name: 'crownAppointStationMrc'
        })
      } else {
        this.$router.push({
          name: 'crownAppointStationCheckBespeak'
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getAdultStationDayListNew()
  }
}
</script>

<style scoped lang="stylus">
.appoint-station-time-wrapper
  .headTitleWrapper
    height auto;
.time-single
  margin 10px 0;
  padding 10px;
  background-color $colorGrayLight;
  color $colorMain;
.disabled
  color $colorTitleNote;
.timepic
  padding-bottom 100px;
.title
  color $colorMain;
  font-size $fontSizeN;
.selected-item, .common-item
  background-color white;
  margin 24px;
  line-height 2;
.selected-item
  border 2px solid $colorYellow;
.time-single-big
  min-width calc(50% - 120px);
  font-size 28px;
.num-text
  font-size 36px;
  color #040404;
  font-weight bold;
.time-fixed-bottom
  position fixed;
  left 60px;
  right 60px;
  bottom 0;
  background-color #F6F6F6;
</style>
