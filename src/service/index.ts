import { localCache } from '@/utils/cache'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

// 建立 Axios 請求實例，統一設定 API 基本配置與攔截器
const hyRequest = new HYRequest({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIME_OUT),

  // Request 成功攔截器：在發送請求前自動加入 JWT Token
  interceptors: {
    requestSuccessFn: (config) => {
      // 從本地快取取得登入時儲存的 Token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.set('Authorization', `Bearer ${token}`)
      }
      return config
    },
  },
})

export default hyRequest
