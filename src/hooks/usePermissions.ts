import { useLoginStore } from '@/stores/login/login'

/**
 * 檢查目前登入使用者是否具有指定的操作權限
 * @param permissionId 權限識別字串
 * @returns 是否具有指定權限，true 表示有權限，false 表示沒有權限
 */
export const usePermissions = (permissionId: string) => {
  const loginStore = useLoginStore()
  const { userPermission } = loginStore
  return !!userPermission.find((item) => item.includes(permissionId))
}
