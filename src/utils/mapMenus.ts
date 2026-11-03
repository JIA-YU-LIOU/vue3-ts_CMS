import type { IBreacrumbs } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 載入所有動態路由
 * @returns 回傳路由設定陣列
 */
const loadLocalRoutes = () => {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true,
  })
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 使用者第一個可存取的子選單
export let firstMenu: any = null

/**
 * 依據使用者擁有的選單權限，從本地端路由設定中找出符合子選單 URL 的路由，並組成動態路由陣列
 * 同時為父層選單設定 redirect，讓使用者進入父層路徑時，自動導向該選單底下對應的子路由
 *
 * @param userMenu 使用者可存取的選單資料
 * @returns 符合使用者權限的路由陣列
 */
export const mapMenusToRoutes = (userMenu: any[]) => {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submemu of menu.children) {
      const route = localRoutes.find((x) => x.path === submemu.url)
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
        if (!firstMenu) {
          firstMenu = submemu
        }
      }
    }
  }
  return routes
}

/**
 * 根據目前路由路徑，尋找對應的子選單資料
 *
 * @param path 目前頁面的路由路徑
 * @param userMenus 使用者可存取的選單資料
 * @returns 找到的子選單物件；若找不到則回傳 undefined
 */
export const mapPathToMenu = (path: string, userMenus: any[]) => {
  for (const menu of userMenus) {
    const submenu = menu.children.find((item) => item.url === path)
    if (submenu) {
      return submenu
    }
  }
  return undefined
}

/**
 * 根據目前路由路徑，產生麵包屑導覽資料
 *
 * @param path 目前頁面的路由路徑
 * @param userMenu 使用者可存取的選單資料
 * @returns 麵包屑導覽資料陣列
 */
export const mapPathToBreadcrumbs = (path: string, userMenu: any[]) => {
  const breadcrumbs: IBreacrumbs[] = []
  for (const menu of userMenu) {
    for (const submemu of menu.children) {
      if (submemu.url === path) {
        breadcrumbs.push({ path: menu.url, name: menu.name })
        breadcrumbs.push({ path: submemu.url, name: submemu.name })
      }
    }
  }
  return breadcrumbs
}

/**
 * 將選單樹狀結構轉換為選單 ID 陣列
 *
 * @param menuList 選單樹狀結構資料
 * @returns 最末層選單的 ID 陣列
 */
export const mapMenuListToIds = (menuList: any[]) => {
  const ids: number[] = []
  function recurseGetId(menuList) {
    for (const menu of menuList) {
      if (menu.children) {
        recurseGetId(menu.children)
      } else {
        ids.push(menu.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 * 遍歷選單資料：
 * type === 3：視為操作權限，將 permission 加入陣列。
 * 其他類型：繼續檢查其子選單。
 *
 * @param menuList 選單樹狀結構資料
 * @returns 使用者可取得的操作權限代碼陣列
 */
export const mapMenusToPermissions = (menuList: any[]) => {
  const permissions: string[] = []
  function recurseGetPermission(menus) {
    for (const menu of menus) {
      if (menu.type === 3) {
        permissions.push(menu.permission)
      } else {
        recurseGetPermission(menu.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
