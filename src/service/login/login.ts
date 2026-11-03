import hyRequest from '..'
import type { IAccountLoginParams, ILoginData, IMenu, IUserInfo } from '@/types'
import type { IApiResponse } from '../types'

/**
 * 帳號登入
 * @param account 登入時需要傳送的帳號與密碼
 * @returns 回傳使用者id, name, token
 */
export const accountLoginRequest = (account: IAccountLoginParams) => {
  return hyRequest.post<IApiResponse<ILoginData>>({
    url: '/login',
    data: account,
  })
}

/**
 * 根據使用者 ID 取得使用者資訊
 * @param id 使用者的唯一識別編號
 * @returns 回傳使用者資料
 */
export const getUserInfoById = (id: number) => {
  return hyRequest.get<IApiResponse<IUserInfo>>({
    url: `/users/${id}`,
  })
}

/**
 * 根據角色 ID 取得該角色可使用的選單
 * @param id 角色的唯一識別編號
 * @returns 回傳多筆選單物件組成的陣列
 */
export const getUserMenusByRoleId = (id: number) => {
  return hyRequest.get<IApiResponse<IMenu[]>>({
    url: `/role/${id}/menu`,
  })
}
