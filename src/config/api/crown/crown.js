import axios from '@utils/http/api'

export const checkCidHasXG = data => {
  return axios({
    url: '/Encryption/XG/checkCidHasXG',
    method: 'get',
    data
  })
}

// 获取用户新冠受种者信息
export const getUserXG = data => {
  return axios({
    url: '/Encryption/XG/getUserXG',
    method: 'get',
    data
  })
}

export const delAdultUserInfo = data => {
  return axios({
    url: '/Encryption/XG/delAdultUserInfo',
    method: 'get',
    data
  })
}
export const getAdultDirect = data => {
  return axios({
    url: '/Encryption/XG/getAdultDirect',
    method: 'get',
    data
  })
}

export const getAdultJzjlList = data => {
  return axios({
    url: '/Encryption/Adult/GetAdultJzjlList',
    method: 'get',
    data
  })
}

// 默认全部倒出
export default {
  checkCidHasXG,
  getUserXG,
  getAdultDirect,
  getAdultJzjlList,
  delAdultUserInfo
}
