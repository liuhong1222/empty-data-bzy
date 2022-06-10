import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: 'emptynumber',
    children: [
      // { path: 'index', name: 'Index', component: () => import('../components/Index.vue') }, // 首页
      {
        path: 'product',
        name: 'Product',
        component: () => import('../components/Product.vue')
      }, // 产品管理
      {
        path: 'emptynumber',
        name: 'Emptynumber',
        component: () => import('../components/Emptynumber.vue')
      }, // 空号在线检测
      {
        path: 'realtime',
        name: 'Realtime',
        component: () => import('../components/Realtime.vue')
      }, // 号码实时查询
      {
        path: 'emptyrealapi',
        name: 'Emptyrealapi',
        component: () => import('../components/empty_real_api.vue')
      }, // 空号/实时查询api
      {
        path: 'international',
        name: 'international',
        component: () => import('../components/International.vue')
      }, // 国际号码检测
      {
        path: 'matching',
        name: 'Matching',
        component: () => import('../components/Matching.vue')
      }, // 号码匹配
      {
        path: 'safety',
        name: 'Safety',
        component: () => import('../components/Safety.vue')
      }, // 账户安全
      {
        path: 'data',
        name: 'Data',
        component: () => import('../components/Data.vue')
      }, // 账户资料
      {
        path: 'khrecord',
        name: 'Khrecord',
        component: () => import('../components/Khrecord.vue')
      }, // 空号检测记录
      {
        path: 'sskecord',
        name: 'Sskecord',
        component: () => import('../components/Sskecord.vue')
      }, // 实时查询记录
      {
        path: 'international_record',
        name: 'InternationalRecord',
        component: () => import('../components/international_record.vue')
      }, // 国际号码检测记录
      {
        path: 'recharge',
        name: 'Recharge',
        component: () => import('../components/Recharge.vue'),
        props: true
      }, // 充值页面
      {
        path: 'attestation',
        name: 'Attestation',
        component: () => import('../components/Attestation.vue')
      } // 认证页面
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由前置守卫（后端利用token验证可以阻止查看列表那一半页面，编辑页需要在前端进行路由守卫）
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
