import icon from '@/components/common/Icon'
import badge from '@/components/common/Badge'
import avatar from '@/components/common/Avatar'
import card from '@/components/common/Card'
import noData from '@/components/common/NoData'
import HeaderTitle from '@/components/common/HeaderTitle'
import commonPicker from '@/components/common/CommonPicker'
import List from '@/components/common/List'

import pageIndex from '@/components/page/PageIndex'
import pageSimple from '@/components/page/PageSimple'

import button from '@/components/form/Button'
import inputNoLabel from '@/components/form/InputNoLabel'
import datePicker from '@/components/form/DatePicker'
import checkbox from '@/components/form/Checkbox'

import { Form } from 'vant'

export default {
  install: Vue => {
    Vue.use(Form)

    Vue.component('ss-icon', icon)
    Vue.component('ss-badge', badge)
    Vue.component('ss-avatar', avatar)
    Vue.component('ss-card', card)
    Vue.component('ss-no-data', noData)
    Vue.component('ss-common-picker', commonPicker)
    Vue.component('ss-header', HeaderTitle)
    Vue.component('ss-list', List)

    Vue.component('ss-page-index', pageIndex)
    Vue.component('ss-page-simple', pageSimple)

    Vue.component('ss-button', button)
    Vue.component('ss-input-no-label', inputNoLabel)
    Vue.component('ss-date-picker', datePicker)
    Vue.component('ss-checkbox', checkbox)
  }
}
