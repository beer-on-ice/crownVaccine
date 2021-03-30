<template>
  <div class="crown-detail-edit-file-wrapper full-screen-s">
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
        <img :src="require('@/assets/images/common/three1.png')"
          alt="">
      </div>
      <van-form>
        <van-field v-model.trim="fhealthrecordid"
          input-align="right"
          label="城乡居民健康档案编号"
          placeholder="请输入 （非必填）"
          :rules="[{ required: false, message: '城乡居民健康档案编号只能是数字' }]" />
        <van-field v-model.trim="fnethealthid"
          input-align="right"
          label="居民健康卡号"
          placeholder="请输入 （非必填）"
          :rules="[{ required: false, message: '请输入' }]" />
        <van-field v-model.trim="name"
          input-align="right"
          required
          label="受种者姓名"
          placeholder="请输入 （必填）"
          :rules="[{ required: true }]" />
        <van-field v-model.trim="cid"
          input-align="right"
          readonly
          required
          label="身份证号码"
          placeholder="请输入 （必填）"
          :rules="[{ required: true }]" />
        <van-cell title="性别"
          :value="sex.text"
          required
          :is-link="canEditSBFlag"
          @click="showMultiplePicker('sex','性别',canEditSBFlag)" />
        <van-cell title="出生日期"
          :value="birth"
          required
          :is-link="canEditSBFlag"
          @click="showDatePicker('date','出生日期',canEditSBFlag)" />
        <van-field label="民族"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fnationcodeText"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('fnationcodeText','民族',2)" />
        <van-field label="婚姻状况"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fmaritalstatusCn"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('fmaritalstatusCn','婚姻状况',5)" />
        <van-field label="职业类别"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fcareercodeCn"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('fcareercodeCn','职业类别',3)" />
        <van-field label="人群分类"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="fcrowdkindText"
          is-link
          required
          input-align="right"
          :rules="[{ required: true }]"
          placeholder="请选择（必填）"
          @click="showList('fcrowdkindText','人群分类',6)" />
        <van-field label="学历"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="feducationdegreeCn"
          is-link
          input-align="right"
          placeholder="请选择（非必填）"
          @click="showList('feducationdegreeCn','学历',1)" />
        <van-field v-model.trim="fchildunitname"
          input-align="right"
          rows="1"
          type="textarea"
          autosize
          required
          label="工作单位/学校名称/社区"
          placeholder="请输入 （必填）"
          :rules="[{ required: true }]" />
        <van-field label="户籍类型"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="regTypeName"
          is-link
          required
          input-align="right"
          :rules="[{ required: true }]"
          placeholder="请选择（必填）"
          @click="showList('regTypeName','户籍类型',8)" />
        <van-field label="户籍地址"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="regaddr"
          is-link
          required
          input-align="right"
          :rules="[{ required: true }]"
          placeholder="请选择（必填）"
          @click="showList('regaddr','户籍地址','-1')" />
        <van-field v-model.trim="regaddrDetail"
          input-align="right"
          placeholder="请输入（必填）"
          :rules="[{ required: true }]" />
        <van-field label="现居住地址"
          readonly
          rows="1"
          type="textarea"
          autosize
          :value="dwelladdr"
          is-link
          required
          input-align="right"
          :rules="[{ required: true }]"
          placeholder="请选择（必填）"
          @click="showList('dwelladdr','现居住地址','-2')" />
        <van-field v-model.trim="dwelladdrDetail"
          input-align="right"
          placeholder="请输入（必填）"
          :rules="[{ required: true }]" />
        <van-field v-model.trim="otherphone"
          input-align="right"
          label="家庭电话"
          placeholder="请输入（非必填）"
          :rules="[{ message: '请输入家庭电话' }]" />
        <van-field v-model.trim="mobphone"
          input-align="right"
          label="移动电话"
          placeholder="请输入（非必填）"
          :rules="[{ message: '请输入移动电话' }]" />
      </van-form>
    </div>
    <div v-show="showFlag"
      class="btn-wrapper">
      <ss-button size="normal"
        @click="goNext">
        确认无误，下一步
      </ss-button>
    </div>
    <van-popup v-model.trim="popListFlag"
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
      <van-list v-model.trim="loading"
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
    <!-- <van-calendar v-model.trim="datePickerFlag"
      @confirm="datePickerConfirm" /> -->
    <van-popup v-model="datePickerFlag"
      position="bottom"
      :close-on-click-overlay="false"
      :style="{ height: '40%' }">
      <van-datetime-picker class='datePickerWrapper'
        v-model="currentDate"
        @confirm="datePickerConfirm"
        @cancel="datePickerFlag = false"
        :minDate="minDate"
        :maxDate="maxDate"
        type="date"
        title="选择出生日期" />
    </van-popup>
    <ss-common-picker :showFlag="multiplePickerFlag"
      :title="multiplePickerTitle"
      :columns="multiplePickerColumns"
      @popClick="multiplePickeClick"
      @pickerCancel="multiplePickeCancel"
      @pickerConfirm="multiplePickeConfirm" />
  </div>
