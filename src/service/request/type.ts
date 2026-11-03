import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

// 自訂 Axios 攔截器的型別
export interface HYInterceptors<T = unknown, D = unknown> {
  // Request 成功攔截器：請求發送前執行，可修改請求設定
  requestSuccessFn?: (config: InternalAxiosRequestConfig<D>) => InternalAxiosRequestConfig<D>

  // Request 失敗攔截器：處理請求攔截器執行時發生的錯誤
  requestFailureFn?: (error: unknown) => unknown

  // Response 成功攔截器：接收回應資料，可進行資料處理或轉換
  responseSuccessFn?: (res: T) => T

  // Response 失敗攔截器：處理回應過程中發生的錯誤
  responseFailureFn?: (error: unknown) => unknown
}

// 自訂 Axios 請求設定型別，擴充原本的 AxiosRequestConfig
export interface HYRequestConfig<T = unknown, D = unknown> extends AxiosRequestConfig<D> {
  showLoading?: boolean
  interceptors?: HYInterceptors<T, D>
}
