<template>
  <div class="crown-info-collect-wrapper full-screen-s">
    <ss-header title="接种意愿采集表"
      @backClick="close">
    </ss-header>
    <div class="main">
      <div class="top-part">
        <img :src="require('@/assets/images/crown/banner.png')"
          alt="ad">
      </div>
      <div class="center-part">
        <div class="small-title">
          <h3>温馨提示</h3>
        </div>
        <div class="tip">
          <p>
            对疫苗或疫苗成分过敏，有过疫苗接种严重过敏反应的；有未控制的严重慢性疾病、未控制的癫痫、脑病和其他进行性神经系统疾病者不适宜接种；怀孕的、哺乳期女性、各种疾病急性发作时要暂缓接种；有严重慢性疾病的，过敏体质，精神疾病史或家族史，有血小板减少症或者出血性疾病的，免疫功能受损（例如恶性肿瘤、肾病综合征、艾滋病患者）的人群慎用，要经过接种单位医务人员评估后给予接种意见。
          </p>
          <p>
            接种时，要认真阅读知情同意书，主动告知医务人员你的健康情况，医生会帮助判断是否可以接种。
          </p>
        </div>
        <div class="small-title">
          <h3>信息登记</h3>
        </div>
        <div class="info-part">
          <van-form>
            <div>
              <van-field v-model.trim="name"
                rows="1"
                type="textarea"
                autosize
                label="姓名："
                placeholder="请输入"
                :rules="[{ required: true }]" />
            </div>
            <div>
              <van-field v-model.trim="mobphone"
                rows="1"
                type="textarea"
                autosize
                label="联系电话："
                placeholder="请输入"
                :rules="[{ required: true }]" />
            </div>

            <div class="van-cell">
              <div class="van-cell__title  van-field__label"><span>证件类别：</span></div>
              <van-radio-group class="radio cert-radio"
                v-model="cardType"
                direction="horizontal"
                @change="certTypeChange">
                <van-radio :name="item.code"
                  v-for="(item,idx) in certTypeList"
                  :key="idx">{{item.value}}</van-radio>
              </van-radio-group>
            </div>

            <div v-if="cardType === '01'">
              <van-field v-model.trim="cid"
                rows="1"
                type="textarea"
                autosize
                label="证件号码（身份证号）："
                placeholder="请输入"
                @blur="cidBlur"
                :rules="[{ required: true }]" />
            </div>

            <div class="van-cell">
              <div class="van-cell__title  van-field__label"><span>您是否有意愿接种新冠疫苗：</span></div>
              <van-radio-group class="radio isWilling-radio"
                v-model="isWilling"
                direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="2">否</van-radio>
              </van-radio-group>
            </div>
            <section v-if="isWilling == '2'">
              <div class="van-cell">
                <div class="van-cell__title  van-field__label"><span>勾选‘否’的原因：</span></div>
                <van-radio-group class="radio isWilling-radio"
                  v-model="reasonType"
                  direction="horizontal"
                  @change="willingChange">
                  <van-radio name="1">接种禁忌</van-radio>
                  <van-radio name="2">不愿意</van-radio>
                  <van-radio name="3">外出</van-radio>
                  <van-radio name="4">其他</van-radio>
                </van-radio-group>
                <van-field v-if="reasonType === '4'"
                  v-model.trim="unwillingReason"
                  rows="1"
                  type="textarea"
                  autosize
                  placeholder="请输入"
                  :rules="[{ required: true }]" />
              </div>
            </section>
            <section v-if="isWilling == '1'">
              <div>
                <van-field v-model.trim="sex"
                  :readonly="canEditSBFlag"
                  rows="1"
                  type="textarea"
                  autosize
                  label="性别："
                  :placeholder="cardType==='01'?'身份证信息自动生成':'请输入'"
                  :rules="[{ required: true }]" />
              </div>

              <div>
                <van-field v-model.trim="birthday"
                  :readonly="canEditSBFlag"
                  rows="1"
                  type="textarea"
                  autosize
                  label="出生日期："
                  :placeholder="cardType==='01'?'身份证信息自动生成':'请输入'"
                  :rules="[{ required: true }]" />
              </div>

              <div class="van-cell">
                <div class="van-cell__title  van-field__label"><span>现居住地址：</span></div>
                <div class="fl-c-b">
                  <div class="spec2">
                    <van-field class="spec"
                      @click="showList('选择市',1, '-3')"
                      v-model.trim="dwellAddrCity"
                      input-align="center"
                      readonly
                      rows="1"
                      type="textarea"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true }]">
                      <template #right-icon>市</template>
                    </van-field>
                  </div>
                  <div class="spec2">
                    <van-field class="spec"
                      @click="showList('选择县',2,'-3')"
                      input-align="center"
                      readonly
                      v-model.trim="dwellAddrCounty"
                      rows="1"
                      type="textarea"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true }]">
                      <template #right-icon>县/区</template>
                    </van-field>
                  </div>
                </div>
                <div class="fl-c-b">
                  <div class="spec2">
                    <van-field class="spec"
                      @click="showList('选择镇',3,'-3')"
                      readonly
                      input-align="center"
                      v-model.trim="dwellAddrTown"
                      rows="1"
                      type="textarea"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true }]">
                      <template #right-icon>镇</template>
                    </van-field>
                  </div>
                  <div class="spec2">
                    <van-field class="spec"
                      @click="showList('选择接种点',6,'-3')"
                      readonly
                      input-align="center"
                      v-model.trim="organCode"
                      rows="1"
                      type="textarea"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true }]">
                      <template #right-icon>接种点</template>
                    </van-field>
                  </div>

                </div>
                <div class="fl-c-b">
                  <div class="spec2">
                    <van-field class="spec"
                      @click="showList('选择居/村委会',5,'-3')"
                      readonly
                      input-align="center"
                      v-model.trim="dwellAddrVillage"
                      rows="1"
                      type="textarea"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true }]">
                      <template #right-icon>居/村委会</template>
                    </van-field>
                  </div>
                </div>
                <van-field class="spec"
                  v-model.trim="dwellAddrDetail"
                  rows="1"
                  type="textarea"
                  autosize
                  placeholder="请输入"
                  :rules="[{ required: true }]" />
              </div>

              <div>
                <van-field v-model.trim="workplace"
                  rows="1"
                  type="textarea"
                  autosize
                  label="工作单位名称："
                  placeholder="请输入"
                  :rules="[{ required: false }]" />
              </div>

              <div>
                <van-field v-model.trim="crowdKind"
                  readonly
                  rows="1"
                  type="textarea"
                  autosize
                  label="人群分类："
                  placeholder="请选择"
                  :rules="[{ required: false }]"
                  @click="showList('选择人群分类',4,'9')" />
              </div>
            </section>
          </van-form>
        </div>
      </div>
      <div class="btn-sub fl-c-c">
        <van-button class="btn"
          type="primary"
          size="large"
          @click="submit"
          round>提交</van-button>
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
      <van-list v-model.trim="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="searchPop">
        <van-cell-group>
          <van-cell v-for="item in popList"
            :key="item.id"
            :title="item.name"
            @click="listClick(item)"></van-cell>
        </van-cell-group>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      certTypeList: [],
      canEditSBFlag: false,
      loading: false,
      finished: false,
      popList: [],
      popListFlag: false,
      name: '',
      mobphone: '',
      cardType: '',
      cid: '',
      isWilling: '',
      sex: '',
      birthday: '',
      workplace: '',
      crowdKind: '',
      listType: '',
      unwillingReason: '',
      reasonType: '',
      dwellAddrCity: '',
      dwellAddrCounty: '',
      dwellAddrTown: '',
      dwellAddrCityCode: '',
      dwellAddrCountyCode: '',
      dwellAddrTownCode: '',
      dwellAddrVillage: '',
      dwellAddrVillageCode: '',
      organCode: '',
      organCodeCode: '',
      dwellAddrDetail: '',
      supId: 1
    }
  },
  created () {
    this.getCertTypeList()
  },
  methods: {
    async getStation () {
      this.loading = true
      this.finished = false
      const params = {
        id: this.dwellAddrTownCode
      }
      const res = await this.$api.crownInfoCollect.getStation(params)
      console.log('接种点', res)
      let arr = res.data.map(item => {
        item.name = item.organName
        item.id = item.organCode
        return item
      })
      this.popList = arr
      this.loading = false
      this.finished = true
    },
    async getCommittee () {
      this.loading = true
      this.finished = false
      const params = {
        organCode: this.organCodeCode
      }
      const res = await this.$api.crownInfoCollect.getCommittee(params)
      console.log('居委会', res)
      let arr = res.data.map(item => {
        item.name = item.villageName
        item.id = item.villageCode
        return item
      })
      this.popList = arr
      this.loading = false
      this.finished = true
    },
    async searchPop (type = '9', supId = 0) {
      this.loading = true
      this.finished = false
      if (type === '9') {
        supId = 1
      }
      const params = {
        type,
        supId
      }
      console.log(params)
      const res = await this.$api.crownInfoCollect.getBaseCodeInfo(params)
      console.log('地区', res)
      this.popList = res.data
      this.loading = false
      this.finished = true
    },
    async getCertTypeList () {
      const params = {
        type: 10
      }
      const res = await this.$api.crownInfoCollect.getBaseData(params)
      console.log('证件类型', res)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        this.certTypeList = res.data
      }
    },
    willingChange (val) {
      switch (val) {
        case '1':
          this.unwillingReason = '接种禁忌'
          break
        case '2':
          this.unwillingReason = '不愿意'
          break
        case '3':
          this.unwillingReason = '外出'
          break
        case '4':
          this.unwillingReason = ''
          break
      }
    },
    certTypeChange (val) {
      if (val !== '01') {
        this.cid = ''
        this.canEditSBFlag = false
      } else {
        this.sex = ''
        this.birthday = ''
        this.canEditSBFlag = true
      }
    },
    cidBlur () {
      let result = ''
      if (this.cid == null || !this.cid) {
        result = '身份证号码不能为空'
        this.$toast(result)
      } else if (this.cid.length != 18) {
        result = '身份证号码的长度不是18位'
        this.$toast(result)
      } else if (!isId(this.cid)) {
        result = '身份证号码格式不正确'
        this.$toast(result)
      } else {
        this.initializeCid()
      }
    },
    initializeCid () {
      // 根据身份证号码设置性别以及出生日期
      let cid = this.cid
      if (cid != null && cid.length === 18) {
        if (cid.charAt(16) % 2 === 0) {
          this.sex = '女'
        } else {
          this.sex = '男'
        }
        this.birthday =
          cid.substring(6, 10) +
          '-' +
          cid.substring(10, 12) +
          '-' +
          cid.substring(12, 14)
      }
    },
    closePopList () {
      this.popListFlag = false
      this.listType = ''
    },
    listClick (item) {
      switch (this.listType) {
        case 1:
          this.dwellAddrCity = item.name
          this.dwellAddrCityCode = item.id
          this.dwellAddrCounty = ''
          this.dwellAddrCountyCode = ''
          this.dwellAddrTown = ''
          this.dwellAddrTownCode = ''
          this.dwellAddrVillage = ''
          this.dwellAddrVillageCode = ''
          this.organCode = ''
          this.organCodeCode = ''
          break
        case 2:
          this.dwellAddrCounty = item.name
          this.dwellAddrCountyCode = item.id
          this.dwellAddrTown = ''
          this.dwellAddrTownCode = ''
          this.dwellAddrVillage = ''
          this.dwellAddrVillageCode = ''
          this.organCode = ''
          this.organCodeCode = ''
          break
        case 3:
          this.dwellAddrTown = item.name
          this.dwellAddrTownCode = item.id
          this.dwellAddrVillage = ''
          this.dwellAddrVillageCode = ''
          this.organCode = ''
          this.organCodeCode = ''
          break
        case 5:
          this.dwellAddrVillage = item.villageName
          this.dwellAddrVillageCode = item.villageCode
          break
        case 6:
          this.organCode = item.organName
          this.organCodeCode = item.organCode
          this.dwellAddrVillage = ''
          this.dwellAddrVillageCode = ''
          break
        case 4:
          this.crowdKind = item.name
          break
      }
      this.popListFlag = false
    },
    showList (title, key, type) {
      if (key === 1) {
        this.supId = 1
      }

      if (key === 2 && !this.dwellAddrCity) {
        this.$toast('请先选择市')
        return
      } else if (key === 2 && this.dwellAddrCity) {
        this.supId = this.dwellAddrCityCode
      }

      if (key === 3 && (!this.dwellAddrCity || !this.dwellAddrCounty)) {
        this.$toast('请先选择市/区/县')
        return
      } else if (key === 3 && (this.dwellAddrCity && this.dwellAddrCounty)) {
        this.supId = this.dwellAddrCountyCode
      }

      if (key === 6 && (!this.dwellAddrCity || !this.dwellAddrCounty || !this.dwellAddrTown)) {
        this.$toast('请先选择市/区/县/镇')
        return
      } else if (key === 6 && (this.dwellAddrCity && this.dwellAddrCounty && this.dwellAddrTown)) {
        this.supId = this.dwellAddrTownCode
      }

      if (key === 5 && (!this.dwellAddrCity || !this.dwellAddrCounty || !this.dwellAddrTown || !this.organCode)) {
        this.$toast('请先选择市/区/县/镇/接种点')
        return
      } else if (key === 5 && (this.dwellAddrCity && this.dwellAddrCounty && this.dwellAddrTown && this.organCode)) {
        this.supId = this.organCodeCode
      }

      this.listType = key
      this.popList = []
      if (key === 6) {
        this.getStation()
      } else if (key === 5) {
        this.getCommittee()
      } else {
        this.searchPop(type, this.supId)
      }
      this.popListFlag = true
    },
    async submit () {
      const {
        name,
        mobphone,
        cardType,
        cid,
        isWilling,
        sex,
        birthday,
        dwellAddrVillage,
        dwellAddrDetail,
        workplace,
        crowdKind,
        listType,
        unwillingReason,
        dwellAddrCity,
        dwellAddrCounty,
        dwellAddrTown,
        organCode,
        reasonType
      } = this
      const params = {
        name,
        mobphone,
        cardType,
        cid: cardType === '01' ? cid : '8888888888888888',
        isWilling,
        sex,
        reasonType,
        birthday,
        dwellAddrVillage,
        dwellAddrDetail,
        workplace,
        crowdKind,
        listType,
        unwillingReason,
        dwellAddrCity,
        dwellAddrCounty,
        dwellAddrTown,
        organCode
      }
      var result = validateParams(params)
      if (result === 'success') {
        const res = await this.$api.crownInfoCollect.saveHNVaccinateWish(params)
        if (res.code === 1) {
          this.$toast(res.message)
        } else {
          this.$toast.success('提交成功！')
          setTimeout(() => {
            this.close()
          }, 1000)
        }
      } else {
        this.$toast(result)
      }
    },
    close () {
      window.location.href = '/HAINANZHYYJMBWeb/main.html'
    }
  }
}
function validateParams (params) {
  var result = 'success'

  if (!params.name) {
    result = '姓名不能为空'
  } else if (params.name.length > 25) {
    result = '姓名的长度不能超过25位'
  } else if (!isName(params.name)) {
    result = '姓名只能由汉字数字或字母组成'
  }

  if (!params.mobphone) {
  } else if (params.mobphone.length != 11) {
    result = '移动电话的长度只能是11位'
  } else if (params.mobphone.charAt(0) != '1') {
    result = '移动电话需要以1开头'
  } else if (!isPhone(params.mobphone)) {
    result = '移动电话只能由数字组成'
  }

  if (!params.cardType) {
    result = '请选择证件类别'
  }

  if (!params.isWilling) {
    result = '请选择接种意愿'
  }

  if (params.cardType === '01') {
    if ((params.cid == null || !params.cid)) {
      result = '身份证号码不能为空'
    } else if (params.cid.length != 18) {
      result = '身份证号码的长度不是18位'
    } else if (!isId(params.cid)) {
      result = '身份证号码格式不正确'
    }
  }

  if (params.isWilling === '1') {
    if (!params.sex) {
      result = '性别不能为空'
    }

    if (!params.birthday) {
      result = '出生日期不能为空'
    }

    if (!params.crowdKind) {
      result = '人群分类不能为空'
    }

    if (!params.dwellAddrCity) {
      result = '现居住地址-市不能为空'
    }
    if (!params.dwellAddrCounty) {
      result = '现居住地址-县/区不能为空'
    }
    if (!params.dwellAddrTown) {
      result = '现居住地址-镇不能为空'
    }
    if (!params.organCode) {
      result = '现居住地址-接种点不能为空'
    }
    // if (!params.dwellAddrVillage) {
    //   result = '现居住地址-居/村委会不能为空'
    // }

    if (!params.dwellAddrDetail) {
      result = '现居住地址详细地址不能为空'
    } else if (
      params.dwellAddrCity.length + params.dwellAddrCounty.length + params.dwellAddrTown.length + params.organCode.length + params.dwellAddrVillage.length + params.dwellAddrDetail.length >
      100
    ) {
      result = '现居住地址的长度不能超过100位'
    } else if (!isAddress(params.dwellAddrDetail)) {
      result = '现居住地址详细地址只能由汉字数字和字母组成'
    }
    if (!params.workplace) {
      result = '现居住地址-居/村委会不能为空'
    }
  }
  if (params.isWilling === '2') {
    if (!params.reasonType) {
      result = '请选择不愿接种原因'
    }
    if (params.reasonType === '4' && !params.unwillingReason) {
      result = '请输入不愿接种原因'
    }
  }

  return result
}
function isName (val) {
  var pattern = /^[a-zA-z\u4E00-\u9FA5\uF900-\uFA2D\d]{1,25}$/
  return pattern.test(val)
}
function isId (val) {
  var pattern = /^[0-9*Xx]{18}$/
  return pattern.test(val)
}
function isAddress (val) {
  var pattern = /^[a-zA-z\u4E00-\u9FA5\uF900-\uFA2D\d\,\(\)\-\—\（\）\。\，\s]{1,100}$/
  return pattern.test(val)
}
function isPhone (val) {
  var pattern = /^([0-9*]{11})$/
  return pattern.test(val)
}
</script>