</template>

<script>
const sexPickerList = [
  {
    code: 'first',
    text: '男'
  },
  {
    code: 'second',
    text: '女'
  }
]
export default {
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: '',
      childCode: '',
      showFlag: false,
      parentId: [],
      tmpAddressArr: [],
      tmpAddressCodeArr: [],
      type: '',
      canEditSBFlag: true,
      popListFlag: false,
      popList: [],
      filterPopList: [],
      loading: false,
      finished: false,
      searchKey: '',
      datePickerFlag: false,
      multiplePickerFlag: false,
      currentMultiplePickerKey: '',
      multiplePickerTitle: '',
      multiplePickerColumns: [],
      sexPickerList,
      pattern: /\d{6}/,
      fhealthrecordid: '',
      fnethealthid: '',
      name: '',
      cid: '',
      sex: {
        text: '',
        code: ''
      },
      birth: '',
      fchildunitname: '',
      otherphone: '',
      mobphone: '',
      feducationdegreeCn: '',
      feducationdegreecode: '',
      fnationcodeText: '',
      fnationcode: '',
      fcareercodeCn: '',
      fcareercode: '',
      fmaritalstatusCn: '',
      fmaritalstatuscode: '',
      fcrowdkindText: '',
      fcrowdkindcode: '',
      regTypeName: '',
      regtypecode: '',
      regaddr: '',
      regaddrDetail: '',
      fhukougbcode: '',
      dwelladdr: '',
      dwelladdrDetail: '',
      dwelladdrcode: '',
      jmFchildno: '',
      info: {},
      userName: sessionStorage.getItem('user')
    }
  },
  created () {
    this.getInfo()
  },
  mounted () {
    setTimeout(() => {
      this.showFlag = true
    }, 300)
  },
  methods: {
    async getInfo () {
      // 如果有缓存用缓存,没有缓存调接口并写入缓存
      let fileParam = JSON.parse(sessionStorage.getItem('firstPageValue'))
      if (fileParam != null) {
        this.setDetfaultParams(fileParam)
        return
      }
      const crownDetailInfo = JSON.parse(sessionStorage.getItem('crownDetailInfo'))
      this.childCode = crownDetailInfo.childCode
      const params = {
        user_name: this.userName,
        child_code: this.childCode
      }
      const res = await this.$api.crownVaccination.getAdultUserInfo(params)
      if (res.code === 1) {
        this.$toast(res.message)
      } else {
        console.log('编辑档案信息-获取', res.data)
        this.info = res.data
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
        // 写入缓存
        this.initStorage()
      }
    },
    initStorage () {
      const {
        birth,
        cid,
        dwelladdr,
        dwelladdrDetail,
        fadulthbsab,
        fadulthbsabcode,
        fadulthbsag,
        fadulthbsagcode,
        fallergyhistCn,
        fallergyhistcode,
        fatherid,
        fathername,
        fcareerCn,
        fcareercode,
        fchildunitname,
        fcrowdkindCn,
        fcrowdkindcode,
        fdiseaseCn,
        fdiseasecode,
        feducationdegreeCn,
        feducationdegreecode,
        ffathermobile,
        fhealthrecordid,
        fhukougbcode,
        fmaritalstatusCn,
        fmaritalstatuscode,
        fmothermobile,
        fnationCn,
        fnationcode,
        fnethealthid,
        freactionCn,
        freactioncode,
        ftabuCn,
        ftabucode,
        jmFchildno,
        dwelladdrcode,
        mhbsag,
        mhbsagcode,
        mobphone,
        motherid,
        mothername,
        name,
        otherphone,
        regaddr,
        regaddrDetail,
        regtype,
        regtypecode,
        sex
      } = this.info
      let fileParam = {
        fhealthrecordid,
        fmaritalstatusCn,
        fcareercodeCn: fcareerCn,
        fcrowdkindcode,
        feducationdegreeCn,
        regaddr,
        regaddrDetail,
        fhukougbcode,
        dwelladdr,
        dwelladdrDetail,
        dwelladdrcode,
        fnethealthid,
        name,
        sex,
        cid,
        birth,
        fchildunitname,
        otherphone,
        mobphone,
        fnationcodeText: fnationCn,
        fnationcode,
        fmaritalstatuscode,
        fcareercode,
        feducationdegreecode,
        regtypecode,
        regTypeName: regtype,
        fcrowdkindText: fcrowdkindCn,
        jmFchildno
      }
      sessionStorage.setItem(
        'firstPageValue',
        JSON.stringify(fileParam)
      )
      // let infoParam = {
      //   mothername,
      //   motherid,
      //   fmothermobile,
      //   mhbsagText: mhbsag,
      //   mhbsagcode,
      //   fathername,
      //   fatherid,
      //   ffathermobile
      // }
      // sessionStorage.setItem(
      //   'secondPageValue',
      //   JSON.stringify(infoParam)
      // )
      let nextParam = {
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
      }
      sessionStorage.setItem(
        'thirdPageValue',
        JSON.stringify(nextParam)
      )
      this.setDetfaultParams(fileParam)
    },
    setDetfaultParams (fileParam) {
      const tmpFileParam = {}
      for (var key in fileParam) {
        tmpFileParam[key] = dealwithNullValue(fileParam[key])
      }
      const {
        fhealthrecordid,
        fmaritalstatusCn,
        fcareercodeCn,
        fcrowdkindcode,
        feducationdegreeCn,
        regaddr,
        regaddrDetail,
        fhukougbcode,
        dwelladdr,
        dwelladdrDetail,
        dwelladdrcode,
        fnethealthid,
        name,
        sex,
        cid,
        birth,
        fchildunitname,
        otherphone,
        mobphone,
        fnationcodeText,
        fnationcode,
        fmaritalstatuscode,
        fcareercode,
        feducationdegreecode,
        regtypecode,
        regTypeName,
        fcrowdkindText,
        jmFchildno
      } = tmpFileParam
      this.fhealthrecordid = fhealthrecordid
      this.fmaritalstatusCn = fmaritalstatusCn
      this.fcareercodeCn = fcareercodeCn
      this.fcrowdkindcode = fcrowdkindcode
      this.feducationdegreeCn = feducationdegreeCn
      this.regaddr = regaddr
      this.regaddrDetail = regaddrDetail
      this.fhukougbcode = fhukougbcode
      this.dwelladdr = dwelladdr
      this.dwelladdrDetail = dwelladdrDetail
      this.dwelladdrcode = dwelladdrcode
      this.fnethealthid = fnethealthid
      this.name = name
      this.sex.text = sex
      this.cid = cid
      this.birth = birth
      this.fchildunitname = fchildunitname
      this.otherphone = otherphone
      this.mobphone = mobphone
      this.fnationcodeText = fnationcodeText
      this.fnationcode = fnationcode
      this.fmaritalstatuscode = fmaritalstatuscode
      this.fcareercode = fcareercode
      this.feducationdegreecode = feducationdegreecode
      this.regtypecode = regtypecode
      this.regTypeName = regTypeName
      this.fcrowdkindText = fcrowdkindText
      this.jmFchildno = jmFchildno
    },
    formatDate (date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
    },
    // 弹层相关
    showList (key, title, type) {
      this.type = type
      this.popList = []
      this.filterPopList = []
      this.searchPop()
      this.popListFlag = true
    },
    listClick (item) {
      if (Number(this.type) < 0) {
        this.tmpAddressArr.push(item.name)
        this.tmpAddressCodeArr.push(item.code)
      }
      if (item.hasChild) {
        if (!this.parentId.length) this.parentId.unshift(0)
        this.parentId.push(item.id)
        this.popList = []
        this.filterPopList = []
        this.searchPop(item.id)
      } else {
        const type = String(this.type)
        if (type === '1') {
          this.feducationdegreeCn = item.name
          this.feducationdegreecode = item.code
        } else if (type === '2') {
          this.fnationcodeText = item.name
          this.fnationcode = item.code
        } else if (type === '3') {
          this.fcareercodeCn = item.name
          this.fcareercode = item.code
        } else if (type === '5') {
          this.fmaritalstatusCn = item.name
          this.fmaritalstatuscode = item.code
        } else if (type === '6') {
          this.fcrowdkindText = item.name
          this.fcrowdkindcode = item.code
        } else if (type === '8') {
          this.regTypeName = item.name
          this.regtypecode = item.code
        } else if (type === '-1') {
          this.regaddr = this.tmpAddressArr.join('.')
          this.fhukougbcode = this.tmpAddressCodeArr.join('.')
        } else if (type === '-2') {
          this.dwelladdr = this.tmpAddressArr.join('.')
          this.dwelladdrcode = this.tmpAddressCodeArr.join('.')
        }
        this.type = ''
        this.popList = []
        this.filterPopList = []
        this.tmpAddressArr = []
        this.tmpAddressCodeArr = []
        this.closePopList(true)
      }
    },
    // 在子分类点击返回时怎么判断是否要关闭弹层
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
    // 选择器相关
    multiplePickeClick () {
      this.multiplePickerFlag = false
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
    showMultiplePicker (key, title, flag) {
      if (!flag) return
      this.currentMultiplePickerKey = key
      this.multiplePickerTitle = title
      this.multiplePickerColumns = this[`${key}PickerList`]
      this.multiplePickerFlag = true
    },
    showDatePicker (key, title, flag) {
      if (!flag) return
      this.datePickerFlag = true
    },
    datePickerConfirm () {
      this.datePickerFlag = false
      this.birth = this.formatDate(this.currentDate)
    },
    setPageStorage () {
      const {
        fhealthrecordid,
        fmaritalstatusCn,
        fcareercodeCn,
        fcrowdkindcode,
        feducationdegreeCn,
        regaddr,
        regaddrDetail,
        fhukougbcode,
        dwelladdr,
        dwelladdrDetail,
        dwelladdrcode,
        fnethealthid,
        name,
        sex,
        cid,
        birth,
        fchildunitname,
        otherphone,
        mobphone,
        fnationcodeText,
        fnationcode,
        fmaritalstatuscode,
        fcareercode,
        feducationdegreecode,
        regtypecode,
        regTypeName,
        fcrowdkindText,
        jmFchildno
      } = this
      const fileParam = {
        fhealthrecordid: fhealthrecordid.replaceAll(' ', '').trim(),
        fmaritalstatusCn,
        fcareercodeCn,
        fcrowdkindcode,
        feducationdegreeCn,
        regaddr,
        regaddrDetail,
        fhukougbcode,
        dwelladdr,
        dwelladdrDetail,
        dwelladdrcode,
        fnethealthid: fnethealthid.replaceAll(' ', '').trim(),
        name: name.replaceAll(' ', ' ').trim(),
        sex: sex.text,
        cid: cid.replaceAll(' ', ' ').trim(),
        birth,
        fchildunitname: fchildunitname.replaceAll(' ', ' ').trim(),
        otherphone: otherphone.trim(),
        mobphone: mobphone.trim(),
        fnationcodeText,
        fnationcode,
        fmaritalstatuscode,
        fcareercode,
        feducationdegreecode,
        regtypecode,
        regTypeName,
        fcrowdkindText,
        jmFchildno
      }
      return fileParam
    },
    closeEdit () {
      sessionStorage.removeItem('firstPageValue')
      sessionStorage.removeItem('secondPageValue')
      sessionStorage.removeItem('thirdPageValue')
      this.$router.go(-1)
    },
    goNext () {
      const fileParam = this.setPageStorage()
      var result = validateParams(fileParam)
      if (result === 'success') {
        var age = calculateAge(fileParam.birth)
        if (age < 18) {
          this.$toast('新冠受种者小于18岁，无法登记')
        } else if (age > 59) {
          this.$dialog.confirm({
            title: '提示',
            message: '新冠疫苗接种年龄范围为18-59岁，确定登记？',
            confirmButtonText: '继续'
          })
            .then(() => {
              sessionStorage.setItem(
                'firstPageValue',
                JSON.stringify(fileParam)
              )
              this.$router.push({
                name: 'crownDetailEditNext'
              })
            })
        } else {
          sessionStorage.setItem(
            'firstPageValue',
            JSON.stringify(fileParam)
          )
          this.$router.push({
            name: 'crownDetailEditNext'
          })
        }
      } else {
        this.$toast(result)
      }
    }
  }
}
function calculateAge (strBirthday) {
  var returnAge
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge // 返回周岁年龄
}
function validateParams (params) {
  var result = 'success'
  if (params.fhealthrecordid != null) {
    if (params.fhealthrecordid.length > 17) {
      result = '城乡居民健康档案编号的长度不能超过17位'
    } else if (!isHealthArchive(params.fhealthrecordid)) {
      result = '城乡居民健康档案编号只能是数字'
    }
  }

  if (params.fnethealthid != null) {
    if (params.fnethealthid.length > 18) {
      result = '居民健康卡号的长度不能超过18位'
    } else if (!isHealthCard(params.fnethealthid)) {
      result = '居民健康卡号只能是数字和字母'
    }
  }

  if (!params.name) {
    result = '受种者姓名不能为空'
  } else if (params.name.length > 25) {
    result = '受种者姓名的长度不能超过25位'
  } else if (!isName(params.name)) {
    result = '受种者姓名只能由汉字数字和字母组成'
  }

  if (params.cid == null || !params.cid) {
    result = '身份证号码不能为空'
  } else if (params.cid.length != 18) {
    result = '身份证号码的长度不是18位'
  } else if (!isId(params.cid)) {
    result = '身份证号码格式不正确'
  }
  if (!params.sex) {
    result = '性别不能为空'
  }

  if (!params.birth) {
    result = '出生日期不能为空'
  }

  if (!params.fcrowdkindcode) {
    result = '人群分类不能为空'
  }

  if (params.fchildunitname == null || !params.fchildunitname) {
    result = '工作单位/学校名称/社区不能为空'
  } else if (params.fchildunitname.length > 35) {
    result = '工作单位/学校名称/社区的长度不能超过35位'
  } else if (!isSchoolName(params.fchildunitname)) {
    result = '工作单位/学校名称/社区只能由汉字数字和字母组成'
  }

  if (!params.regtypecode) {
    result = '户籍类型不能为空'
  }

  if (!params.regaddr) {
    result = '户籍地址不能为空'
  }

  if (!params.regaddrDetail) {
    result = '户籍地址详细地址不能为空'
  } else if (params.regaddr.length + params.regaddrDetail.length > 50) {
    result = '户籍地址的长度不能超过50位'
  } else if (!isAddress(params.regaddrDetail)) {
    result = '户籍地址详细地址只能由汉字数字和字母组成'
  }

  if (!params.dwelladdr) {
    result = '现居住地址不能为空'
  }

  if (!params.dwelladdrDetail) {
    result = '现居住地址详细地址不能为空'
  } else if (
    params.dwelladdr.length + params.dwelladdrDetail.length >
    50
  ) {
    result = '现居住地址的长度不能超过50位'
  } else if (!isAddress(params.dwelladdrDetail)) {
    result = '现居住地址详细地址只能由汉字数字和字母组成'
  }

  if (!params.mobphone) {
  } else if (params.mobphone.length != 11) {
    result = '移动电话的长度只能是11位'
  } else if (params.mobphone.charAt(0) != '1') {
    result = '移动电话需要以1开头'
  } else if (!isPhone(params.mobphone)) {
    result = '移动电话只能由数字组成'
  }

  if (params.otherphone != null && params.otherphone.length != 0) {
    if (params.otherphone.length != 11) {
      result = '家庭电话的长度只能是11位'
    } else if (params.otherphone.charAt(0) != '1') {
      result = '家庭电话需要以1开头'
    } else if (!isPhone(params.otherphone)) {
      result = '家庭电话只能由数字组成'
    }
  }

  return result
}
function isHealthArchive (val) {
  var pattern = /^(\d{0,18})$/
  return pattern.test(val)
}
function isName (val) {
  var pattern = /^[a-zA-z\u4E00-\u9FA5\uF900-\uFA2D\d]{1,25}$/
  return pattern.test(val)
}

