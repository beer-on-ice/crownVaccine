export default [
  {
    path: '/crown/crownList', // 受种者列表
    name: 'crownList',
    component: () => import('@/pages/crown/crownList')
  },
  {
    path: '/crown/crownList/check', // 受种者列表
    name: 'crownListCheck',
    component: () => import('@/pages/crown/crownList/check')
  },
  {
    path: '/crown/crownList/addFile', // 受种者列表
    name: 'crownListAddFile',
    component: () => import('@/pages/crown/crownList/add/addFile')
  },
  {
    path: '/crown/crownList/addInfo', // 受种者列表
    name: 'crownListAddInfo',
    component: () => import('@/pages/crown/crownList/add/addInfo')
  },
  {
    path: '/crown/crownList/addNext', // 受种者列表
    name: 'crownListAddNext',
    component: () => import('@/pages/crown/crownList/add/addNext')
  }
]
