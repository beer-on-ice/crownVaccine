import * as consts from '@/utils/consts'

export default {
  loadingPageFlag: false,
  loadingAxiosFlag: false,
  payFlag: false,
  env: consts.WEB,
  citycode: '460100000000',
  version: '5.0.0',
  pageSize: 20,
  timestamp: new Date().getTime(),
  currentBaby: null,
  signed: 0,
  priceId: '',
  bactId: '',
  childCode: '',
  vaccineCode: '',
  stationCode: '',
  productNo: '',
  factoryNo: '',
  reservation_date: '',
  reservation_begin_time: '',
  reservation_end_time: '',
  from: ''
}
