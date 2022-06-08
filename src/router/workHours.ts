export default [
  {
    path: '/workHours',
    name: 'WorkHours',
    meta: {
      title: '工时填写'
    },
    component: () => import(/* webpackChunkName: "workHours" */ '@/views/workHours/WorkHours.vue')
  }
]
