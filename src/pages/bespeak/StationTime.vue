<template>
  <ss-page-simple backgound="transparent"
    title="选择预约时间">
    <ss-card class="margin-item">
      <ss-calendar :data="data"
        v-model="currentTimeList"></ss-calendar>
    </ss-card>
    <ss-card class="margin-item">
      <div class="title flex-common">
        <ss-icon iconType="bespeak-clock margin-left margin-right"
          size="36px"></ss-icon>
        <div class="margin-left">选择预约时间段</div>
      </div>
      <div class="flex-column">
        <div class="time-single flex-space-between"
          :key="index"
          v-for="(item, index) in currentTimeList">
          <div class="flex-common flex-grow">
            <div style="margin-right: 50px;">{{ item.work_begin_time }}-{{ item.work_end_time }}</div>
            <div class="margin-left"
              :class="item.reservation_last_count === 0 || item.is_allow_reservation === 0 ? 'disabled' : ''">
              剩余：{{ item.reservation_last_count }}
            </div>
          </div>
          <div class="flex-no-grow">
            <ss-button :disabled="item.reservation_last_count === 0 || item.is_allow_reservation === 0"
              color="#2DAEF9"
              @click="goPage(item)">预约</ss-button>
          </div>
        </div>
      </div>
    </ss-card>
  </ss-page-simple>
</template>

<script>
import calendar from '@/components/views/bespeak/Calendar'
export default {
  name: 'StationTime',
  components: {
    'ss-calendar': calendar
  },
  data () {
    return {
      data: [],
      currentTimeList: []
    }
  },
  methods: {
    goPage (item) {
      if (item.reservation_last_count === 0 || item.is_allow_reservation === 0) {
        return
      }
      this.$utils.goPage('./checkBespeak')
    }
  },
  created () {
    this.data = [
      {
        date_day: '2020-01-05',
        work_time_list: [
          { work_begin_time: '08:00', work_end_time: '09:00', reservation_last_count: 0, is_allow_reservation: 0 },
          { work_begin_time: '09:00', work_end_time: '10:00', reservation_last_count: 5, is_allow_reservation: 1 },
          { work_begin_time: '10:00', work_end_time: '11:00', reservation_last_count: 5, is_allow_reservation: 1 }
        ]
      },
      {
        date_day: '2020-01-07',
        work_time_list: [
          { work_begin_time: '08:00', work_end_time: '09:00', reservation_last_count: 5, is_allow_reservation: 1 },
          { work_begin_time: '09:00', work_end_time: '10:00', reservation_last_count: 5, is_allow_reservation: 1 },
          { work_begin_time: '10:00', work_end_time: '11:00', reservation_last_count: 5, is_allow_reservation: 1 }
        ]
      },
      {
        date_day: '2020-01-08',
        work_time_list: [
          { work_begin_time: '08:00', work_end_time: '09:00', reservation_last_count: 5, is_allow_reservation: 1 },
          { work_begin_time: '09:00', work_end_time: '10:00', reservation_last_count: 5, is_allow_reservation: 1 },
          { work_begin_time: '10:00', work_end_time: '11:00', reservation_last_count: 5, is_allow_reservation: 1 }
        ]
      },
      { date_day: '2020-01-11', work_time_list: [] },
      { date_day: '2020-02-05', work_time_list: [] },
      { date_day: '2020-02-06', work_time_list: [] },
      { date_day: '2020-02-07', work_time_list: [] }
    ]
  }
}
</script>

<style scoped lang="stylus">
.time-single
  margin 10px 0;
  padding 10px;
  background-color $colorGrayLight;
  color $colorMain;
.disabled
  color $colorTitleNote;
.title
  color $colorMain;
  font-size $fontSizeN;
</style>
