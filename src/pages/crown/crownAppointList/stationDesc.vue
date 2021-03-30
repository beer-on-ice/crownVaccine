<template>
  <div class="station-desc-wrapper">
    <ss-header title="数字化门诊说明"
      @backClick="goBack"></ss-header>
    <div class="desc"
      v-html="desc"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      desc: ''
    }
  },
  methods: {
    async getStationNumberDescInfo () {
      const param = {
        update_time: '1980-01-01'
      }
      const res = await this.$api.crownAppoint.getStationNumberDescInfo(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.desc = res.data.number_desc
        this.popListFlag = true
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  created () {
    this.getStationNumberDescInfo()
  }
}
</script>

<style lang="stylus">
.station-desc-wrapper
  width 100%;
  height 100%;
  background-image url('../../../assets/images/common/page_background.png');
  background-size cover;
  .desc
    margin 0 20px 0;
    padding 20px 20px;
    border-radius 20px;
    background #fff;
    height calc(100% - 200px);
    overflow-y scroll;
</style>
