<template>
  <div class="crown-detail-edit-info-wrapper full-screen-s">
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
        <img :src="require('@/assets/images/common/three2.png')"
          alt="">
      </div>
      <van-form>
        <van-field v-model.trim="mothername"
          input-align="right"
          label="母亲姓名"
          placeholder="请输入（非必填）"
          :rules="[ {required: false}]" />
        <van-field v-model.trim="motherid"
          input-align="right"
          label="母亲身份证号"
          placeholder="请输入（非必填）"
          :rules="[ {required: false}]" />
        <van-field v-model.trim="fmothermobile"
          input-align="right"
          label="母亲电话"
          placeholder="请输入（非必填）"
          :rules="[{required: false}]" />
        <van-cell title="母亲乙肝表面抗原"
          :value="mhbsag.text"
          is-link
          @click="showMultiplePicker('mhbsag','母亲乙肝表面抗原')" />
        <van-field v-model.trim="fathername"
          input-align="right"
          label="父亲姓名"
          placeholder="请输入（非必填）"
          :rules="[ {required: false }]" />
        <van-field v-model.trim="fatherid"
          input-align="right"
          label="父亲身份证号"
          placeholder="请输入（非必填）"
          :rules="[ {required: false}]" />
        <van-field v-model.trim="ffathermobile"
          input-align="right"
          label="父亲电话"
          placeholder="请输入（非必填）"
          :rules="[{required: false}]" />
      </van-form>
    </div>
    <div v-show="showFlag"
      class="btn-wrapper">
      <ss-button size="normal"
        @click="goNext">
        确认无误，下一步
      </ss-button>
      <p class="back"
        @click="goBack">返回上一步修改</p>
    </div>
    <ss-common-picker :showFlag="multiplePickerFlag"
      :title="multiplePickerTitle"
      :columns="multiplePickerColumns"
      @popClick="popClick"
      @pickerCancel="multiplePickeCancel"
      @pickerConfirm="multiplePickeConfirm"></ss-common-picker>
  </div>
</template>