<style lang="stylus">
.crown-info-collect-wrapper
  background-color #efeff4;
  padding-bottom 100px;
  .van-popup
    border-top-left-radius 30px;
    border-top-right-radius 30px;
    .van-list
      margin-top 80px;
  .headTitleWrapper
    position relative;
    z-index 2;
  .main
    .btn-sub
      margin-top 20px;
      .btn
        background rgb(65, 104, 241);
        color #fff;
        border none;
        width 80%;
    .top-part
      img
        width 100%;
    .center-part
      position relative;
      z-index 1;
      margin-top -50px;
      background #fff;
      padding 30px;
      border-top-left-radius 40px;
      border-top-right-radius 40px;
      .small-title
        margin 10px 0;
        h3
          font-size 26px;
          font-weight bold;
          color #000;
          margin 0;
          line-height 1.3;
          border-left 10px solid rgb(64, 104, 240);
          padding-left 15px;
      .tip
        margin-bottom 30px;
        p
          margin 0;
          font-size 26px;
          line-height 2;
          color red;
          text-indent 52px;
      .info-part
        .van-form
          .van-cell
            display block;
            .spec2
              width 50%;
              padding-right 10px;
            &.van-cell
              padding-left 0;
              padding-right 0;
            .van-cell__title
              width 100%;
              color #9299a5;
            .van-cell__value
              margin-top 20px;
              input, textarea
                color #000;
                font-size 28px;
            .radio
              >div
                margin-top 20px;
</style>
