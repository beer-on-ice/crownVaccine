<template>
  <div class="station-detail-wrapper">
    <ss-header title="门诊详情"
      @backClick="goBack"></ss-header>
    <div class="topInfo">
      <div class="title">
        <h3 class="fl-c-b">
          <span>{{info.station_name}}</span>
          <img v-if="Number(info.is_number)"
            class="digital"
            src="@/assets/images/crown/digital.png"
            alt="">
        </h3>
        <p class="fl-c-b">
          <span class="fl-c-c"><i class="iconfont icon-map1"></i>{{info.station_address}}</span>
          <span class="fl-c-c"
            @click="showMap = true"><i class="iconfont icon-daohang"></i>查看路线</span>
        </p>
      </div>
      <div class="info">
        <p class="fl-c-s">
          <span class="left">门诊日:</span>
          <span>{{info.station_day}}</span>
        </p>
        <p class="fl-c-s">
          <span class="left">联系人:</span>
          <span>{{info.station_contact}}</span>
        </p>
        <p class="fl-c-s">
          <span class="left">联系电话:</span>
          <span class="spec">{{info.station_phone}}</span>
        </p>
        <p class="fl-c-s"
          v-if="info.service_scope">
          <span class="left">服务范围:</span>
          <span>{{info.service_scope}}</span>
        </p>
      </div>
      <div class="desc fl-c-c"
        v-show="Number(info.is_number)">
        <i class="iconfont icon-file-find-fill"></i>
        <span @click="goDesc">数字化门诊说明</span>
      </div>
    </div>
    <div class="bottomMap">
      <div id="containerMainSts"
        :style="map_height"></div>
    </div>
    <van-popup v-model="showMap"
      position="bottom"
      :style="{ height: '20%' }">
      <van-cell border
        @click="getMapApp('百度地图')">百度地图</van-cell>
      <van-cell border
        @click="getMapApp('高德地图')">高德地图</van-cell>
      <van-cell border
        @click="getMapApp('腾讯地图')">腾讯地图</van-cell>
    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showMap: false,
      info: {},
      desc: '',
      map_height: 'height:calc(100vh - 350px);',
      center: { lng: 0, lat: 0 },
      zoom: 3,
      BMap: {},
      map: {}
    }
  },
  methods: {
    async getStationDetails () {
      const stationCode = this.$route.query.station_code
      const param = {
        station_code: stationCode
      }
      const res = await this.$api.crownAppoint.getStationDetails(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.info = res.data
        setTimeout(() => {
          this.drawMap(res.data.station_lng, res.data.station_lat, res.data.station_name)
        }, 1000)
      }
    },
    drawMap (lng, lat, name) {
      this.map = new window.BMap.Map('containerMainSts') // 创建地图实例
      this.point = new window.BMap.Point(
        lng,
        lat
      ) // 创建点坐标
      console.log(this.point)
      this.map.centerAndZoom(this.point, 15) // 初始化地图，设置中心点坐标和地图级别
      var marker = new window.BMap.Marker(this.point) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
      var label = new window.BMap.Label(name, {
        offset: new window.BMap.Size(-5, -45),
        position: this.point
      })
      this.map.addOverlay(label)
      var opts = {
        offset: new window.BMap.Size(0, 40)
      }
      this.map.addControl(new window.BMap.NavigationControl(opts))
      this.map.addControl(new window.BMap.ScaleControl())
      this.map.addControl(new window.BMap.OverviewMapControl())
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    goDesc () {
      this.$router.push({
        name: 'stationDesc',
        query: {
          active: this.$route.query.active,
          type: this.$route.query.type,
          station_code: this.$route.query.station_code,
          popTitle: this.$route.query.popTitle,
          popCode: this.$route.query.popCode
        }
      })
    },
    getMapApp (mapType) {
      const { point: { lat, lng } } = this
      let url = ''
      switch (mapType) {
        case '腾讯地图':
          url = 'https://apis.map.qq.com/uri/v1/marker?marker=coord:' + lat + ',' + lng + ';addr:' + this.info.station_address + ';title:' + this.info.station_name + '&referer=keyfree'
          break
        case '高德地图':
          url = 'https://uri.amap.com/marker?position=' + lng + ',' + lat + '&name=' + this.info.station_address + '&callnative=1'
          break
        case '百度地图':
          url = 'http://api.map.baidu.com/marker?location=' + lat + ',' + lng + '&title=' + this.info.station_name + '&content=' + this.info.station_address + '&output=html&src=webapp.reformer.appname&coord_type=gcj02'
          break
        default:
          break
      }
      window.location.href = url
      return url
    },
    goBack () {
      this.$router.replace({
        name: 'crownAppointStation',
        query: {
          type: this.$route.query.type,
          active: this.$route.query.active,
          station_code: this.$route.query.station_code,
          popTitle: this.$route.query.popTitle,
          popCode: this.$route.query.popCode
        }
      })
    }
  },
  created () {
    this.getStationDetails()
  }
}
</script>

<style lang="stylus" scoped>
.station-detail-wrapper
  width 100%;
  height 100%;
  .van-cell__value
    text-align center;
  .topInfo
    background #fff;
    padding 20px 30px;
    .title
      h3
        font-size 36px;
        word-break break-all;
        margin 0;
        color #000;
      img
        width 40px;
      p
        margin 10px 0;
        span
          color rgb(169, 172, 183);
          font-size 24px;
          i
            font-size 32px;
          &:nth-of-type(2)
            color rgb(130, 191, 241);
    .info
      margin 20px;
      padding 0 20px;
      border 1px solid #ccc;
      border-radius 10px;
      background rgb(252, 252, 252);
      p
        margin 20px 0;
        span
          word-break break-all;
          &.left
            min-width 20%;
          &.spec
            color rgb(130, 191, 241);
    .desc
      color rgb(130, 191, 241);
      font-size 28px;
      i
        font-size 32px;
  .bottomMap
    height 100%;
    #containerMainSts
      height calc(100vh - 580px) !important;
      transform translateX(70%);
      position absolute;
      left -70%;
      right 70%;
      bottom 0;
</style>
