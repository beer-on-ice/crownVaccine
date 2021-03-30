import * as types from './mutations-types'

export default {
  [types.SET_LOADING_PAGE](state, data) {
    state.loadingPageFlag = data
  },
  [types.SET_LOADING_AXIOS](state, data) {
    state.loadingAxiosFlag = data
  },
  [types.SET_TIMESTAMP](state, data) {
    state.timestamp = new Date().getTime()
  },

  [types.SET_PRICEID](state, data) {
    state.priceId = data
  },
  [types.SET_BACTID](state, data) {
    state.bactId = data
  },
  [types.SET_CHILDCODE](state, data) {
    state.childCode = data
  },
  [types.SET_VACCINECODE](state, data) {
    state.vaccineCode = data
  },
  [types.SET_STATIONCODE](state, data) {
    state.stationCode = data
  },
  [types.SET_PRODUCTNO](state, data) {
    state.productNo = data
  },
  [types.SET_FACTORYNO](state, data) {
    state.factoryNo = data
  },
  [types.SET_SIGNED](state, data) {
    state.signed = data
  },
  [types.SET_REVDATE](state, data) {
    state.reservation_date = data
  },
  [types.SET_REVSTART](state, data) {
    state.reservation_begin_time = data
  },
  [types.SET_REVEND](state, data) {
    state.reservation_end_time = data
  },
  [types.SET_FROM](state, data) {
    state.from = data
  }
}
