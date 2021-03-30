import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'

import util from './utils/util'
import * as consts from './utils/consts'
import * as types from './store/mutations/mutations-types'

import components from './plugins/components'
import directives from './plugins/directives'
import filters from './plugins/filters'
import methods from './plugins/methods'
import VueClipboard from 'vue-clipboard2'

import './assets/stylus/public.styl'
import './assets/stylus/icon.styl'
import './assets/iconfonts/iconfont.css'

// import 'swiper/dist/css/swiper.css'

import './plugins/vant.js'

import 'lib-flexible/flexible.js'

// 兼容ie
import '@babel/polyfill'

// 引入请求方法
import api from './utils/http'

import wx from 'weixin-jsapi'

Vue.use(api)
Vue.use(components)
Vue.use(directives)
Vue.use(filters)
Vue.use(methods)
Vue.use(VueClipboard)

Vue.prototype.$utils = util
Vue.prototype.$consts = consts
Vue.prototype.$types = types
Vue.prototype.$wx = wx

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (to.name === 'index') {
    if (to.query.type === '1') {
      next({ path: '/crown/crownVaccination', replace: true })
    } else if (to.query.type === '2') {
      next({ path: '/crown/crownAppointList', replace: true })
    } else if (to.query.type === '3') {
      next({ path: '/crown/crownList', replace: true })
    } else if (to.query.type === '4') {
      next({ path: '/crown/crownInfoCollect', replace: true })
    }
  }
  if (from.name !== 'crownDetail' && to.name === 'crownVaccination') {
    const userName = sessionStorage.getItem('user')
    const userHasXG = await Vue.prototype.$api.crownVaccination.checkUserHasXG({
      user_name: userName,
      scanInfo: 'index'
    })
    console.log('进入预订前查看状态', userHasXG)
    if (userHasXG.code === 1) {
      Vue.prototype.$toast({
        message: userHasXG.message
      })
      setTimeout(() => {
        window.location.href = '/HAINANZHYYJMBWeb/main.html'
      }, 300)
    } else {
      if (userHasXG.data.type === '0') {
        // 二维码
        next({
          name: 'crownVaccinationCode',
          query: {
            from: 'crownVaccination'
          },
          replace: true
        })
      } else if (userHasXG.data.type === '1') {
        // 签核页
        next({
          name: 'crownAppointStationMrc',
          query: {
            name: userHasXG.data.name,
            cid: userHasXG.data.cid,
            bactId: userHasXG.data.bactId,
            childCode: userHasXG.data.childCode,
            fromIndex: 1
          },
          replace: true
        })
      } else if (userHasXG.data.type === '2') {
        // 开通服务检索页
        const cid = sessionStorage.getItem('cid')

        if (cid && cid !== 'null') {
          next({ name: 'crownListAddFile', replace: true })
        } else {
          next({ name: 'crownListCheck', replace: true })
        }
      } else if (userHasXG.data.type === '3') {
        // 提示信息
        Vue.prototype.$dialog
          .alert({
            title: '提示',
            message: userHasXG.data.showMsg,
            confirmButtonText: '返回首页'
          })
          .then(() => {
            window.location.href = '/HAINANZHYYJMBWeb/main.html'
          })
      } else if (userHasXG.data.type === '4') {
        // 展示下次接种
        next()
      } else if (userHasXG.data.type === '5') {
        // 预订单详情页面
        next({
          name: 'crownAppointDetail',
          replace: true,
          query: {
            from: from.name === 'crownListAddNext' ? 'addNext' : '',
            reservationCode: userHasXG.data.reservationCode
          }
        })
      }
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
