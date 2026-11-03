import { RESULT_TYPE } from '@/global/constants'
import type { IApiResponse } from '@/service/types'
import { isAxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import type { MessageOptions } from 'element-plus'

type MessageType = NonNullable<MessageOptions['type']>

/**
 * 統一顯示訊息
 * @param message 訊息內容
 * @param type 訊息類型
 * @param duration 顯示時間（毫秒），0 表示不自動關閉
 */
export const showMessage = (
  message: string,
  type: MessageType = RESULT_TYPE.success,
  duration = 1500,
) => {
  ElMessage({
    message,
    type,
    duration,
    showClose: duration <= 0,
  })
}

/**
 * 統一取得錯誤訊息
 * @param error 捕捉到的錯誤
 * @param fallback 預設錯誤訊息
 */
export const getErrorMessage = (error: unknown, fallback = '操作失敗，請稍後再試'): string => {
  if (isAxiosError<IApiResponse<unknown>>(error)) {
    const responseData = error.response?.data

    // 優先顯示後端回傳的業務錯誤訊息
    if (responseData?.message) {
      return responseData.message
    }

    // 沒有後端訊息時，才使用 Axios 的錯誤訊息
    return error.message || fallback
  }

  if (error instanceof Error) {
    return error.message || fallback
  }

  return fallback
}
