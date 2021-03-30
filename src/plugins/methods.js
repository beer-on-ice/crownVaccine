import { Dialog } from 'vant'
export default {
  install: Vue => {
    Vue.prototype.$dialog = Dialog
  }
}
