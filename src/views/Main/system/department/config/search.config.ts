import type { IPageSearchConfig } from '@/types'

export const searchConfig: IPageSearchConfig = {
  pageName: 'department',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部門名稱',
      placeholder: '請輸入部門名稱',
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部門主管',
      placeholder: '請輸入部門主管',
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '創建時間',
      placeholder: '請輸入部門名稱',
      initialValue: [],
    },
  ],
}
