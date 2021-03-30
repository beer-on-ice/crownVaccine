import axios from 'axios'
import config from './config.js' // 倒入默认配置
// import qs from 'qs' // 序列化请求数据，视服务端的要求
import CryptoJS from './crypto-js'
import md5 from './md5.min'
import { Dialog, Toast } from 'vant'
var MD5_KEY = '2~s^}0app1[md5s7'
var sKeyApp = 'shen=new#su@app-'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'content-Type': 'application/json;charset=UTF-8'
      },
      withCredentials: true,
      data: config.data
      // transformResponse: [function(data) {}]
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        /*
         * Tip: 1
         * 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
         */

        /*
         * Tip: 2
         * // 带上 token , 可以结合 vuex 或者重 localStorage
         * if (store.getters.token) {
         *     config.headers['X-Token'] = getCookie('TOKEN') // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
         * } else {
         * 重定向到登录页面
         * }
         */

        /*
         * Tip: 3
         * 根据请求方法，序列化传来的参数，根据后端需求是否序列化
         */
        if (options.data && !options.data.user_name) {
          options.data.user_name = sessionStorage.getItem('user')
        }
        console.log('VUE_APP_TYPE', process.env.VUE_APP_TYPE)
        if (process.env.VUE_APP_TYPE === 'ONECODE') {
          options.data.city_code = sessionStorage.getItem('citycode')
        } else {
          options.data.city_code = '460100000000'
        }
        options.data.version_name = '5.6.0'
        if (
          config.method.toLocaleLowerCase() === 'post' ||
          config.method.toLocaleLowerCase() === 'put' ||
          config.method.toLocaleLowerCase() === 'delete'
        ) {
          if (options.isFile) {
            config.headers = {
              'content-Type': 'multipart/form-data'
            }
            let fmd = new FormData()
            for (var key in options.data) {
              fmd.append(key, options.data[key])
            }
            config.data = fmd
          } else {
            config.data = options.data
          }
        } else if (config.method.toLocaleLowerCase() === 'get') {
          var params = ''
          for (var item in options.data) {
            params += item + '=' + options.data[item] + '&'
          }
          params = params.substr(0, params.length - 1)

          const check = encrypt(params)
          const finalParams = {
            parameters: check,
            sign: md5(check + MD5_KEY),
            timestamp: new Date().getTime()
          }
          if (options.isOrigin) {
            config.params = options.data
          } else {
            config.params = finalParams
          }
        }

        return config
      },
      error => {
        // 请求错误时做些事(接口错误、超时等)
        /*
         *
         * Tip: 4
         * 关闭loading
         */
        console.log('request:', error)

        //  1.判断请求超时
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          console.log(
            '根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案'
          )
          // 例如再重复请求一次
          // return service.request(originalRequest);
        }
        //  2.需要重定向到错误页面
        const errorInfo = error.response

        console.log(errorInfo)

        if (errorInfo) {
          // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ... 等
          // eslint-disable-next-line
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          if (options.isOrigin) {
            data = response.data
          } else {
            data = decrypt(response.data.result)
          }
        }
        // 根据返回的code值来做不同的处理（和后端约定）
        switch (data.code) {
          case 9:
            Dialog({
              title: '提示',
              message: '登陆失效',
              confirmButtonText: '重新登录'
            }).then(() => {
              window.opener = null
              window.open('about:blank', '_top').close()
            })
            break
          default:
            break
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data
        // err.response = response

        // throw err
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break

            case 401:
              err.message = '未授权，请登录'
              break

            case 403:
              err.message = '拒绝访问'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 408:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
          }
        }
        Toast.fail(`ERROR: ${err}`)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options)
      .then(res => {
        resolve(res)
        return false
      })
      .catch(error => {
        reject(error)
      })
  })
}
function encrypt(word) {
  var srcs = ''
  var key = CryptoJS.enc.Utf8.parse(sKeyApp) // 16位
  var encrypted = ''
  if (typeof word === 'string') {
    srcs = CryptoJS.enc.Utf8.parse(word)
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  } else if (typeof word === 'object') {
    // 对象格式的转成json字符串
    var data = JSON.stringify(word)
    srcs = CryptoJS.enc.Utf8.parse(data)
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  }
  return encrypted.toString()
}
function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse(sKeyApp)
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
  // eslint-disable-next-line
  var result = decryptedStr.toString().replace(/\u0000/g, '')
  try {
    return JSON.parse(result)
  } catch (e) {
    return result
  }
}