<script>
const mhbsagPickerList = [{
  code: '01',
  text: '阳性'
}, {
  code: '02',
  text: '阴性'
}, {
  code: '03',
  text: '未检测'
}]
export default {
  data () {
    return {
      showFlag: false,
      multiplePickerFlag: false,
      currentMultiplePickerKey: '',
      multiplePickerTitle: '',
      multiplePickerColumns: [],
      mhbsagPickerList,
      mothername: '',
      motherid: '',
      fmothermobile: '',
      fathername: '',
      fatherid: '',
      ffathermobile: '',
      mhbsag: {
        text: '',
        code: ''
      }
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
      this.mhbsag.text = '未检测'
      this.mhbsag.code = '03'
    },
    getData () {
      let infoParam = JSON.parse(sessionStorage.getItem('secondPageValue'))
      if (infoParam != null) {
        this.setDetfaultParams(infoParam)
      }
    },
    setDetfaultParams (infoParam) {
      const tmpInfoParam = {}
      for (var key in infoParam) {
        tmpInfoParam[key] = dealwithNullValue(infoParam[key])
      }
      const {
        mothername,
        motherid,
        fmothermobile,
        mhbsagText,
        mhbsagcode,
        fathername,
        fatherid,
        ffathermobile
      } = tmpInfoParam
      this.mothername = mothername
      this.motherid = motherid
      this.fmothermobile = fmothermobile
      this.mhbsag.text = mhbsagText
      this.mhbsag.code = mhbsagcode
      this.fathername = fathername
      this.fatherid = fatherid
      this.ffathermobile = ffathermobile
    },
    popClick () {
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
    showMultiplePicker (key, title) {
      console.log(key, title)
      this.currentMultiplePickerKey = key
      this.multiplePickerTitle = title
      this.multiplePickerColumns = this[`${key}PickerList`]
      this.multiplePickerFlag = true
    },
    setPageStorage () {
      let fileParam = JSON.parse(sessionStorage.getItem('firstPageValue'))
      const {
        mothername,
        motherid,
        fmothermobile,
        mhbsag,
        fathername,
        fatherid,
        ffathermobile
      } = this
      let infoParam = {
        mothername: mothername.replaceAll(' ', ' ').trim(),
        motherid: motherid.replaceAll(' ', ' ').trim(),
        fmothermobile: fmothermobile.trim(),
        fathername: fathername.replaceAll(' ', ' ').trim(),
        fatherid: fatherid.replaceAll(' ', ' ').trim(),
        ffathermobile: ffathermobile.trim(),
        mhbsagText: mhbsag.text,
        mhbsagcode: mhbsag.code
      }
      infoParam = Object.assign(fileParam, infoParam)
      return infoParam
    },
    goNext () {
      let infoParam = this.setPageStorage()
      var result = validateParams(infoParam)
      if (result == 'success') {
        sessionStorage.setItem('secondPageValue', JSON.stringify(infoParam))
        this.$router.push({
          name: 'crownDetailEditNext'
        })
      } else {
        this.$toast(result)
      }
    },
    closeEdit () {
      sessionStorage.removeItem('firstPageValue')
      sessionStorage.removeItem('secondPageValue')
      sessionStorage.removeItem('thirdPageValue')
      this.$router.go(-2)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
function validateParams (params) {
  var result = 'success'
  if (params.mothername != null && params.mothername.length > 0) {
    if (params.mothername.length > 25) {
      result = '母亲姓名不能超过25位'
    } else if (!isName(params.mothername)) {
      result = '母亲姓名只能由汉字数字和字母组成'
    }
  }

  if (params.fathername != null && params.fathername.length > 0) {
    if (params.fathername.length > 25) {
      result = '父亲姓名不能超过25位'
    } else if (!isName(params.fathername)) {
      result = '父亲姓名只能由汉字数字和字母组成'
    }
  }

  if (params.motherid != null && params.motherid.length != 0) {
    if (params.motherid.length != 18) {
      result = '母亲身份证号码的长度只能是18位'
    } else if (!isId(params.motherid)) {
      result = '母亲身份证号码格式不正确'
    }
  }

  if (params.fatherid != null && params.fatherid.length != 0) {
    if (params.fatherid.length != 18) {
      result = '父亲身份证号码的长度只能是18位'
    } else if (!isId(params.fatherid)) {
      result = '父亲身份证号码格式不正确'
    }
  }

  if (params.fmothermobile != null && params.fmothermobile.length != 0) {
    if (params.fmothermobile.length != 11) {
      result = '母亲电话的长度只能是11位'
    } else if (params.fmothermobile.charAt(0) != '1') {
      result = '母亲电话需要以1开头'
    } else if (!isPhone(params.fmothermobile)) {
      result = '母亲电话只能由数字组成'
    }
  }

  if (params.ffathermobile != null && params.ffathermobile.length != 0) {
    if (params.ffathermobile.length != 11) {
      result = '父亲电话的长度只能是11位'
    } else if (params.ffathermobile.charAt(0) != '1') {
      result = '父亲电话需要以1开头'
    } else if (!isPhone(params.ffathermobile)) {
      result = '父亲电话只能由数字组成'
    }
  }

  return result
}

// 受种者姓名不能为空
// 受种者姓名的长度不能超过25位
// 汉字、数字、字母
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
function isPhone (val) {
  // var pattern = /^(\d{11})$/;
  var pattern = /^([0-9*]{11})$/
  return pattern.test(val)
}

function dealwithNullValue (val) {
  return (val == null || val == undefined) ? '' : val
}

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
  if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
    return this.replace(new RegExp(reallyDo, (ignoreCase ? 'gi' : 'g')), replaceWith)
  } else {
    return this.replace(reallyDo, replaceWith)
  }
}

</script>

<style lang="stylus" scoped>
.crown-detail-edit-info-wrapper
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
    input
      font-size 28px;
    textarea
      font-size 28px;
    .van-field__body
      width 100%;
</style>
