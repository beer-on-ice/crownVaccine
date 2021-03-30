import axios from '@utils/http/api'
export const checkUserHasXG = data => {
  return axios({
    url: '/Encryption/XG/checkUserHasXG',
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

export const getAdultUserInfo = data => {
  return axios({
    url: '/XG/getAdultUserInfo',
    method: 'get',
    data,
    isOrigin: true
  })
}

export const changeAultVaccineInfo = (data, pm) => {
  return axios({
    url: '/XG/changeAultVaccineInfo' + pm,
    method: 'post',
    data,
    isOrigin: true
  })
}

export const getXGPre = data => {
  return axios({
    url: '/Encryption/XG/GetXGPre',
    method: 'get',
    data
  })
}

export const getXGProductList = data => {
  return axios({
    url: '/Encryption/XG/GetXGProductList',
    method: 'get',
    data
  })
}

export const getXGFactoryList = data => {
  return axios({
    url: '/Encryption/XG/GetXGFactoryList',
    method: 'get',
    data
  })
}

export const vaccineKnowledgeDetailList = data => {
  return axios({
    url: 'vaccineKnowledge/vaccineKnowledgeDetailList',
    method: 'get',
    data,
    isOrigin: true
  })
}

export default {
  checkUserHasXG,
  getBaseCodeInfo,
  getAdultUserInfo,
  changeAultVaccineInfo,
  getXGPre,
  getXGProductList,
  getXGFactoryList,
  vaccineKnowledgeDetailList
}
