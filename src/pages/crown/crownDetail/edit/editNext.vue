<template>
  <div class="crown-detail-edit-next-wrapper full-screen-s">
    <ss-header title="新冠接种登记"
      :leftArrow="false">
      <template #right>
        <span @click="closeEdit">关闭</span>
      </template>
    </ss-header>
    <van-notice-bar left-icon="volume-o"
      text="所填信息符合国家上传要求，请正确完成接种信息填写，感谢您的配合！金苗宝祝您身体健康！" />
    <div v-show="showFlag"
      class="main">
      <div class="pageTitle">
        <img :src="require('@/assets/images/common/three3.png')"
          alt="">
      </div>
      <van-form @submit="onSubmit">
        <van-cell title="受种者乙肝表面抗原检测结果"
          :value="fadulthbsag.text"
          is-link
          @click="showMultiplePicker('fadulthbsag','受种者乙肝表面抗原检测结果')" />
        <van-cell title="受种者乙肝表面抗体检测结果"
          :value="fadulthbsab.text"
          is-link
          @click="showMultiplePicker('fadulthbsab','受种者乙肝表面抗体检测结果')" />
        <van-field label="禁忌证"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="ftabucodeCn"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('ftabucodeCn','禁忌证','7')" />
        <van-field label="过敏史"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fallergyhist.text"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showMultiplePicker('fallergyhist','过敏史')" />
        <van-field label="既往传染病史"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fdiseaseCn"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('fdiseaseCn','既往传染病史','4')" />
        <van-field label="既往预防接种异常反应"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="freaction.text"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showMultiplePicker('freaction','既往预防接种异常反应')" />
      </van-form>
    </div>
    <div v-show="showFlag"
      class="btn-wrapper">
      <ss-button size="normal"
        :disabled="disabled"
        @click="onSubmit">
        确认无误，提交登记信息
      </ss-button>
      <p v-if="!disabled"
        class="back"
        @click="goBack">返回上一步修改</p>
    </div>
    <van-popup v-model="popListFlag"
      position="bottom"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
      :close-on-click-overlay="false"
      @close="closePopList"
      :style="{ height: '90%' }">
      <van-search v-model.trim="searchKey"
        @search="filterPop"
        show-action
        placeholder="请输入搜索关键词">
        <template #action>
          <div @click="filterPop(searchKey)">搜索</div>
        </template>
      </van-search>
      <van-list v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="searchPop">
        <van-cell-group>
          <van-cell v-for="item in filterPopList"
            :key="item.id"
            :title="item.name"
            :is-link="item.hasChild"
            @click="listClick(item)"></van-cell>
        </van-cell-group>
        <!-- <div class="sick-item"
          v-for="item in popList"
          :key="item.id">
          <p>{{item.title}}</p>
          <p>{{item.desc}}</p>
        </div> -->
      </van-list>
    </van-popup>
    <ss-common-picker :showFlag="multiplePickerFlag"
      :title="multiplePickerTitle"
      :columns="multiplePickerColumns"
      @popClick="popClick"
      @pickerCancel="multiplePickeCancel"
      @pickerConfirm="multiplePickeConfirm"></ss-common-picker>
  </div>
</template>

