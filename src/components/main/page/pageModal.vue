<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" center>
      <template #header>{{
        isNewRef ? `新增${modalConfig.title}` : `編輯${modalConfig.title}`
      }}</template>
      <el-form label-width="120px" size="large" :model="formData" ref="formRef">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item v-if="!item.isHidden" v-bind="item" :error="fieldErrors[item.prop]">
            <el-input
              v-if="item.type === 'input'"
              :placeholder="item.placeholder"
              v-model="formData[item.prop] as string"
              @input="clearFieldError(item.prop)"
            />
            <el-input
              v-if="item.type === 'password'"
              show-password
              placeholder="請輸入密碼"
              v-model="formData.password as string"
              @input="clearFieldError(item.prop)"
            />
            <el-date-picker
              v-if="item.type === 'date-picker'"
              v-model="formData[item.prop] as string[]"
              type="daterange"
              range-separator="-"
              value-format="YYYY-MM-DD"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
              @change="clearFieldError(item.prop)"
            />
            <el-select
              v-if="item.type === 'select'"
              placeholder="請選擇狀態"
              style="width: 100%"
              v-model="formData[item.prop]"
              @change="clearFieldError(item.prop)"
            >
              <el-option
                v-for="option in item.options"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              />
            </el-select>
            <template v-if="item.type === 'custom'">
              <slot
                :name="item.slotName"
                :prop="item.prop"
                :item="item"
                :formData="formData"
              ></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="handleConfirmClick"> 確定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="modal">
import { RESULT_TYPE } from '@/global/constants'
import type { IApiResponse } from '@/service/types'
import { useSystemStore } from '@/stores/main/system/system'
import type { IPageModalConfig, PageFormData, PageFormValue, PageRecord } from '@/types'
import { getErrorMessage, showMessage } from '@/utils/message'
import { isAxiosError } from 'axios'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

// 定義接收資料
interface IProps {
  modalConfig: IPageModalConfig
  otherInfo?: PageRecord
}
const props = defineProps<IProps>()

// 定義事件
const emit = defineEmits<{
  (e: 'submitSuccess', mode: 'create' | 'update'): void
}>()
// Modal 顯示狀態
const dialogVisible = ref(false)

// 使用者資料
const createInitialForm = (): PageFormData => {
  const initialForm: PageFormData = {}

  for (const item of props.modalConfig.formItems) {
    initialForm[item.prop] = item.initialValue !== undefined ? item.initialValue : ''
  }

  return initialForm
}
const formData = ref<PageFormData>(createInitialForm())
// 目前正在編輯的使用者 ID
const editData = ref()
// 是否為新增模式
const isNewRef = ref(true)
// 表單欄位錯誤
const fieldErrors = ref<Record<string, string>>({})
// 表單實例
const formRef = ref<FormInstance>()

const systemStore = useSystemStore()

/**
 * 開啟新增/編輯 Modal
 *
 * @param isNew 是否為新增模式，預設為 true
 * @param itemData 要編輯的使用者資料
 */
const setModalVisible = (isNew: boolean = true, itemData: PageRecord = {}) => {
  clearFieldErrors()
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    editData.value = itemData.id
    for (const key in formData.value) {
      formData.value[key] = toFormValue(itemData[key])
    }
  } else {
    resetFormData()
  }
}

// 清除指定欄位的錯誤訊息
const clearFieldError = (prop: string) => {
  delete fieldErrors.value[prop]
}

/** 清除全部欄位錯誤 */
const clearFieldErrors = () => {
  fieldErrors.value = {}
}

/**
 * 將後端回傳的欄位錯誤轉換成表單可以使用的格式
 *
 * 依據 modalConfig.formItems 對應欄位名稱。
 * 例如後端回傳 Name，前端欄位為 name，也能對應。
 *
 * @returns 是否成功取得至少一個可對應的欄位錯誤
 */
const setFieldErrors = (error: unknown): boolean => {
  if (!isAxiosError<IApiResponse<unknown>>(error)) {
    return false
  }

  const errors = error.response?.data?.errors

  if (!errors) {
    return false
  }

  // 建立不區分大小寫的欄位名稱對照表
  const propMap = new Map<string, string>(
    props.modalConfig.formItems.map((item) => [item.prop.toLowerCase(), item.prop]),
  )

  const nextErrors: Record<string, string> = {}

  // 將後端的錯誤逐一對應至前端表單欄位
  for (const [key, messages] of Object.entries(errors)) {
    const prop = propMap.get(key.toLowerCase())

    if (prop && messages.length > 0) {
      nextErrors[prop] = messages.join('、')
    }
  }

  // 更新欄位錯誤
  fieldErrors.value = nextErrors

  // 回傳是否有成功對應的欄位錯誤
  return Object.keys(nextErrors).length > 0
}

/**
 * 確認新增或編輯使用者
 * 成功後重設表單、關閉 Modal，
 * 並通知父元件重新查詢使用者列表
 */
const handleConfirmClick = async () => {
  // 合併表單資料與額外傳入的資料
  let infoData: PageRecord = formData.value
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  // 每次送出前清除上次的欄位錯誤
  clearFieldErrors()
  try {
    // 記錄本次操作模式
    const mode = isNewRef.value ? 'create' : 'update'

    if (mode === 'update' && editData.value) {
      // 執行編輯
      await systemStore.editPageDataAction(props.modalConfig.pageName, editData.value, infoData)
      showMessage('更新成功', RESULT_TYPE.success)
    } else {
      // 執行新增
      await systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
      showMessage('新增成功', RESULT_TYPE.success)
    }

    resetFormData()
    dialogVisible.value = false

    // 通知父元件重新查詢列表
    emit('submitSuccess', mode)
  } catch (error) {
    const hasFieldErrors = setFieldErrors(error)
    if (!hasFieldErrors) {
      // 操作失敗時保留 Modal 與表單內容
      showMessage(
        getErrorMessage(error, isNewRef.value ? '新增失敗，請稍後再試' : '更新失敗，請稍後再試'),
        RESULT_TYPE.error,
      )
    }
  }
}

// 重置 formData
const resetFormData = () => {
  formData.value = createInitialForm()
  fieldErrors.value = {}
  editData.value = null
}

function toFormValue(value: unknown): PageFormValue {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    Array.isArray(value) ||
    value === null
  ) {
    return value
  }
  return ''
}

defineExpose({ setModalVisible })
</script>

<style scoped lang="scss">
.modal {
  .form {
    padding: 10px 30px;
  }

  :deep(.el-dialog) {
    max-width: 500px;
    width: 80%;
  }
}
</style>
