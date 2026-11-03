export * from '../service/login/types'
export * from '../service/main/types'

// 麵包屑
export interface IBreacrumbs {
  path: string
  name: string
}

// 表單欄位值
export type PageFormValue = string | number | boolean | string[] | null | undefined

// 表單資料，使用字串作為欄位名稱，欄位值需符合 PageFormValue 定義
export type PageFormData = Record<string, PageFormValue>

// 下拉選單選項
export interface ISelectOption {
  id: number | string
  name: string
}

// 欄位元件類型
export type FormItemType = 'input' | 'password' | 'date-picker' | 'select' | 'custom'

// config 相關設定
export interface IFormItem {
  label: string
  prop: string
  type: FormItemType
  placeholder?: string
  initialValue?: PageFormValue
  options?: ISelectOption[]
  slotName?: string
  isHidden?: boolean
}

// config 相關設定
export interface IPageSearchConfig {
  pageName: string
  formItems: IFormItem[]
}

// 表格欄位類型
export type TableColumnType = 'normal' | 'time' | 'handler' | 'selection' | 'index' | 'custom'

// 表格欄位設定
export interface ITableColumn {
  type?: TableColumnType
  prop?: string
  label: string
  width?: string | number
  [key: string]: unknown
}

// 表格內容設定
export interface IPageContentConfig {
  pageName: string
  header?: {
    title: string
    btnTitle?: string
  }
  propsList: ITableColumn[]
  childrenProps?: Record<string, unknown>
}

// Modal 表單設定
export interface IPageModalConfig {
  pageName: string
  title: string
  formItems: IFormItem[]
}

// 通用的單筆記錄
export type PageRecord = Record<string, unknown>

export interface IDataType {
  name: string
  value: any
}

// 描述資訊
export interface DescriptionProp {
  name: string
  description: string
}
