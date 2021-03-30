var MD5_KEY = '2~s^}0app1[md5s7'
var sKey_app = 'shen=new#su@app-'

var loadjsflag = false

var payflag = false

var toastOptions = {
  timeout: 3000
}

window.axios && (axios.defaults.withCredentials = true)

function encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(sKey_app) // 16位
  var encrypted = ''
  if (typeof word === 'string') {
    var srcs = CryptoJS.enc.Utf8.parse(word)
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  } else if (typeof word === 'object') {
    // 对象格式的转成json字符串
    data = JSON.stringify(word)
    var srcs = CryptoJS.enc.Utf8.parse(data)
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  }
  return encrypted.toString()
}
function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(sKey_app)
  word = CryptoJS.enc.Base64.parse(word).toString()
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr).toString(
    CryptoJS.enc.Utf8
  )
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  var result = decryptedStr.toString().replace(/\u0000/g, '')
  try {
    return JSON.parse(result)
  } catch (e) {
    return result
  }
}

var backfunction
window.onload = function() {
  document.body.addEventListener(
    'touchmove',
    function(e) {
      // e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    },
    { passive: false }
  )
}
function setDate(picker, timestr) {
  picker.setSelectedValue(timestr)
}
function setmuidatafocus() {
  var buttons = document.getElementsByTagName('button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('touchstart', function() {
      setBlur()
    })
    buttons[i].addEventListener('click', function() {
      setBlur()
    })
  }
  var inputs = document.getElementsByTagName('input')
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', function() {
      setBlur(this)
      var that = this
      setTimeout(function() {
        that.scrollIntoViewIfNeeded(true)
      }, 200)
    })
    inputs[i].addEventListener('touchstart', function() {
      setBlur(this)
      var that = this
      setTimeout(function() {
        that.scrollIntoViewIfNeeded(true)
      }, 200)
    })
  }
  var textareas = document.getElementsByTagName('textarea')
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].addEventListener('click', function() {
      setBlur(this)
      var that = this
      setTimeout(function() {
        that.scrollIntoViewIfNeeded(true)
      }, 200)
    })
    textareas[i].addEventListener('touchstart', function() {
      setBlur(this)
      var that = this
      setTimeout(function() {
        that.scrollIntoViewIfNeeded(true)
      }, 200)
    })
  }

  var arr = document.getElementsByTagName('ons-icon')
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('touchstart', function() {
      setBlur()
    })
    arr[i].addEventListener('click', function() {
      setBlur()
    })
  }
  var disables = document.querySelectorAll('input:disabled')
  for (var i = 0; i < disables.length; i++) {
    disables[i].addEventListener('touchstart', function() {
      setBlur()
    })
    disables[i].addEventListener('click', function() {
      setBlur()
    })
  }
}

function setinputBlur(obj) {
  var inputs = document.getElementsByTagName('input')
  // alert("inputs失焦")
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] != obj) {
      inputs[i].blur()
    }
  }
}
function settextareaBlur(obj) {
  var textareas = document.getElementsByTagName('textarea')
  // alert("textareas失焦")
  for (var i = 0; i < textareas.length; i++) {
    if (textareas[i] != obj) {
      textareas[i].blur()
    }
  }
}
function setBlur(obj) {
  var inputs = document.getElementsByTagName('input')
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] != obj) {
      inputs[i].blur()
    }
  }
  var textareas = document.getElementsByTagName('textarea')
  for (var i = 0; i < textareas.length; i++) {
    if (textareas[i] != obj) {
      textareas[i].blur()
    }
  }
}
// HAINANZHYYJMBWeb 上线修改
var JMBWebAPPConfig = {
  interfaceUrl: 'http://localhost:7070' // 本地
  // interfaceUrl: 'http://wjinmiao.net/JmbHaiNan' // 测试-onecode
  // interfaceUrl: 'http://wjinmiao.net:7714/jmb' // 测试-smart

  // interfaceUrl: 'http://36.101.208.34:9103/jmbhainan' // 正式
}

// 上线修改 SMART / ONECODE
var VUE_DEPLOY_TYPE = 'SMART'

