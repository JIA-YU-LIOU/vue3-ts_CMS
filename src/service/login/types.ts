import type { IRole, IDepartment } from '../main/types'

// 帳號登入所需的參數
export interface IAccountLoginParams {
  name: string
  password: string
}

// 登入成功後回傳的資料
export interface ILoginData {
  id: number
  name: string
  token: string
}

// 使用者資訊
export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string
  updateAt: string
  role: IRole
  department: IDepartment | null
}
