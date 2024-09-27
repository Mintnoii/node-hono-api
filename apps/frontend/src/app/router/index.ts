import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
// import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { dayjs, isEmpty } from '@/shared/libs'

const routes = setupLayouts(generatedRoutes)

// const routes = generatedRoutes

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.onError((error) => {
  console.log(error.toString())
  const pattern = /Loading chunk.+failed/g
  const isChunkLoadFailed = error.toString().match(pattern)
  if (isChunkLoadFailed) {
    console.error('资源加载失败')
    // 网络断开 系统升级等情况可以提示用户需要刷新页面 location.reload()
  }
})

router.afterEach((to) => {
  NProgress.done()
})
router.beforeResolve(async (to, from, next) => {
  const useInfoStr = localStorage.getItem('MINT_ADMIN_USERINFO')
  const userInfo = useInfoStr ? JSON.parse(useInfoStr)?.userInfo : {}
  const isExpired = isEmpty(userInfo.expire_time) || dayjs().isAfter(dayjs(userInfo.expire_time))
  console.log('用户信息', userInfo, isExpired)
  if (to.path === '/login' || to.path === '/404') {
    next()
  } else {
    if (isExpired) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
