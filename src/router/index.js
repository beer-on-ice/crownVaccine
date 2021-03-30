import Vue from 'vue'
import Router from 'vue-router'
import routes from '@config/routes.config.js'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

Vue.use(Router)

const router = new Router({
  // mode: IS_PROD ? 'hash' : 'history',
  mode: 'history',
  base: IS_PROD ? '/HAINANZHYYJMBWeb/' : '',
  routes
})

export default router
