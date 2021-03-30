<template>
  <div class="crown-appoint-detail full-screen-s">
    <ss-header :title="showBack?'新冠预订单':'预订成功'"
      @backClick="goBack"
      :leftArrow="showBack" />
    <div v-if="info.qrCodeValue"
      class="qr">
      <h3>请将此二维码展示给医生</h3>
      <div class="code fl-c-c">
        <qr-code v-if="info.qrCodeValue"
          :text="info.qrCodeValue"></qr-code>
      </div>
    </div>
    <div class="appoint-detail">
      <p class="tag fl-c-s">
        <img :src="require('@/assets/images/common/appointinfo.png')"
          alt="">
        预订单详情
      </p>
      <div class="detail">
        <h3>{{info.vaccineName}}（第{{info.vaccineCount}}剂次）</h3>
        <div class="info">
          <van-cell title="疫苗制品"
            :value="info.productName" />
          <van-cell title="生产厂家"
            :value="info.factoryName" />
          <van-cell title="受种者姓名"
            :value="info.name" />
          <van-cell title="身份证号码"
            :value="info.cid" />
          <van-cell title="预订时间"
            :value="info.reservationTime" />
          <van-cell title="预订门诊"
            :value="info.stationName" />
          <van-cell v-show="info.stationDesc"
            class="spec"
            title="备注说明"
            :value="info.stationDesc" />
        </div>
      </div>
    </div>
    <div class="btn-wrapper spec fl-c-c"
      v-if="info.canCancel === '1'">
      <ss-button v-if="showCancel"
        :style="{width:showBackHome&&showCancel?'45%':'90%'}"
        size="normal"
        :disabled="disabled"
        @click="calcelAppoint">取消预订</ss-button>
      <ss-button v-if="showBackHome"
        :style="{width:showBackHome&&showCancel?'45%':'90%'}"
        size="normal"
        :disabled="disabled"
        @click="goIndex">
        <ss-icon iconType="home"
          size="14px"
          style="margin-right: 4px;">
        </ss-icon>返回首页
      </ss-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import QrCode from '@/components/common/QrCode'
export default {
  components: {
    QrCode
  },
  data () {
    return {
      info: {},
      disabled: false
    }
  },
  created () {
    this.getXGReservationDetails()
  },
  computed: {
    ...mapGetters(['from']),
    showCancel () {
      return true
    },
    showBack () {
      if (this.from === 'check' || this.from === 'next') { return false }
      return true
    },
    showBackHome () {
      if (this.from === 'check' || this.from === 'next') { return true }
      return false
    }
  },
  methods: {
    async getXGReservationDetails () {
      const userName = sessionStorage.getItem('user')
      const reservationCode = this.$route.query.reservationCode
      const params = {
        user_name: userName,
        reservationCode
      }
      const res = await this.$api.crownAppoint.getXGReservationDetails(params)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.info = res.data
        console.log('预订单详情', res.data)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    calcelAppoint () {
      const userName = sessionStorage.getItem('user')
      const reservationCode = this.$route.query.reservationCode
      const params = {
        user_name: userName,
        reservationCode
      }
      this.$dialog.confirm({
        title: '提示',
        message: '确定要取消预订吗？',
        confirmButtonText: '确定'
      }).then(async () => {
        const res = await this.$api.crownAppoint.cancelXGReservation(params)
        if (res.code === 1) {
          this.$toast(res.message)
        } else {
          this.$toast.success('取消预订成功！')
          setTimeout(() => {
            if (this.from === 'check' || this.from === 'next' || this.$route.query.from === 'addNext') {
              this.goIndex()
            } else {
              this.$router.go(-1)
            }
          }, 1000)
        }
      })
    },
    goIndex () {
      window.location.href = '/HAINANZHYYJMBWeb/main.html'
    }
  }

}
</script>

<style lang="stylus" scoped>
.crown-appoint-detail
  padding-bottom 150px;
  background-color #efeff4;
  .btn-wrapper.spec
    width 100%;
    .van-button
      width 45%;
      margin 0 20px;
  .qr
    margin 20px 50px 0;
    background #fff;
    padding 10px 20px 50px;
    text-align center;
    border-radius 20px;
    h3
      color #ffa126;
      font-size 28px;
  .appoint-detail
    background #fff;
    border-radius 20px;
    padding 20px 0;
    margin 30px 20px 0;
    .tag
      color #3e3e3e;
      padding 0 20px 20px;
      margin 0;
      font-weight bold;
      border-bottom 1px dashed #d8d8d8;
      img
        width 50px;
    .detail
      padding 0 20px;
      h3
        color #2e2d2d;
        border-left 5px solid #5dc2fa;
        font-size 30px;
        padding 20px 0 20px 30px;
        background #f8f8fa;
        margin 0;
        margin-top 20px;
      .info
        .van-cell
          padding-left 0;
          padding-right 0;
          display flex;
          align-items center;
          .van-cell__title
            color #9299a5;
          .van-cell__value
            color #000;
          &.spec
            .van-cell__value
              color #ffa126;
</style>