// 身份证
function isId (val) {
  // var pattern = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  var pattern = /^[0-9*Xx]{18}$/
  return pattern.test(val)
}

// 工作单位/学校名称/社区的长度不能超过35位
function isSchoolName (val) {
  var pattern = /^[a-zA-z\u4E00-\u9FA5\uF900-\uFA2D\d\,\(\)\-\—\（\）\。\，\s]{0,35}$/
  return pattern.test(val)
}

// 居民健康卡号，数字字母18位
function isHealthCard (val) {
  var pattern = /^([a-zA-Z\d]{0,18})$/
  return pattern.test(val)
}
function isAddress (val) {
  var pattern = /^[a-zA-z\u4E00-\u9FA5\uF900-\uFA2D\d\,\(\)\-\—\（\）\。\，\s]{1,100}$/
  return pattern.test(val)
}
function isPhone (val) {
  // var pattern = /^(\d{11})$/;
  var pattern = /^([0-9*]{11})$/
  return pattern.test(val)
}
function dealwithNullValue (val) {
  return val == null || val == undefined ? '' : val
}
String.prototype.replaceAll = function (
  reallyDo,
  replaceWith,
  ignoreCase
) {
  if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
    return this.replace(
      new RegExp(reallyDo, ignoreCase ? 'gi' : 'g'),
      replaceWith
    )
  } else {
    return this.replace(reallyDo, replaceWith)
  }
}

</script>

<style lang="stylus" scoped>
.crown-detail-edit-file-wrapper
  padding-bottom 200px;
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
  >>> .van-cell
    display flex;
    align-items center;
  >>> .van-cell__title
    color #9299a5;
  >>> .van-cell__value
    color #000;
    font-size 28px;
    display flex;
    justify-content flex-end;
    align-items center;
    input
      font-size 28px;
    textarea
      font-size 28px;
    .van-field__body
      width 100%;
  .van-popup
    border-top-left-radius 30px;
    border-top-right-radius 30px;
    .sick-item
      font-size 24px;
      border-bottom 1px solid #ddd;
      margin 0 20px;
      color #000;
    .van-search
      width 80%;
      margin 0 auto;
      .van-search__content
        border-radius 40px;
</style>
