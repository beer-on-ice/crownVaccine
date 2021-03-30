import axios from '@utils/http/api'

export const getBaseData = data => {
  return axios({
    url: '/Encryption/rabies/getBaseData',
    method: 'get',
    data
  })
}
export const getBaseCodeInfo = data => {
  return axios({
    url: '/System/GetBaseCodeInfo',
    method: 'get',
    data,
    isOrigin: true
  })
}
export const getStation = data => {
  return axios({
    url: '/Encryption/XG/getStation',
    method: 'get',
    data
  })
}

export const getCommittee = data => {
  return axios({
    url: '/Encryption/XG/getCommittee',
    method: 'get',
    data
  })
}

export const saveHNVaccinateWish = data => {
  return axios({
    url: '/Encryption/XG/saveHNVaccinateWish',
    method: 'post',
    data
  })
}

export default {
  getBaseData,
  getBaseCodeInfo,
  getStation,
  getCommittee,
  saveHNVaccinateWish
}
