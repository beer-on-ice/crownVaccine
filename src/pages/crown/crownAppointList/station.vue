<template>
  <div class="crownAppointStationWrapper">
    <ss-header title="选择预订门诊"
      @backClick="goBack" />
    <div>
      <van-tabbar :value="active"
        :fixed="false"
        active-color="black"
        inactive-color="#B0B0B0">
        <van-tabbar-item v-for="(item, idx) in tabList"
          :key="idx"
          @click.native="getStation(item, idx)">
          <div class="flex-center">
            <div :class="{'flex-center':true,'menu-selected':active === idx,'menu-unselected':active!==idx}">
              <ss-icon v-if="idx === 0 &&active === idx"
                iconType="hot"
                size="16px"></ss-icon>
              <span :class="{'text-selected':active===idx,'text-unselected':active!==idx}">{{item.name}}</span>
            </div>
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="content">
      <div v-if="Number(type) !== 1"
        class="station-list">
        <div v-for="(item, index) in stationList"
          :key="index"
          class="station-item"
          @click="goStationDetail(item)">
          <div class="flex-column">
            <div class="flex-common stati-name">
              <ss-icon iconType="station"
                size="22px"></ss-icon>
              <span class="station-name word-wrap">{{item.station_name}}</span>
            </div>
            <div class="flex-common">
              <ss-icon iconType="address"
                size="22px"></ss-icon>
              <span class="station-address word-wrap">{{item.station_address}}</span>
            </div>
          </div>
          <div class="flex-column flex-center">
            <div class="station-address word-wrap">{{item.distance}}</div>
            <div @click.stop="goNext(item)"
              class="button-appoint"></div>
          </div>
        </div>
      </div>
      <div v-if="Number(type) === 1"
        class="list">
        <van-cell v-for="item in areaList"
          :title="item.station_area_name"
          :key="item.station_area_code"
          is-link
          @click="showAreaList(item)" />
      </div>
    </div>
    <van-popup v-model.trim="popListFlag"
      position="bottom"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      :close-on-click-overlay="false"
      @close="closePopList"
      :style="{ height: '90%' }">
      <div class="content inner">
        <h3>{{popTitle}}</h3>
        <div class="station-list">
          <div v-for="(item, index) in areaStationList"
            :key="index"
            class="station-item"
            @click="goStationDetail(item)">
            <div class="flex-column">
              <div class="flex-common">
                <ss-icon iconType="station"
                  size="22px"></ss-icon>
                <span class="station-name word-wrap">{{item.station_name}}</span>
              </div>
              <div class="flex-common">
                <ss-icon iconType="address"
                  size="22px"></ss-icon>
                <span class="station-address word-wrap">{{item.station_address}}</span>
              </div>
            </div>
            <div class="flex-column flex-center">
              <div class="station-address word-wrap">可预订数：{{item.num}}</div>
              <div @click.stop="goNext(item)"
                class="button-appoint"></div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <ss-no-data v-if="Number(type) !== 1&&!stationList.length">暂无数据</ss-no-data>
    <ss-no-data v-if="Number(type) === 1&&!areaList.length">暂无数据</ss-no-data>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      popTitle: '',
      popCode: '',
      popListFlag: false,
      type: '',
      active: 0,
      areaList: [],
      areaStationList: [],
      stationList: [],
      tabList: [],
      userName: sessionStorage.getItem('user')
    }
  },
  computed: {
    ...mapGetters(['bactId', 'childCode', 'vaccineCode', 'productNo', 'factoryNo'])
  },
  methods: {
    ...mapMutations([
      'setpriceId',
      'setstationCode'
    ]),
    getStation (item, idx) {
      this.active = idx
      this.type = item.type
      if (Number(item.type) === 1) {
        this.getAdultStationAreaList()
        return
      }
      this.getAdultStationMapList()
      this.station_area_code = ''
      this.popTitle = ''
    },
    async getStaionTypeList () {
      const param = {}
      const res = await this.$api.crownAppoint.getStaionTypeList(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('排序类型', res.data)
        this.tabList = res.data
      }
    },
    async getAdultStationAreaList () {
      const { bactId, productNo, factoryNo, childCode } = this
      const param = {
        productNo,
        factoryNo,
        bact_id: bactId,
        child_code: childCode,
        address_info: null,
        page_index: 0
      }
      const res = await this.$api.crownAppoint.getAdultStationAreaList(param)
      console.log('区县列表', res)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.areaList = res.data
      }
    },
    async getAdultStationList (item) {
      const { bactId, productNo, factoryNo, childCode } = this
      const param = {
        station_area_code: item.station_area_code || '',
        bact_id: bactId,
        productNo: productNo,
        factoryNo: factoryNo,
        child_code: childCode,
        address_info: null,
        page_index: 0
      }
      const res = await this.$api.crownAppoint.getAdultStationList(param)
      console.log('区县接种点地址', res)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.areaStationList = res.data
      }
    },
    getAdultStationMapList () {
      const { bactId, productNo, factoryNo, childCode } = this
      const userLng = sessionStorage.getItem('user_x')
      const userLat = sessionStorage.getItem('user_y')
      var gpsPoint = new window.BMap.Point(userLng, userLat)
      window.BMap.Convertor.translate(gpsPoint, 0, async point => {
        const params = {
          type: this.type,
          bact_id: bactId,
          productNo,
          factoryNo,
          child_code: childCode,
          address_info: null,
          user_lng: point.lng,
          user_lat: point.lat
        }
        const res = await this.$api.crownAppoint.getAdultStationMapList(params)
        console.log('普通接种点地址', res)
        if (res.code === 1) {
          this.$toast(res.message)
        } else {
          this.stationList = res.data
        }
      })
    },
    async showAreaList (item) {
      this.popTitle = item.station_area_name
      this.station_area_code = item.station_area_code
      await this.getAdultStationList(item)
      this.popListFlag = true
    },
    async checkAdultCanOrder (item) {
      const param = {
        user_name: this.userName,
        child_code: this.childCode,
        station_code: item.station_code
      }
      const res = await this.$api.crownAppoint.checkAdultCanOrder(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        await this.saveTempYyInfo(item)
      }
    },
    async saveTempYyInfo (item) {
      const param = {
        child_code: this.childCode,
        station_code: item.station_code,
        priceId: item.priceId,
        vaccineCode: this.vaccineCode
      }
      const res = await this.$api.crownAppoint.saveTempYyInfo(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.$router.push({
          name: 'crownAppointStationTime'
        })
      }
    },
    closePopList () {
      this.popListFlag = false
    },
    goStationDetail (item) {
      this.popListFlag = false
      this.$router.replace({
        name: 'crownAppointStationDetail',
        query: {
          station_code: item.station_code,
          popCode: this.station_area_code,
          popTitle: this.popTitle,
          type: this.type,
          active: this.active
        }
      })
    },
    async goNext (item) {
      const {
        setpriceId, setstationCode
      } = this
      setpriceId(item.priceId)
      setstationCode(item.station_code)
      await this.checkAdultCanOrder(item)
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  async created () {
    await this.getStaionTypeList()
    this.active = Number(this.$route.query.active) || 0
    if (this.$route.query.type) {
      this.type = String(this.$route.query.type)
    } else if (this.tabList.length) {
      this.type = this.tabList[0].type
    } else {
      this.type = ''
    }
    if (this.type === '1') {
      await this.getAdultStationAreaList()
      await this.getAdultStationList({ station_area_code: this.$route.query.popCode })
      this.popTitle = this.$route.query.popTitle
      this.station_area_code = this.$route.query.popCode
      if (this.$route.query.popTitle && this.$route.query.popCode) {
        this.popListFlag = true
      }
    } else {
      this.getAdultStationMapList()
    }
  }
}
</script>

