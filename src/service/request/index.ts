import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { HYInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LOADING_SVG } from '@/global/constants'

class HYRequest {
  // Axios 請求實例
  instance: AxiosInstance

  // 儲存建立實例時設定的全域自訂攔截器
  private interceptors?: HYInterceptors<any, any>

  constructor(config: HYRequestConfig<any, any>) {
    const { interceptors, showLoading: _showLoading, ...axiosConfig } = config

    this.interceptors = interceptors
    this.instance = axios.create(axiosConfig)

    // 全域 Request 攔截器
    this.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    )

    // 全域 Response 攔截器
    // 保留 AxiosResponse，統一在 request() 中取得 res.data
    this.instance.interceptors.response.use(
      (res) => res,
      (error) => Promise.reject(error),
    )

    // 註冊實例專屬的 Request 攔截器
    this.instance.interceptors.request.use(
      interceptors?.requestSuccessFn,
      interceptors?.requestFailureFn,
    )
  }

  /**
   * 發送 HTTP 請求
   */
  async request<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    const { showLoading = true, interceptors, ...axiosConfig } = config

    let loadingInstance: { close: () => void } | undefined

    // 顯示 Loading
    if (showLoading) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '載入中',
        spinner: LOADING_SVG,
        svgViewBox: '0 0 55 80',
        background: 'rgb(193 193 193 / 80%)',
        customClass: 'axios-loading',
      })
    }

    try {
      // 執行單次請求的 Request 攔截器
      if (interceptors?.requestSuccessFn) {
        try {
          const internalConfig = axiosConfig as InternalAxiosRequestConfig<D>

          Object.assign(axiosConfig, interceptors.requestSuccessFn(internalConfig))
        } catch (error) {
          if (interceptors.requestFailureFn) {
            throw interceptors.requestFailureFn(error)
          }

          throw error
        }
      }

      // 發送請求，取得完整 AxiosResponse
      const response = await this.instance.request<unknown, AxiosResponse<unknown>, D>(axiosConfig)

      // 取出後端真正回傳的 JSON 資料
      let result = response.data as T

      // 執行實例層級的 Response 成功攔截器
      if (this.interceptors?.responseSuccessFn) {
        result = this.interceptors.responseSuccessFn(result)
      }

      // 執行單次請求的 Response 成功攔截器
      if (interceptors?.responseSuccessFn) {
        result = interceptors.responseSuccessFn(result)
      }

      return result
    } catch (error) {
      let handledError = error

      // 先執行實例層級的 Response 失敗攔截器
      if (this.interceptors?.responseFailureFn) {
        handledError = this.interceptors.responseFailureFn(handledError)
      }

      // 再執行單次請求的 Response 失敗攔截器
      if (interceptors?.responseFailureFn) {
        handledError = interceptors.responseFailureFn(handledError)
      }

      throw handledError
    } finally {
      // 不論成功或失敗，都關閉 Loading
      loadingInstance?.close()
    }
  }

  // GET 請求
  get<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    return this.request<T, D>({
      ...config,
      method: 'GET',
    })
  }

  // POST 請求
  post<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    return this.request<T, D>({
      ...config,
      method: 'POST',
    })
  }

  // DELETE 請求
  delete<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    return this.request<T, D>({
      ...config,
      method: 'DELETE',
    })
  }

  // PATCH 請求
  patch<T = unknown, D = unknown>(config: HYRequestConfig<T, D>): Promise<T> {
    return this.request<T, D>({
      ...config,
      method: 'PATCH',
    })
  }
}

export default HYRequest
