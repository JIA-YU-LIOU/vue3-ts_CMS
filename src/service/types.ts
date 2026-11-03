import type { AxiosRequestConfig } from 'axios'
/**
 * 統一 API 回應格式
 */
export interface IApiResponse<T> {
  code: number
  message: string
  data: T
  errors?: Record<string, string[]>
}

/**
 * 分頁資料格式
 */
export interface IPaginatedData<T> {
  list: T[]
  totalCount: number
}

/**
 * API 請求選項
 */
export type IRequestOptions = Pick<AxiosRequestConfig, 'signal'>
