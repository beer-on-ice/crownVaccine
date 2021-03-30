export default [
  {
    path: '/crown/crownDetail', // 受种者详情
    name: 'crownDetail',
    component: () => import('@/pages/crown/crownDetail')
  },
  {
    path: '/crown/crownDetail/cert', // 受种者详情
    name: 'crownDetailCert',
    component: () => import('@/pages/crown/crownDetail/cert')
  },

  {
    path: '/crown/crownDetail/editFile',
    name: 'crownDetailEditFile',
    component: () => import('@/pages/crown/crownDetail/edit/editFile')
  },
  {
    path: '/crown/crownDetail/editInfo',
    name: 'crownDetailEditInfo',
    component: () => import('@/pages/crown/crownDetail/edit/editInfo')
  },
  {
    path: '/crown/crownDetail/editNext',
    name: 'crownDetailEditNext',
    component: () => import('@/pages/crown/crownDetail/edit/editNext')
  }
]
