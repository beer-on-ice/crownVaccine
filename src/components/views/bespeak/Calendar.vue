<template>
  <div class="flex-column">
    <div class="tip flex-center">
      橙色日期为可选预订日期
    </div>
    <div class="margin-item-calendar flex-center">
      <img @click="changeMonth(-1)"
        class="img-button icon-size"
        :src="require('@/assets/images/bespeak/calendar_left.png')"
        v-if="showLeft" />
      <div class="icon-size"
        v-else></div>
      <div class="margin-left title">{{ year }}年{{ month }}月</div>
      <img @click="changeMonth(1)"
        class="img-button icon-size margin-left"
        :src="require('@/assets/images/bespeak/calendar_right.png')"
        v-if="showRight" />
      <div class="icon-size"
        v-else></div>
    </div>
    <div class="margin-item-calendar flex-nowrap">
      <div class="flex-grow date-title"
        :key="index"
        v-for="(item, index) in textList">{{ item }}</div>
    </div>
    <div class="margin-item-calendar flex-wrap">
      <div @click="changeDate(item)"
        class="flex-grow date-content"
        :key="index"
        v-for="(item, index) in dateList">
        <div :class="(item.isToday ? 'today' : '') + (item.selectable ? ' selectable' : '') + (item.date === selectedDate ? ' selected' : '')">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    value: {
      required: false
    },
    data: {
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      year: 1900,
      month: 1,
      selectedDate: 1,
      textList: ['日', '一', '二', '三', '四', '五', '六'],
      val: this.value
    }
  },
  watch: {
    value (val) {
      this.val = val
    },
    val (val) {
      this.$emit('input', val)
    },
    data (val) {
      this.$nextTick(() => {
        this.resetDate()
      })
    }
  },
  computed: {
    selectableList () {
      if (!this.data || !this.data.length) {
        return []
      }
      return this.data.filter(item => {
        let datearr = this.$utils.getDateArr(item.date_day)
        return datearr[0] === this.year && datearr[1] === this.month
      })
    },
    dateList () {
      const startWeekday = new Date(this.year, this.month - 1, 1).getDay()
      let arr = []
      for (let i = 0; i < startWeekday; i++) {
        arr.push({})
      }
      const endDate = new Date(this.year, this.month, 0)
      const endday = endDate.getDate()
      for (let i = 1; i <= endday; i++) {
        let datestr = this.$utils.formatDate(new Date(this.year, this.month - 1, i))
        let filter = this.selectableList.filter(item => {
          return item.date_day === datestr
        })
        arr.push({
          date: i,
          isToday: datestr === this.$utils.today(),
          selectable: !!filter.length,
          work_time_list: filter.length ? filter[0].work_time_list : []
        })
      }
      const endWeekday = endDate.getDay()
      for (let i = endWeekday + 1; i <= 6; i++) {
        arr.push({})
      }
      return arr
    },
    minMonth () {
      if (!this.data || !this.data.length) {
        return null
      }
      return this.$utils.getDateArr(this.data[0].date_day)
    },
    maxMonth () {
      if (!this.data || !this.data.length) {
        return null
      }
      return this.$utils.getDateArr(this.data[this.data.length - 1].date_day)
    },
    showLeft () {
      if (!this.minMonth || !this.minMonth[0]) {
        return false
      }
      // if (this.year < this.minMonth[0]) {
      //   return false
      // }
      // if (this.year === this.minMonth[0] && this.month <= this.minMonth[1]) {
      //   return false
      // }
      return true
    },
    showRight () {
      if (!this.maxMonth || !this.maxMonth[0]) {
        return false
      }
      // if (this.year > this.maxMonth[0]) {
      //   return false
      // }
      // if (this.year === this.maxMonth[0] && this.month >= this.maxMonth[1]) {
      //   return false
      // }
      return true
    }
  },
  methods: {
    changeMonth (interval) {
      this.month += interval
      if (this.month === 0) {
        this.year -= 1
        this.month = 12
      }
      if (this.month === 13) {
        this.year += 1
        this.month = 1
      }
      this.$nextTick(() => {
        let arr = this.selectableList.length ? this.selectableList[0].date_day : ''
        // let arr = this.selectableList[0].date
        if (arr !== '') arr = arr.split('-')
        this.selectedDate = arr.length ? Number(arr[2]) : ''
      })
      this.$emit('changeMonth')
    },
    changeDate (item) {
      if (!item.selectable) {
        return
      }
      this.selectedDate = item.date
      this.val = item.work_time_list
      let currDate = `${this.year}-${String(this.month).padStart(2, 0)}-${String(this.selectedDate).padStart(2, 0)}`
      this.$emit('selectDate', { currDate: currDate, list: item.work_time_list })
    },
    resetDate () {
      if (this.data && this.data.length) {
        let arr = this.$utils.getDateArr(this.data[0].date_day)
        this.year = arr[0]
        this.month = arr[1]
        this.selectedDate = Number(arr[2])
        this.val = this.data[0].work_time_list
        this.$emit('selectDate', { currDate: this.selectableList[0].date_day, list: this.data[0].work_time_list })
      }
    }
  },
  created () {
    this.resetDate()
  }
}
</script>

<style scoped lang="stylus">
.tip
  height 60px;
  background-color #F8F9FC;
  color $colorYellow;
  font-weight bold;
.title
  color $colorMain;
  margin 0 48px;
.icon-size
  width 42px;
  height 28px;
.date-title
  width 14%;
  color $colorMain;
  text-align center;
.date-content
  width 14%;
  color $colorTitleNote;
  text-align center;
  cursor pointer;
.date-content div
  width 64px;
  height 64px;
  line-height 64px;
  border-radius 10px;
  margin 0 auto;
  text-align center;
.today
  position relative;
.today:after
  content '.';
  font-size $fontIconLarge;
  position absolute;
  bottom -16px;
  left 0;
  right 0;
  text-align center;
  color red;
.selectable
  color $colorYellow;
.selected
  background-color $colorYellow;
  color $colorHeader;
.margin-item-calendar
  margin 10px 0;
</style>
