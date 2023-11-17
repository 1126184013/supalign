import { createRouter, createWebHashHistory  } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        hidden: true
      }
    },
    // 404
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        hidden: true
      }
    },
    // 重定向
    {
      path: '/',
      redirect: '/login',
    },
    // 首页
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'ele-HomeFilled',
      }
    },
    //面像评测
    {
      path: '/face',
      name: 'face',
      component: () => import('@/views/face/index.vue'),
      meta: {
        title: '面像评测',
      }
    },
    { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

// 导出路由
export default router;