function axiosGet(args, method, fun) {
  if (!args) {
    args = {}
  }
  /* for(var key in args) {
    	args[key] = encodeURI(args[key]);
    } */
  // args.token=sessionStorage.getItem("token");
  if (!args.user_name) {
    args.user_name = sessionStorage.getItem('user') || ''
  }
  if (!args.city_code && VUE_DEPLOY_TYPE === 'ONECODE') {
    args.city_code = sessionStorage.getItem('citycode')
  }
  if (!args.city_code && VUE_DEPLOY_TYPE === 'SMART') {
    args.city_code = '460100000000'
  }
  args.version_name = '5.6.0'
  // args.method=method;
  // args.timeout=1000;
  // args.headers={'Content-Type':'application/x-www-form-urlencoded'};
  // axios.get(JMBWebAPPConfig.interfaceUrl + '/Web/HtmlTestServlet', {params: args})
  var params = ''
  for (var item in args) {
    params += item + '=' + args[item] + '&'
  }
  params = params.substr(0, params.length - 1)
  var check = encrypt(params)
  axios
    .get(JMBWebAPPConfig.interfaceUrl + method, {
      params: {
        parameters: check,
        sign: md5(check + MD5_KEY),
        timestamp: new Date().getTime()
      },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(response) {
      if (response.status == 200) {
        if (!response.data.result) {
          fun(response.data)
          return
        }
        if (md5(response.data.result + MD5_KEY) != response.data.sign) {
          ons.notification.alert('登录失效！', {
            title: '提示',
            buttonLabels: '重新登录',
            callback: function() {
              window.history.go(-1)
            }
          })
          return
        }
        var data = decrypt(response.data.result)
        if (data.code == '9') {
          ons.notification.alert('登录失效！', {
            title: '提示',
            buttonLabels: '重新登录',
            callback: function() {
              window.history.go(-1)
            }
          })
          return
        }
        fun(data)
      } else {
        ons.notification.alert('访问错误,请检查网络', {
          title: '提示',
          buttonLabels: '重新登录',
          callback: function() {
            window.history.go(-1)
          }
        })
      }
    })
    .catch(function(error) {
      // alert(error);
      console.log(error)
    })
}
function axiosPost(formData, method, fun) {
  if (formData == undefined) {
    formData = new FormData()
  }
  // formData.append("token", sessionStorage.getItem("token"));
  formData.append('user_name', sessionStorage.getItem('user') || '')
  if (VUE_DEPLOY_TYPE === 'ONECODE') {
    formData.append('city_code', sessionStorage.getItem('citycode') || '')
  }
  if (VUE_DEPLOY_TYPE === 'SMART') {
    formData.append('city_code', '460100000000')
  }
  formData.append('timeout', 1000)
  formData.append('visit_flag', 'web')

  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  axios
    .post(JMBWebAPPConfig.interfaceUrl + method, formData, config)
    .then(function(response) {
      if (response.status == 200) {
        if (md5(response.data.result + MD5_KEY) != response.data.sign) {
          ons.notification.alert('登录失效！', {
            title: '提示',
            buttonLabels: '重新登录',
            callback: function() {
              window.history.go(-1)
            }
          })
          return
        }
        var data = decrypt(response.data.result)
        if (data.code == '1' && data.message == '访问失败，请重新登录') {
          ons.notification.alert('登录失效！', {
            title: '提示',
            buttonLabels: '重新登录',
            callback: function() {
              window.history.go(-1)
            }
          })
          return
        }
        fun(data)
      } else {
        ons.notification.alert('访问错误,请检查网络', {
          title: '提示',
          buttonLabels: '重新登录',
          callback: function() {
            window.history.go(-1)
          }
        })
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// 判断是否是18位儿童编码
function isChildNo(val) {
  var reg = /^\d{18}$/
  if (reg.test(val)) {
    return true
  }
  return false
}

// 判断是否是非负整数
function isNumber(val) {
  var reg = /^\d+$/
  if (reg.test(val)) {
    return true
  }
  return false
}

// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
function isCardNo(card) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(card) === false) {
    return false
  }
  return true
}

// 判断是否是手机号码
function isMobileNumber(val) {
  var reg = /^1\d{10}$/
  if (reg.test(val) === false) {
    return false
  }
  return true
}

// 判断是否是固定电话
function isTel(val) {
  var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if (reg.test(val) === false) {
    return false
  }
  return true
}

// 判断是否是邮箱地址
function isEmail(val) {
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (reg.test(val) === false) {
    return false
  }
  return true
}
// 获取当前时间
function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    ' ' +
    date.getHours() +
    seperator2 +
    date.getMinutes() +
    seperator2 +
    date.getSeconds()
  return currentdate
}

// 获取当前日期
function getNowFormatDate2() {
  var date = new Date()
  var month = date.getMonth()
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = []
  currentdate.push(date.getFullYear())
  currentdate.push(month)
  currentdate.push(strDate)
  return currentdate
}

// 获取当前日期
function getNowFormatDate3() {
  var date = new Date()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var currentdate = []
  currentdate.push(date.getFullYear())
  currentdate.push(date.getMonth() + 1)
  currentdate.push(date.getDate())
  return currentdate
}

function getFormatDate(timestamp) {
  var date = new Date(parseInt(timestamp))
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = []
  currentdate.push(date.getFullYear())
  currentdate.push(month)
  currentdate.push(strDate)
  return currentdate.join('-')
}
function parseAddress(address) {
  var result = ['', '']
  if (address) {
    if (address.indexOf('.') > -1) {
      var i = address.lastIndexOf('.')
      /* if(address.substr(i, 1) == ".") {
				result[0] = address.substring(0, i-1).replace(/\./g, "");
			} else {
				result[0] = address.substring(0, i).replace(/\./g, "");
			} */
      result[0] = address.substring(0, i)
      result[1] = address.substring(i + 1)
      return result
    }
    result[0] = address
  }
  return result
}

function coverArrayToString(arr) {
  var result = ''
  if (arr != null && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (i > 0) {
        result += ','
      }
      result += arr[i]
    }
  }
  return result
}

String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '')
}

/* function parseBase64Data(imgUrls) {
	let urlArr = [];
	for(let i = 0; i < imgUrls.length; i++) {
		if(imgUrls[i].indexOf('file') == -1) {
			urlArr.push(imgUrls[i].split(',')[1]);
		} else {
			urlArr.push(imgUrls[i]);
		}
	}
	return urlArr;
}
*/

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeString })
}

/* function byteToString(arr) {
    if(typeof arr === 'string') {
        return arr;
    }
    var str = '',
        _arr = arr;
    for(var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if(v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for(var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}
*/

function removePoint(s) {
  if (s && s == '.') {
    s = ''
  }
  return s
}

// 判断是否是安卓还是ios
function isAndroid_ios() {
  var u = navigator.userAgent
  var app = navigator.appVersion
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  return isAndroid == true
}

/* if(!isWeixinBrowser()){
window.history.go(-1);
} */
function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase()
  if (agent.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
