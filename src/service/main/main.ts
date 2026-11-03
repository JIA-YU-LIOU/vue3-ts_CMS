import type { IDepartment, IMenu, IPageQuery, IRole } from '@/types'
import type { IApiResponse } from '../types'
import hyRequest from '..'
import type { IPaginatedData } from '../types'

/**
 * 取得所有角色權限資料
 */
export const getEntireRoles = (queryInfo?: IPageQuery) => {
  return hyRequest.post<IApiResponse<IPaginatedData<IRole>>>({
    url: '/role/list',
    data: queryInfo,
  })
}
/**
 * 取得所有部門資料
 */
export const getEntireDepartments = (queryInfo?: IPageQuery) => {
  return hyRequest.post<IApiResponse<IPaginatedData<IDepartment>>>({
    url: '/department/list',
    data: queryInfo,
  })
}
/**
 * 取得所有選單資料
 */
export const getEntireMenus = () => {
  return hyRequest.post<IApiResponse<IPaginatedData<IMenu>>>({
    url: '/menu/list',
  })
}
