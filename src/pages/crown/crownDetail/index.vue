<template>
  <div class="crownDetailWrapper">
    <ss-header :title="Number(crownDetailInfo.showNextShot)===0?'档案信息':'受种者档案'"
      @backClick="goBack">
      <p class="edit"
        slot="right"
        v-if="crownDetailInfo.editUrl"
        @click="goEdit"> <img :src="require('@/assets/images/icons/edit.png')"
          alt=""><span>编辑</span></p>
    </ss-header>
    <div v-if="Number(crownDetailInfo.personType) && Number(crownDetailInfo.showNextShot)!== 0"
      class="topSwitch">
      <div class="topTabs fl-c-c">
        <span :class="{'active':topSwitchIdx===0}"
          @click="handleTopSwitchIdx(0)">档案信息</span>
        <span v-if="Number(crownDetailInfo.showNextShot)=== 1||Number(crownDetailInfo.showNextShot)=== 3"
          :class="{'active':topSwitchIdx===1}"
          @click="handleTopSwitchIdx(1)">接种信息</span>
        <span v-if="Number(crownDetailInfo.showNextShot)=== 2||Number(crownDetailInfo.showNextShot)=== 3"
          :class="{'active':topSwitchIdx===2}"
          @click="handleTopSwitchIdx(2)">下次接种</span>
      </div>
    </div>
    <component :is="currentView"
      :info="info"
      :topAdj="topAdj"></component>
    <div v-if="topSwitchIdx === 0 && info.showBespeakButton === '1'"
      class="btn-wrapper"
      style="background:rgb(245,245,245)">
      <ss-button v-if="!reservationCode"
        size="normal"
        :disabled="disabled"
        @click="goAppoint">我要预订</ss-button>
      <ss-button v-else
        size="normal"
        :disabled="disabled"
        @click="checkAppoint">查看预订单</ss-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import File from './components/File'
import Info from './components/Info'
import Next from './components/Next'
export default {
  components: {
    File,
    Info,
    Next
  },
  data () {
    return {
      topSwitchIdx: 0,
      contentSwitchIdx: 0,
      viewArr: ['File', 'Info', 'Next'],
      reservationCode: '',
      info: {},
      crownDetailInfo: {
        personType: 1,
        showNextShot: 3
      },
      disabled: false
    }
  },
  computed: {
    currentView () {
      return this.viewArr[this.topSwitchIdx]
    },
    topAdj () {
      if (Number(this.crownDetailInfo.personType) && Number(this.crownDetailInfo.showNextShot) !== 0) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapMutations(['setFrom']),
    handleTopSwitchIdx (idx) {
      this.topSwitchIdx = idx
      sessionStorage.setItem('crownDetailIdx', String(idx))
      if (idx === 0) {
        this.getAdultUserInfo()
      }
    },
    getTabInfo () {
      const crownDetailInfo = JSON.parse(sessionStorage.getItem('crownDetailInfo'))
      this.crownDetailInfo = crownDetailInfo
    },
    async getAdultUserInfo () {
      const params = {
        child_code: this.crownDetailInfo.childCode
      }
      const res = await this.$api.crownVaccination.getAdultUserInfo(params)
      console.log('档案信息', res.data)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.info = res.data
        this.reservationCode = res.data.reservationCode

        let str = res.data.dwelladdr
        if (str != undefined && str != '') {
          this.info.dwelladdr = str.substring(
            0,
            str.lastIndexOf('.')
          )
          this.info.dwelladdrDetail = str.substring(
            str.lastIndexOf('.') + 1
          )
        }
        let str2 = res.data.regaddr
        if (str2 != undefined && str2 != '') {
          this.info.regaddr = str2.substring(
            0,
            str2.lastIndexOf('.')
          )
          this.info.regaddrDetail = str2.substring(
            str2.lastIndexOf('.') + 1
          )
        }
        this.crownDetailInfo.jmFchildno = res.data.jmFchildno
        sessionStorage.setItem('crownDetailInfo', JSON.stringify(this.crownDetailInfo))
      }
    },
    goAppoint () {
      if (Number(this.info.shotNum) === 2) {
        this.$dialog.alert({
          title: '提示',
          message: '您已完成新型冠状疫苗接种，暂不需要重复接种，祝您身体健康！'
        })
        return
      }
      this.$router.push({
        name: 'crownVaccination',
        query: {
          from: 'crownDetail'
        }
      })
    },
    checkAppoint () {
      this.setFrom('detail')
      this.$router.push({
        path: 'crownAppointDetail',
        query: {
          reservationCode: this.reservationCode
        }
      })
    },
    goEdit () {
      this.$router.push({
        name: 'crownDetailEditFile'
      })
    },
    goBack () {
      sessionStorage.removeItem('crownDetailIdx')
      this.$router.replace({
        name: 'crownList'
      })
    }
  },
  async created () {
    await this.getTabInfo()
    const crownDetailIdx = sessionStorage.getItem('crownDetailIdx')
    await this.getAdultUserInfo()
    if (crownDetailIdx) {
      this.topSwitchIdx = Number(crownDetailIdx)
    }
  }
}
</script>

<style lang="stylus">
.crownDetailWrapper
  width 100%;
  height 100%;
  .van-tabs
    background-color #efeff4;
  .van-cell
    display flex;
    align-items center;
  .edit
    display flex;
    align-items center;
    line-height 38px;
    img
      width 38px;
    .iconfont
      font-size 38px;
  .topSwitch
    width 100%;
    background rgb(29, 176, 255);
    padding 20px 0;
    position relative;
    z-index 1;
    .topTabs
      width fit-content;
      width -webkit-fit-content;
      width -moz-fit-content;
      background rgb(8, 159, 239);
      color #fff;
      margin 0 auto;
      border-radius 50px;
      span
        border-radius 50px;
        padding 10px 16px;
        margin 6px 10px;
        &.active
          background-color #fff;
          color rgb(29, 176, 255);
</style>
