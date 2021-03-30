export default [
  {
    path: '/crown/crownAppointList', // 受种者详情
    name: 'crownAppointList',
    component: () => import('@/pages/crown/crownAppointList')
  },
  {
    path: '/crown/crownAppointList/station', // 选择门诊
    name: 'crownAppointStation',
    component: () => import('@/pages/crown/crownAppointList/station')
  },
  {
    path: '/crown/crownAppointList/stationDetail', // 选择门诊
    name: 'crownAppointStationDetail',
    component: () => import('@/pages/crown/crownAppointList/stationDetail')
  },
  {
    path: '/crown/crownAppointList/stationDesc', // 选择门诊
    name: 'stationDesc',
    component: () => import('@/pages/crown/crownAppointList/stationDesc')
  },
  {
    path: '/crown/crownAppointList/stationTime', // 选择门诊时间
    name: 'crownAppointStationTime',
    component: () => import('@/pages/crown/crownAppointList/stationTime')
  },
  {
    path: '/crown/crownAppointList/mrc', // 知情同意书
    name: 'crownAppointStationMrc',
    component: () => import('@/pages/crown/crownAppointList/mrc')
  },
  {
    path: '/crown/crownAppointList/sign', // 签核知情同意书
    name: 'crownAppointStationSign',
    component: () => import('@/pages/crown/crownAppointList/sign')
  },
  {
    path: '/crown/crownAppointList/checkBespeak', // 核对预订信息
    name: 'crownAppointStationCheckBespeak',
    component: () => import('@/pages/crown/crownAppointList/checkBespeak')
  },
  {
    path: '/crown/crownAppointList/result', // 预订结果
    name: 'crownAppointStationResult',
    component: () => import('@/pages/crown/crownAppointList/result')
  }
]
