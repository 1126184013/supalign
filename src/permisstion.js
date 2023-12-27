import router from '@/router'
import DevicePixelRatio from '@/utils/DevicePixelRatio.js';
// import getPageTitle from './utils/get-page-title'

// 不用进行token检查的白名单路径数组
const whiteList = ['/login']

// 路由加载前
router.beforeEach(async (to, from, next) => {
  // 设置整个页面的标题
  //  document.title = getPageTitle(to.meta.title)

  // 如果请求的是登陆路由
  if (to.path === '/login') {
    document.getElementsByTagName('body')[0].style.zoom = 'normal';
    // next({ path: '/' })
    next()
  } else { // 请求的不是登陆路由
    new DevicePixelRatio().init();
    next()
  }
})

// 路由加载后
router.afterEach(() => {
  // NProgress.done();
})
