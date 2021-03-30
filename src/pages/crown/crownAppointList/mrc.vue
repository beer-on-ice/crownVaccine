<template>
  <ss-page-simple class="mrc-wrapper"
    backgound="transparent">
    <ss-header title="新冠疫苗知情同意书"
      @backClick="goBack"></ss-header>
    <ss-card class="margin-item scroll"
      style="height: calc(100% - 40px);margin-bottom: 0;">
      <ss-no-data v-if="false">《XXX疫苗》获取不到电子知情告知书，请到现场签署！</ss-no-data>
      <div class="mrc-content"
        v-html="content"></div>
    </ss-card>
    <div class="mrc-fixed-bottom">
      <div class="flex-column">
        <div class="flex-space-between">
          <div class="flex-column flex-no-grow">
            <div class="flex-common">
              <ss-checkbox-yellow :style="{visibility: cnt===0?'visible':'hidden'}"
                v-model="mrcChecked"
                label="0"></ss-checkbox-yellow>
              <div class="margin-left">我已阅读并同意接种</div>
            </div>
            <!-- <div class="flex-common">
              <ss-checkbox-yellow v-model="mrcChecked"
                label="2"></ss-checkbox-yellow>
              <div class="margin-left">我已阅读，不同意接种</div>
            </div>
            <div class="flex-common">
              <ss-checkbox-yellow v-model="mrcChecked"
                label="3"></ss-checkbox-yellow>
              <div class="margin-left">到接种点再考虑</div>
            </div> -->
          </div>
          <div class="flex-grow flex-center"
            v-if="signed"><img class='signedImg'
              :src="require('@/assets/images/bespeak/signed.png')" /></div>
        </div>
        <ss-button v-if="!signed"
          style="margin: 20px 0;"
          :disabled="cnt > 0"
          @click="goSign">
          <span v-if="cnt > 0">倒计时（{{ cnt }}S）</span>
          <span v-else>下一步</span>
        </ss-button>
        <ss-button v-else
          style="margin: 20px 0;"
          @click="goCheck">
          <span>下一步</span>
        </ss-button>
      </div>
    </div>
  </ss-page-simple>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import yRadio from '@/components/views/bespeak/Radio'
export default {
  name: 'BespeakMrc',
  components: {
    'ss-checkbox-yellow': yRadio
  },
  data () {
    return {
      content: '',
      mrcChecked: null,
      cnt: 3
    }
  },
  computed: {
    ...mapGetters([
      'priceId',
      'bactId',
      'childCode',
      'vaccineCode',
      'stationCode',
      'productNo',
      'factoryNo',
      'signed'
    ])
  },
  methods: {
    ...mapMutations(['setbactId', 'setchildCode']),
    countDown () {
      this.cnt--
      if (this.cnt <= 0) {
        return
      }
      setTimeout(this.countDown, 1000)
    },
    async geVaccineRemindInfo () {
      const { bactId, productNo, factoryNo, childCode, vaccineCode } = this
      const param = {
        vaccine_code: vaccineCode,
        bactId: bactId,
        child_code: childCode,
        productNo,
        factoryNo,
        update_time: ''
      }
      const res = await this.$api.crownAppoint.geVaccineRemindInfo(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('签核信息', res.data)
        this.content = res.data.vaccine_remind || ''
      }
    },
    async approveVaccineRemind () {
      const { bactId, childCode, vaccineCode, mrcChecked } = this
      const userName = sessionStorage.getItem('user')
      const param = {
        user_name: userName,
        bactId: bactId,
        child_code: childCode,
        vaccine_code: vaccineCode,
        sing_flag: mrcChecked,
        station_id: '',
        mobile_number: ''
      }
      const res = await this.$api.crownAppoint.approveVaccineRemind(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.$router.replace({
          name: 'crownAppointStationSign',
          query: {
            fromIndex: this.$route.query.fromIndex
          }
        })
      }
    },
    goCheck () {
      const { $route: {
        query: {
          fromIndex
        }
      } } = this
      if (fromIndex) {
        this.$router.push({
          name: 'crownVaccinationCode',
          query: {
            from: 'crownAppointStationMrc'
          }
        })
      } else {
        this.$router.push({
          name: 'crownAppointStationCheckBespeak'
        })
      }
    },
    async goSign () {
      if (!this.mrcChecked) {
        this.$toast('请先勾选知情同意书！')
        return
      }
      await this.approveVaccineRemind()
    },
    goBack () {
      this.$router.go(-1)
    }
    // nextStep () {
    // if (this.mrcChecked === 3) {
    //   this.$utils.goPage('./checkBespeak')
    //   return
    // }
    // if (this.mrcChecked === 2) {
    //   this.$utils.goPage('/index')
    //   return
    // }
    // }
  },
  created () {
    if (this.$route.query.bactId) {
      this.setbactId(this.$route.query.bactId)
    }
    if (this.$route.query.childCode) {
      this.setchildCode(this.$route.query.childCode)
    }
    this.geVaccineRemindInfo()
  },
  mounted () {
    if (this.signed) {
      this.cnt = 0
      this.mrcChecked = '0'
      return
    }
    setTimeout(this.countDown, 1000)
  }
}
</script>

<style scoped lang="stylus">
.mrc-wrapper
  .headTitleWrapper
    height auto;
  .margin-item
    margin-top 0;
  .signedImg
    width 50%;
    height 50%;
.mrc-content
  padding-bottom 350px;
.mrc-fixed-bottom
  position absolute;
  left 0;
  right 0;
  bottom 20px;
  line-height 80px;
  padding 0 60px;
  background #fff;
</style>
