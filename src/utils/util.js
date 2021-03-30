/**
 * 公共方法
 */
import router from '@/router'
import * as consts from './consts'
import state from '@/store/state/state'

// 格式化时间时候用到
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
export default {
  // 退出所有页面
  exit() {
    if (state.env === consts.WECHAT) {
      window.WeixinJSBridge.call('closeWindow')
      return
    }
    if (state.env === consts.JSBRIDGE) {
      return
    }
    router.go(-1)
  },
  openCamera() {},
  // 跳转页面
  goPage(path) {
    if (!path) {
      router.push('/building')
      return
    }
    router.push(path)
  },
  // 后退一页
  goBack() {
    router.go(-1)
  },
  // 今天
  today() {
    return this.formatDate(new Date())
  },
  // 获取时间字符串
  getDateArr(date) {
    if (typeof date === 'string') {
      date = this.parseDate(date)
    }
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  },
  // 字符串转时间
  parseDate(datestr) {
    if (!datestr) {
      return new Date()
    }
    return new Date(datestr.replace(/-/g, '/'))
  },
  // 格式化时间
  formatDate(date, fmt) {
    if (!date) {
      return ''
    }
    if (!fmt) {
      fmt = 'yyyy-MM-dd'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        )
      }
    }
    return fmt
  },
  // 获取绝对位置x
  getAbsoluteLeft(o) {
    let oLeft = o.offsetLeft
    while (o.offsetParent != null) {
      let oParent = o.offsetParent
      oLeft += oParent.offsetLeft
      o = oParent
    }
    return oLeft
  },
  // 获取绝对位置y
  getAbsoluteTop(o) {
    let oTop = o.offsetTop
    while (o.offsetParent != null) {
      let oParent = o.offsetParent
      oTop += oParent.offsetTop
      o = oParent
    }
    return oTop
  }
}
