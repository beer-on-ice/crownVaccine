<template>
  <div class="next">
    <div class="main ">
      <div class="topWrapper">
        <div v-show="showNextFlag"
          class="nextDate fl-c-b">
          <h3 class="fl-c-s">
            <img :src="require('@/assets/images/icons/book.png')"
              alt=""
              srcset="">
            下次接种日期
          </h3>
          <p>{{nextXGPre.preTime}}</p>
        </div>
        <div class="title">
          <h3 class="fl-c-s">
            <img :src="require('@/assets/images/icons/zhen.png')"
              alt=""
              srcset="">
            疫苗制品厂家
          </h3>
        </div>
        <div class="picker">
          <van-field class="vaccine"
            readonly
            rows="1"
            type="textarea"
            autosize
            input-align="right"
            label="疫苗制品"
            :placeholder="productName"
            :value="productName"
            @click="chooseVaccine">
            <template #right-icon
              v-if="!hasXGBespeak">
              <img class="pen"
                src="@/assets/images/crown/pen.png"
                alt="">
            </template>
          </van-field>
          <van-field class="producer"
            label="生产厂家"
            input-align="right"
            readonly
            rows="1"
            type="textarea"
            autosize
            :placeholder="factoryName"
            :value="factoryName"
            @click="chooseProducer">
            <template #right-icon
              v-if="productNo !== ''&&!hasXGBespeak">
              <img class="pen"
                src="@/assets/images/crown/pen.png"
                alt="">
            </template>
          </van-field>
        </div>
      </div>
      <div v-show="bottomInfoList.length"
        class="bottomWrapper">
        <div class="tag">疫苗介绍</div>
        <div class="info">
          <ul>
            <li v-for="item in bottomInfoList"
              :key="item.id">
              <div class="tipTitle fl-c-s"
                v-if="item.moduleName">
                <img :src="require('@/assets/images/icons/radin.png')"
                  alt="">
                {{item.moduleName}}
              </div>
              <div class="tipContent">
                <p>
                  <span v-html="item.moduleContent">主要活性成分：灭活的新型冠状病毒。</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-wrapper"
        v-if="info.showBespeakButton === '1'">
        <ss-button size="normal"
          :disabled="disabled"
          @click="goAppoint">{{hasXGBespeak?'查看预订单':'我要预订'}}</ss-button>
      </div>
    </div>
    <ss-common-picker :showFlag="pickerFlag"
      :title="pickerTitle"
      :valKey="valKey"
      :columns="columns"
      @pickerChange="pickerChange"
      @popClick="popClick"
      @pickerConfirm="pickerConfirm"><span slot="confirm">
        <van-icon name="cross"
          @click="pickerFlag = false" />
      </span><span slot="cancel"></span>
    </ss-common-picker>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
      valKey: '',
      showCodeFlag: true,
      showNextFlag: false,
      pickerFlag: false,
      pickerTitle: '',
      columns: [],
      userHasXG: {},
      nextXGPre: {},
      XGProductList: [],
      XGFactoryList: [],
      bottomInfoList: [],
      vaccineIntroduce: '',
      hasXGBespeak: '',
      productName: '请选择',
      factoryName: '请先选择疫苗制品',
      reservationCode: '',
      productNo: '',
      factoryNo: '',
      userName: sessionStorage.getItem('user'),
      crownDetailInfo: JSON.parse(sessionStorage.getItem('crownDetailInfo')),
      tmpPicker: {}
    }
  },
  computed: {
    disabled () {
      if (this.hasXGBespeak) return false
      return this.productNo === '' || this.factoryNo === ''
    }
  },
  methods: {
    ...mapMutations([
      'setbactId',
      'setchildCode',
      'setvaccineCode',
      'setproductNo',
      'setfactoryNo',
      'setFrom'
    ]),
    async getXGPre () {
      const params = {
        user_name: this.userName,
        child_code: this.crownDetailInfo.childCode
      }
      const res = await this.$api.crownVaccination.getXGPre(params)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('下次接种信息：', res.data)
        if (res.data.preTime) {
          this.showNextFlag = true
        }
        if (res.data.showMsg) {
          this.$dialog.confirm({
            title: '提示',
            message: res.data.showMsg,
            confirmButtonText: '确定'
          }).then(() => {
            window.location.href = '/HAINANZHYYJMBWeb/main.html'
          })
          return
        }
        this.nextXGPre = res.data
        this.hasXGBespeak = res.data.hasXGBespeak

        this.vaccineCode = res.data.vaccineCode
        const factoryName = sessionStorage.getItem('reset_factoryName')
        const productName = sessionStorage.getItem('reset_productName')
        const productNo = sessionStorage.getItem('reset_productNo')
        const factoryNo = sessionStorage.getItem('reset_factoryNo')
        if (productName) {
          this.productNo = productNo
          this.productName = productName
        } else if (res.data.productName) {
          this.productNo = res.data.productNo
          this.productName = res.data.productName
          this.factoryName = '请选择'
        }

        if (factoryName) {
          this.factoryNo = factoryNo
          this.factoryName = factoryName
        } else if (res.data.factoryName) {
          this.factoryNo = res.data.factoryNo
          this.factoryName = res.data.factoryName
        }

        this.vaccineIntroduce = res.data.vaccineIntroduce

        if (this.vaccineIntroduce && this.productNo) {
          this.getBottomInfo(this.vaccineIntroduce)
        }
      }
    },
    async getXGProductList (flag) {
      const param = {
        user_name: this.userName,
        child_code: this.crownDetailInfo.childCode,
        vaccineCode: this.vaccineCode,
        factoryNo: ''
      }
      const res = await this.$api.crownVaccination.getXGProductList(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('疫苗制品信息', res.data)
        this.columns = res.data
        if (flag && res.data.length) {
          this.productNo = res.data[0].productNo
          this.productName = res.data[0].productName
          this.vaccineIntroduce = res.data[0].vaccineIntroduce
        }
      }
    },
    async getXGFactoryList (flag) {
      const param = {
        user_name: this.userName,
        child_code: this.crownDetailInfo.childCode,
        vaccineCode: this.vaccineCode,
        productNo: this.productNo
      }
      const res = await this.$api.crownVaccination.getXGFactoryList(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('疫苗工厂信息', res.data)
        this.columns = res.data
        if (flag && res.data.length) {
          this.factoryNo = res.data[0].factoryNo
          this.factoryName = res.data[0].factoryName
        }
      }
    },
    async getBottomInfo (url) {
      let id = GetQueryString(url, 'id')
      const param = {
        id
      }
      const res = await this.$api.crownVaccination.vaccineKnowledgeDetailList(param)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('疫苗介绍信息', res.data)
        this.bottomInfoList = res.data.knowledgeDetaillist
      }
    },
    async chooseVaccine () {
      if (this.hasXGBespeak) return
      this.pickerTitle = '选择疫苗制品'
      this.valKey = 'productName'
      await this.getXGProductList()
      this.pickerFlag = true
    },
    async chooseProducer () {
      if (this.hasXGBespeak) return
      if (this.productNo === '') return
      this.pickerTitle = '选择生产厂家'
      this.valKey = 'factoryName'
      await this.getXGFactoryList()
      this.pickerFlag = true
    },
    popClick (val) {
      if (JSON.stringify(this.tmpPicker) === '{}' && val !== '') {
        this.tmpPicker = val
      }
      if (this.pickerTitle === '选择疫苗制品') {
        this.productName = this.tmpPicker.productName
        this.productNo = this.tmpPicker.productNo
        this.factoryNo = ''
        this.factoryName = '请选择'
      } else {
        this.factoryName = this.tmpPicker.factoryName
        this.factoryNo = this.tmpPicker.factoryNo
      }
      if (this.tmpPicker.vaccineIntroduce) {
        this.getBottomInfo(this.tmpPicker.vaccineIntroduce)
      }
      this.tmpPicker = {}
      this.pickerFlag = false
    },
    pickerChange (val) {
      this.tmpPicker = val
    },
    pickerConfirm ({ value }) {
      if (JSON.stringify(this.tmpPicker) === '{}' && value !== '') {
        this.tmpPicker = value
      }
      if (this.pickerTitle === '选择疫苗制品') {
        this.productName = this.tmpPicker.productName
        this.productNo = this.tmpPicker.productNo
        this.factoryNo = ''
        this.factoryName = '请选择'
      } else {
        this.factoryName = this.tmpPicker.factoryName
        this.factoryNo = this.tmpPicker.factoryNo
      }
      if (this.tmpPicker.vaccineIntroduce) {
        this.getBottomInfo(this.tmpPicker.vaccineIntroduce)
      }
      this.tmpPicker = {}
      this.pickerFlag = false
    },
    goAppoint () {
      const {
        setbactId,
        setchildCode,
        setvaccineCode,
        setproductNo,
        setfactoryNo,
        setFrom
      } = this
      setbactId(this.nextXGPre.bactId)
      setchildCode(this.crownDetailInfo.childCode)
      setvaccineCode(this.nextXGPre.vaccineCode)
      setproductNo(this.productNo)
      setfactoryNo(this.factoryNo)

      if (this.hasXGBespeak) {
        setFrom('')
        this.$router.push({
          name: 'crownAppointDetail',
          query: {
            reservationCode: this.hasXGBespeak
          }
        })
      } else {
        if (Number(this.info.shotNum) === 2) {
          this.$dialog.alert({
            title: '提示',
            message: '您已完成新型冠状疫苗接种，暂不需要重复接种，祝您身体健康！'
          })
          return
        }
        setFrom('next')
        sessionStorage.setItem('reset_factoryName', this.factoryName)
        sessionStorage.setItem('reset_productName', this.productName)
        sessionStorage.setItem('reset_productNo', this.productNo)
        sessionStorage.setItem('reset_factoryNo', this.factoryNo)
        this.$router.push({
          name: 'crownAppointStation'
        })
      }
    },
    goBack () {
      sessionStorage.removeItem('reset_factoryName')
      sessionStorage.removeItem('reset_productName')
      sessionStorage.removeItem('reset_productNo')
      sessionStorage.removeItem('reset_factoryNo')
      this.$router.go(-1)
    }
  },
  created () {
    this.getXGPre()
  }
}
function GetQueryString (url, name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = url.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
</script>
<style lang="stylus">
.crownDetailWrapper
  .next
    height 100%;
    background rgb(245, 245, 245);
    .main
      height calc(100% - 370px);
      overflow-y auto;
      padding 10px 30px 0;
      background-image linear-gradient(
        180deg,
        #1db0ff 0%,
        #f5f5f5 50%
      );
      .pen
        width 70px;
      .topWrapper
        margin 0 auto;
        background-color #ffffff;
        box-shadow 0px 2px 8px 0px rgba(13, 93, 162, 0.03);
        border-radius 15px;
        h3
          margin 0;
          font-family PingFang SC;
          letter-spacing 1px;
          font-size 26px;
          color #3e3e3e;
        .nextDate
          padding 20px;
          padding-bottom 20px;
          color #000;
          border-bottom 1px dashed #d8d8d8;
          img
            width 50px;
          p
            margin 0;
        .title
          padding 20px 20px 0;
          img
            width 50px;
        .picker
          padding 0 20px;
          margin-top 20px;
          .van-cell__title
            color #9299a5;
          .van-cell__value
            color #000;
            font-size 28px;
            display flex;
            justify-content flex-end;
            align-items center;
            text-align right;
            input
              font-size 28px;
            textarea
              font-size 28px;
            .van-field__body
              width 100%;
            .van-field__right-icon
              display flex;
              align-items center;
          .vaccine, .producer
            display flex;
            align-items center;
            .van-icon
              margin-left 10px;
              font-size 34px;
              color #969799;
              &.van-icon-arrow
                font-size 20px;
                color rgb(255, 164, 59);
      .bottomWrapper
        background #fff;
        border-radius 15px;
        padding 20px 20px;
        margin-top 30px;
        border 1px dashed rgb(154, 255, 255);
        .tag
          background-image linear-gradient(
            0deg,
            #ffbfdb 0%,
            #ff75a4 100%
          );
          border-radius 20px 20px 2px 2px;
          color #fff;
          display inline-block;
          padding 10px 25px;
        .info
          padding-left 20px;
          .tipTitle
            img
              width 25px;
            margin-top 20px;
            font-size 18px;
            color #ff75a4;
          .tipContent
            margin-top 10px;
            font-size 32px;
            color #000;
            p
              margin 0;
              text-indent 20px;
</style>
