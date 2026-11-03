import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapMenus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/Main/Main.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound/NotFound.vue'),
    },
  ],
})

// 路由守衛
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return { name: 'login' }
  }

  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
