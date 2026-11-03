import type { IPageSearchConfig } from '@/types'

export const searchConfig: IPageSearchConfig = {
  pageName: 'role',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名稱',
      placeholder: '請輸入角色名稱',
    },
    {
      type: 'input',
      prop: 'intro',
      label: '權限介紹',
      placeholder: '請輸入權限介紹',
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