<style lang="stylus" >
.crownAppointStationWrapper
  width 100%;
  height 100%;
  background-color #efeff4;
  >>> .van-tabbar
    background-color white;
  .text-selected, .text-unselected
    font-size 28px;
  .menu-selected, .menu-unselected
    position relative;
  .menu-selected::after
    content '';
    height 4px;
    background-color #53ABF8;
    left 0;
    right 0;
    bottom -20px;
    position absolute;
  .content
    &.inner
      height 100%;
      background-color #efeff4;
      h3
        font-size 34px;
        margin-top 26px;
        text-align center;
      .station-item
        display flex;
        align-items flex-start;
        justify-content space-between;
    height calc(100% - 200px);
    overflow auto;
    .station-list
      margin 36px;
      .station-item
        padding 24px 12px 24px 24px;
        background-color white;
        border-radius 12px;
        margin-bottom 36px;
        display flex;
        align-items flex-start;
        justify-content space-between;
        .button-appoint
          background-image url('../../../assets/images/crown/button_appoint.png');
          background-repeat no-repeat;
          background-size contain;
          background-position center;
          width 180px;
          height 100px;
        .station-name
          font-weight bold;
          font-size 32px;
          margin-left 18px;
          max-width 50vw;
          line-height 2;
        .station-address
          font-size 28px;
          margin-left 18px;
          color #B0B0B0;
          max-width 50vw;
</style>
