import { getEntireRoles, getEntireDepartments, getEntireMenus } from '@/service/main/main'
import type { IDepartment, IMenu, IRole } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  // 所有角色資料
  const entireRoles = ref<IRole[]>([])
  // 所有部門資料
  const entireDepartments = ref<IDepartment[]>([])
  // 所有選單資料
  const entireMenus = ref<IMenu[]>([])
  /**
   * 取得所有角色、部門、選單資料
   */
  const fetchEntireDataAction = async () => {
    // 取得所有角色資料
    const rolesResult = await getEntireRoles()
    entireRoles.value = rolesResult.data.list

    // 取得所有部門資料
    const departmentsResult = await getEntireDepartments()
    entireDepartments.value = departmentsResult.data.list

    // 取得所有選單資料
    const menuResult = await getEntireMenus()
    entireMenus.value = menuResult.data.list
  }
  return {
    entireMenus,
    entireRoles,
    entireDepartments,
    fetchEntireDataAction,
  }
})
