import { defineStore } from 'pinia'
import { ref } from 'vue'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccountLoginParams, IUserInfo } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import router from '@/router'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/mapMenus'
import { useMainStore } from '../main/main'

export const useLoginStore = defineStore('LoginStore', () => {
  // 使用者 token， 預設為空字串
  const token = ref<string>(localCache.getCache(LOGIN_TOKEN) ?? '')
  // 使用者資料
  const userInfo = ref<IUserInfo | null>(localCache.getCache(USER_INFO) ?? null)
  // 使用者菜單
  const userMenus = ref(localCache.getCache(USER_MENUS) ?? [])
  // 使用者的操作權限清單，可供按鈕權限或其他權限控制邏輯使用
  const userPermission = ref<string[]>([])

  /**
   * 執行帳號登入流程
   * 登入成功後依序取得 Token、使用者資料及角色選單，
   * 將相關資料儲存至本地快取，並初始化權限、動態路由及部門資料。
   * @param account 使用者輸入的帳號登入資料
   */
  const loginAccountAction = async (account: IAccountLoginParams) => {
    // 登入取得 token
    const loginResult = await accountLoginRequest(account)
    token.value = loginResult.data.token
    localCache.setCache(LOGIN_TOKEN, token.value)

    // 取得使用者資料
    const userInfoResult = await getUserInfoById(loginResult.data.id)
    userInfo.value = userInfoResult.data
    localCache.setCache(USER_INFO, userInfo.value)

    // 取得使用者權限選單
    const userMenusResult = await getUserMenusByRoleId(userInfoResult.data.role.id)
    userMenus.value = userMenusResult.data
    localCache.setCache(USER_MENUS, userMenus.value)

    // 加載權限、部門、選單資料
    const mainStore = useMainStore()
    mainStore.fetchEntireDataAction()

    // 將選單資料轉換為使用者的操作權限清單
    userPermission.value = mapMenusToPermissions(userMenus.value)

    // 依權限動態加載路由
    const routes = mapMenusToRoutes(userMenus.value)
    routes.forEach((route) => router.addRoute('main', route))

    // 返回首頁
    router.push('/')
  }

  /**
   * 根據本地快取還原動態路由與使用者權限
   */
  const loadLocalRoutes = () => {
    // 確認存在選單資料及有效的 Token 字串
    if (userMenus.value.length > 0 && token.value !== '') {
      const routes = mapMenusToRoutes(userMenus.value)
      routes.forEach((route) => router.addRoute('main', route))

      // 重新載入權限、部門、選單資料
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 根據選單資料重新建立使用者權限清單
      userPermission.value = mapMenusToPermissions(userMenus.value)
    }
  }

  return {
    userPermission,
    userInfo,
    userMenus,
    token,
    loginAccountAction,
    loadLocalRoutes,
  }
})
