export default {
  method: 'get',
  // 基础url前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // 请求头信息
  headers: {
    'content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
}
