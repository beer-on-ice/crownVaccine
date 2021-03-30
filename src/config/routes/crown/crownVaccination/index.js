export default [
  {
    path: '/crown/crownVaccination', // 受种者详情
    name: 'crownVaccination',
    component: () => import('@/pages/crown/crownVaccination')
  },
  {
    path: '/crown/crownVaccination/code', // 受种者详情
    name: 'crownVaccinationCode',
    component: () => import('@/pages/crown/crownVaccination/code')
  }
]
