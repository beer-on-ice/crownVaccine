import crown from './routes/crown'
export default [
  {
    path: '/index.html', // 首页
    name: 'index',
    component: () => import('@/pages/index/index.vue')
  },
  {
    path: '/newsToday/index', // 今日看点列表
    name: 'newsToday',
    component: () => import('@/pages/newsToday/Index')
  },
  {
    path: '/bind/index', // 绑定受种者
    name: 'bind',
    component: () => import('@/pages/bind/Index')
  },
  {
    path: '/bespeak/index', // 预约首页
    name: 'bespeak',
    component: () => import('@/pages/bespeak/Index')
  },
  {
    path: '/bespeak/mrc', // 预约知情告知书
    name: 'bespeakMrc',
    component: () => import('@/pages/bespeak/Mrc')
  },
  {
    path: '/bespeak/sign', // 预约知情告知书签核
    name: 'bespeakSign',
    component: () => import('@/pages/bespeak/Sign')
  },
  {
    path: '/bespeak/stationTime', // 预约选择接种时间
    name: 'bespeakStationTime',
    component: () => import('@/pages/bespeak/StationTime')
  },
  {
    path: '/bespeak/checkBespeak', // 核对预约信息
    name: 'bespeakCheckBespeak',
    component: () => import('@/pages/bespeak/CheckBespeak')
  },
  // 新冠
  ...crown,
  {
    path: '/errorPage',
    name: 'errorPage',
    component: () => import('@/pages/ErrorPage')
  },
  {
    path: '/building',
    name: 'building',
    component: resolve => import('@/pages/Building')
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component: resolve => import('@/pages/NoPermission')
  },
  {
    path: '*',
    name: '404',
    redirect: '/building'
  }
]
