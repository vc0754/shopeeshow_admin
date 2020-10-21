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
        meta: { title: '首页' },
        component: () => import('@/views/MainView.vue' /* webpackChunkName: 'main' */)
      },
      {
        path: '/news/detail/:id',
        meta: { title: '公告详情' },
        component: () => import('@/views/news/DetailView.vue' /* webpackChunkName: 'news' */)
      },
      {
        path: '/store/list',
        meta: { title: '店铺管理' },
        component: () => import('@/views/store/ListView.vue' /* webpackChunkName: 'store' */)
      },
      {
        path: '/task/add',
        meta: { title: '发布任务' },
        component: () => import('@/views/task/AddView.vue' /* webpackChunkName: 'task_add' */)
      },
      {
        path: '/task/list',
        meta: { title: '任务管理' },
        component: () => import('@/views/task/ListView.vue' /* webpackChunkName: 'task' */)
      },
      {
        path: '/task/detail',
        meta: { title: '任务详情' },
        component: () => import('@/views/task/DetailView.vue' /* webpackChunkName: 'taskdetail' */)
      },
      {
        path: '/settlement',
        meta: { title: '结算中心' },
        component: () => import('@/views/SettlementView.vue' /* webpackChunkName: 'settlement' */)
      },
      {
        path: '/transition',
        meta: { title: '支付流水' },
        component: () => import('@/views/transition/ListView.vue' /* webpackChunkName: 'transition' */)
      },
    ]
  },
  {
    path: '/sign',
    meta: { title: '登陆', auth: false },
    component: () => import('@/views/user/SignView.vue' /* webpackChunkName: 'sign' */)
  },
  {
    path: '/register',
    meta: { title: '注册', auth: false },
    component: () => import('@/views/user/RegisterView.vue' /* webpackChunkName: 'register' */)
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