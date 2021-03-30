import axios from '@utils/http/api'

export const wxcam = data => {
  return axios({
    url: '/wechat',
    method: 'post',
    data
  })
}

// 默认全部倒出
export default {
  wxcam
}
