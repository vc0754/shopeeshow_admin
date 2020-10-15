import Vue from 'vue'
import VueRouter from 'vue-router'
// import ElementUI from 'element-ui';

import store from '@/store'

const Layout = resolve => require(['@/layout/Layout.vue'], resolve)

Vue.use(VueRouter)

const routes = [
  {
    path: '/home-page',
    component: Layout,
    children: [
      {
        path: '/home-page/dashboard-page',
        meta: { title: '控制面板' },
        component: () => import('@/views/MainView.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        meta: { title: '控制面板' },
        component: () => import('@/views/MainView.vue' /* webpackChunkName: 'main' */)
      },
      {
        path: '/setting',
        meta: { title: 'APP 设置' },
        component: () => import('@/views/SettingView.vue' /* webpackChunkName: 'setting' */)
      },
      {
        path: '/statistics',
        meta: { title: '数据统计' },
        component: () => import('@/views/StatisticsView.vue' /* webpackChunkName: 'statistics' */)
      },
      {
        path: '/users',
        meta: { title: '用户管理' },
        component: () => import('@/views/user/ListView.vue' /* webpackChunkName: 'users' */)
      },
      {
        path: '/user/detail',
        meta: { title: '订单明细' },
        component: () => import('@/views/user/DetailView.vue' /* webpackChunkName: 'detail' */)
      },
      {
        path: '/orders',
        meta: { title: '订单管理' },
        component: () => import('@/views/order/ListView.vue' /* webpackChunkName: 'orders' */)
      },
      {
        path: '/account',
        meta: { title: '用户管理' },
        component: () => import('@/views/account/Taobao.vue' /* webpackChunkName: 'users' */)
      },
      {
        path: '/withdrawal',
        meta: { title: '提现设置' },
        component: () => import('@/views/withdrawal/ListView.vue' /* webpackChunkName: 'withdrawal' */)
      },
      {
        path: '/withdrawal/detail',
        meta: { title: '提现记录' },
        component: () => import('@/views/withdrawal/DetailView.vue' /* webpackChunkName: 'wsetting' */)
      },
      {
        path: '/withdrawal/setting',
        meta: { title: '提现设置' },
        component: () => import('@/views/withdrawal/Setting.vue' /* webpackChunkName: 'wsetting' */)
      },
    ]
  },
  {
    path: '/sign',
    meta: { title: '登陆', auth: false },
    component: () => import('@/views/user/SignView.vue' /* webpackChunkName: 'sign' */)
  },
  {
    path: '/lost-password',
    meta: { title: '忘记密码', auth: false },
    component: () => import('@/views/user/LostPasswordView.vue' /* webpackChunkName: 'lost-password' */)
  },
  {
    path: '*',
    meta: { auth: false },
    component: resolve => require(['@/views/NotFound.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || __dirname,
  routes
})

// let loadingInstance

router.beforeEach(({meta, path}, from, next) => {
  // loadingInstance = ElementUI.Loading.service({ fullscreen: true });

  if (meta.title) document.title = meta.title

  let { auth = true } = meta
  let is_signin = store.getters.is_sign
  
  if (is_signin && path === '/sign') return next({ path: '/' })
  // 内页调试用，直接绕过登录
  // if (auth && !is_signin && path !== '/sign') return next()
  if (auth && !is_signin && path !== '/sign') return next({ path: `/sign?redirect=${path}` })

  next()
})

router.afterEach(() => {
  // loadingInstance.close()
})

export default router