import axios from '@utils/http/api'

export const getXGReservationList = data => {
  return axios({
    url: '/Encryption/XG/GetXGReservationList',
    method: 'get',
    data
  })
}
export const getXGReservationDetails = data => {
  return axios({
    url: '/Encryption/XG/GetXGReservationDetails',
    method: 'get',
    data
  })
}
export const cancelXGReservation = data => {
  return axios({
    url: '/Encryption/XG/CancelXGReservation',
    method: 'get',
    data
  })
}

export const getStaionTypeList = data => {
  return axios({
    url: '/Encryption/Adult/GetStaionTypeList',
    method: 'get',
    data
  })
}

export const getAdultStationAreaList = data => {
  return axios({
    url: '/Encryption/Adult/GetAdultStationAreaList',
    method: 'get',
    data
  })
}

export const getAdultStationList = data => {
  return axios({
    url: '/Encryption/Adult/GetAdultStationList',
    method: 'get',
    data
  })
}

export const getAdultStationMapList = data => {
  return axios({
    url: '/Encryption/Adult/GetAdultStationMapList',
    method: 'get',
    data
  })
}

export const getAdultStationDayListNew = data => {
  return axios({
    url: '/Encryption/Adult/GetAdultStationDayListNew',
    method: 'get',
    data
  })
}

export const geVaccineRemindInfo = data => {
  return axios({
    url: '/Encryption/Vaccine/GeVaccineRemindInfo',
    method: 'get',
    data
  })
}

export const approveVaccineRemind = data => {
  return axios({
    url: '/Encryption/Vaccine/ApproveVaccineRemind',
    method: 'get',
    data
  })
}

export const approveVaccineRemindCheckImg = data => {
  return axios({
    url: '/Vaccine/ApproveVaccineRemindCheckImg',
    method: 'post',
    data,
    isFile: true
  })
}

export const saveXGReservation = data => {
  return axios({
    url: '/Encryption/XG/SaveXGReservation',
    method: 'get',
    data
  })
}

export const getBactPriceById = data => {
  return axios({
    url: '/Encryption/Adult/GetBactPriceById',
    method: 'get',
    data
  })
}

export const getStationDetails = data => {
  return axios({
    url: '/Encryption/Station/GetStationDetails',
    method: 'get',
    data
  })
}

export const getStationNumberDescInfo = data => {
  return axios({
    url: '/Encryption/Station/GetStationNumberDescInfo',
    method: 'get',
    data
  })
}

export const checkAdultCanOrder = data => {
  return axios({
    url: '/Encryption/Adult/CheckAdultCanOrder',
    method: 'get',
    data
  })
}

export const saveTempYyInfo = data => {
  return axios({
    url: '/Encryption/XG/SaveTempYyInfo',
    method: 'get',
    data
  })
}
export default {
  getXGReservationList,
  getXGReservationDetails,
  cancelXGReservation,
  getStaionTypeList,
  getAdultStationAreaList,
  getAdultStationList,
  getAdultStationMapList,
  getAdultStationDayListNew,
  geVaccineRemindInfo,
  approveVaccineRemind,
  approveVaccineRemindCheckImg,
  saveXGReservation,
  getBactPriceById,
  getStationDetails,
  getStationNumberDescInfo,
  checkAdultCanOrder,
  saveTempYyInfo
}
