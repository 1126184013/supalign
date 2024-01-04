import router from '@/router'
import DevicePixelRatio from '@/utils/DevicePixelRatio.js';
// import getPageTitle from './utils/get-page-title'

// 不用进行token检查的白名单路径数组
const whiteList = ['/login']

function resizeFun () {
  const devicePixelRatio = window.devicePixelRatio // 获取下载的缩放 125% -> 1.25    150% -> 1.5
  if (devicePixelRatio !== 1) {
    // 如果在笔记本中用IE浏览器打开 则弹出提示
    if (!! window.ActiveXObject || 'ActiveXObject' in window) {
      alert('balabala。。。')
    } else {
      const c = document.querySelector('body')
      c.style.zoom = 1 / devicePixelRatio// 修改页面的缩放比例
    }
  }
}

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
    // resizeFun()
    // new DevicePixelRatio().init();
    next()
  }
})

// 路由加载后
router.afterEach(() => {
  // NProgress.done();
})