<script>
const fadulthbsagPickerList = [
  {
    code: '01',
    text: '阳性'
  },
  {
    code: '02',
    text: '阴性'
  },
  {
    code: '03',
    text: '未检测'
  }
]
const fadulthbsabPickerList = [
  {
    code: '01',
    text: '阳性'
  },
  {
    code: '02',
    text: '阴性'
  },
  {
    code: '03',
    text: '未检测'
  }
]
const fallergyhistPickerList = [
  {
    code: '1',
    text: '是'
  },
  {
    code: '0',
    text: '否'
  }
]
const freactionPickerList = [
  {
    code: '01',
    text: '是'
  },
  {
    code: '02',
    text: '否'
  },
  {
    code: '03',
    text: '不详'
  }
]
export default {
  data () {
    return {
      parentId: [],
      tmpAddressArr: [],
      tmpAddressCodeArr: [],
      type: '',
      showFlag: false,
      loading: false,
      finished: false,
      searchKey: '',
      disabled: false,
      popListFlag: false,
      sickList: [],
      popList: [],
      filterPopList: [],
      multiplePickerFlag: false,
      currentMultiplePickerKey: '',
      multiplePickerTitle: '',
      multiplePickerColumns: [],
      fadulthbsagPickerList,
      fadulthbsabPickerList,
      fallergyhistPickerList,
      freactionPickerList,
      fadulthbsag: {
        text: '',
        code: ''
      },
      fadulthbsab: {
        text: '',
        code: ''
      },
      fallergyhist: {
        text: '',
        code: ''
      },
      freaction: {
        text: '',
        code: ''
      },
      fdiseaseCn: '',
      fdiseasecode: '',
      ftabucodeCn: '',
      ftabucode: ''
    }
  },
  created () {
    this.initializeParams()
    this.getData()
  },
  mounted () {
    setTimeout(() => {
      this.showFlag = true
    }, 300)
  },
  methods: {
    initializeParams () {
      this.fadulthbsag.text = '未检测'
      this.fadulthbsag.code = '03'
      this.fadulthbsab.text = '未检测'
      this.fadulthbsab.code = '03'
    },
    getData () {
      let nextParam = JSON.parse(sessionStorage.getItem('thirdPageValue'))
      if (nextParam != null) {
        this.setDetfaultParams(nextParam)
      }
    },
    setDetfaultParams (nextParam) {
      const {
        fadulthbsagcode,
        fadulthbsabcode,
        ftabucode,
        fallergyhistcode,
        fdiseasecode,
        freactioncode,
        fadulthbsag,
        fadulthbsab,
        ftabuCn,
        fallergyhistCn,
        fdiseaseCn,
        freactionCn
      } = nextParam
      this.fadulthbsag.code = fadulthbsagcode
      this.fadulthbsab.code = fadulthbsabcode
      this.fallergyhist.code = fallergyhistcode
      this.freaction.code = freactioncode
      this.fdiseasecode = fdiseasecode
      this.ftabucode = ftabucode
      this.fadulthbsag.text = fadulthbsag
      this.fadulthbsab.text = fadulthbsab
      this.fallergyhist.text = fallergyhistCn
      this.freaction.text = freactionCn
      this.fdiseaseCn = fdiseaseCn
      this.ftabucodeCn = ftabuCn
    },
    popClick () {
      this.multiplePickerFlag = false
    },
    listClick (item) {
      this.tmpAddressArr.push(item.name)
      this.tmpAddressCodeArr.push(item.code)
      if (item.hasChild) {
        if (!this.parentId.length) this.parentId.unshift(0)
        this.parentId.push(item.id)
        this.popList = []
        this.filterPopList = []
        this.searchPop(item.id)
      } else {
        const type = String(this.type)
        if (type === '4') {
          this.fdiseaseCn = item.name
          this.fdiseasecode = item.code
        } else if (type === '7') {
          this.ftabucodeCn = item.name
          this.ftabucode = item.code
        }
        this.type = ''
        this.popList = []
        this.filterPopList = []
        this.tmpAddressArr = []
        this.tmpAddressCodeArr = []
        this.closePopList(true)
      }
    },
    closePopList (flag) {
      if (flag || !this.parentId.length) {
        this.popListFlag = false
        this.parentId = []
        this.tmpAddressArr = []
        this.tmpAddressCodeArr = []
        this.searchKey = ''
      } else {
        let currentId = this.parentId.pop()
        currentId = this.parentId.pop()
        this.tmpAddressArr.pop()
        this.tmpAddressArr.pop()
        this.popListFlag = true
        this.searchPop(currentId)
      }
    },
    filterPop (key = '') {
      this.filterPopList = []
      if (!key) {
        this.filterPopList = this.popList
        return
      }
      this.loading = true
      this.finished = false
      setTimeout(() => {
        for (let i = 0; i < this.popList.length; i++) {
          if (this.popList[i].name.indexOf(key) >= 0) {
            this.filterPopList.push(this.popList[i])
          }
        }
        this.loading = false
        this.finished = true
      }, 500)
    },
    async searchPop (supId = 0) {
      this.loading = true
      this.finished = false
      const res = await this.$api.crownVaccination.getBaseCodeInfo({
        type: this.type,
        supId
      })
      this.popList = res.data
      this.filterPopList = res.data
      this.loading = false
      this.finished = true
    },
    // 弹层相关
    showList (key, title, type) {
      this.type = type
      this.popList = []
      this.filterPopList = []
      this.searchPop()
      this.popListFlag = true
    },
    multiplePickeCancel () {
      this.currentMultiplePickerKey = ''
      this.multiplePickerTitle = ''
      this.multiplePickerColumns = []
      this.multiplePickerFlag = false
    },
    multiplePickeConfirm (item) {
      const el = item.value
      const key = this.currentMultiplePickerKey
      this[key].code = el.code
      this[key].text = el.text
      this.multiplePickerFlag = false
    },
    showMultiplePicker (key, title) {
      this.currentMultiplePickerKey = key
      this.multiplePickerTitle = title
      this.multiplePickerColumns = this[`${key}PickerList`]
      this.multiplePickerFlag = true
    },
    setPageStorage () {
      // var infoParam = JSON.parse(sessionStorage.getItem('secondPageValue'))
      var fileParam = JSON.parse(sessionStorage.getItem('firstPageValue'))
      var childCode = sessionStorage.getItem('childCode')
      if (childCode != null) {
        fileParam.childCode = childCode
      }
      const {
        fadulthbsag,
        fadulthbsab,
        fallergyhist,
        freaction,
        fdiseaseCn,
        fdiseasecode,
        ftabucodeCn,
        ftabucode
      } = this
      let nextParam = {
        fadulthbsagcode: fadulthbsag.code,
        fadulthbsabcode: fadulthbsab.code,
        ftabucode,
        fallergyhistcode: fallergyhist.code,
        fdiseasecode,
        freactioncode: freaction.code,
        fadulthbsag: fadulthbsag.text,
        fadulthbsab: fadulthbsab.text,
        ftabuCn: ftabucodeCn,
        fallergyhistCn: fallergyhist.text,
        fdiseaseCn,
        freactionCn: freaction.text
      }
      nextParam = Object.assign(fileParam, nextParam)
      return nextParam
    },
    async onSubmit () {
      const nextParam = this.setPageStorage()
      const userName = sessionStorage.getItem('user')
      const crownDetailInfo = JSON.parse(sessionStorage.getItem('crownDetailInfo'))
      if (crownDetailInfo.childCode != null) {
        nextParam.childCode = crownDetailInfo.childCode
      }
      const pm = `?user_name=${encodeURIComponent(userName)}`
      // 拼接户籍地址和居住地址
      nextParam.regaddr = nextParam.regaddr + '.' + nextParam.regaddrDetail
      nextParam.dwelladdr = nextParam.dwelladdr + '.' + nextParam.dwelladdrDetail
      console.log(nextParam)
      const res = await this.$api.crownVaccination.changeAultVaccineInfo(nextParam, pm)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('编辑保存受种者登记信息', res.data)
        sessionStorage.removeItem('firstPageValue')
        sessionStorage.removeItem('secondPageValue')
        sessionStorage.removeItem('thirdPageValue')
        this.$dialog.alert({
          title: '提示',
          message: '保存成功！'
        }).then(() => {
          this.$router.replace({
            name: 'crownDetail'
          })
        })
      }
    },
    closeEdit () {
      sessionStorage.removeItem('firstPageValue')
      sessionStorage.removeItem('secondPageValue')
      sessionStorage.removeItem('thirdPageValue')
      this.$router.go(-2)
    },
    goBack () {
      let nextParam = this.setPageStorage()
      sessionStorage.setItem('thirdPageValue', JSON.stringify(nextParam))
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.crown-detail-edit-next-wrapper
  padding-bottom 300px;
  background-color #efeff4;
  .main
    margin 20px 20px 0;
    margin-left 20px;
    margin-right 20px;
    background #fff;
    border-radius 20px;
  .pageTitle
    padding 20px 0;
    img
      width 200px;
  >>> .van-cell__title
    color #9299a5;
  >>> .van-cell__value
    color #000;
    font-size 28px;
    input
      font-size 28px;
    textarea
      font-size 28px;
    .van-field__body
      width 100%;
  >>> .van-field__control:disabled
    color #000;
    -webkit-text-fill-color #000;
  .van-search
    width 80%;
    margin 0 auto;
    .van-search__content
      border-radius 40px;
  .van-cell__title
    color #9299a5;
  .van-cell__value
    color #000;
  .van-popup
    border-top-left-radius 30px;
    border-top-right-radius 30px;
    .sick-item
      font-size 24px;
      border-bottom 1px solid #ddd;
      margin 0 20px;
      color #000;
</style>
