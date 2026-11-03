import { createPinia } from 'pinia'
import type { App } from 'vue'
import { useLoginStore } from '@/stores/login/login.ts'

/**
 * 註冊 Pinia 狀態管理並初始化登入相關資料
 * @param app Vue 應用程式實例
 */
function registerStore(app: App<Element>) {
  // 建立 Pinia 狀態管理實例，並註冊至 Vue 應用程式
  app.use(createPinia())

  // 載入本機儲存的路由設定，初始化動態路由
  const LoginStore = useLoginStore()
  LoginStore.loadLocalRoutes()
}

export default registerStore
