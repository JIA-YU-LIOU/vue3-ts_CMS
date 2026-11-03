import type { IPageSearchConfig } from '@/types'

export const searchConfig: IPageSearchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '使用者名稱',
      placeholder: '請輸入使用者名稱',
    },
    {
      type: 'input',
      prop: 'realname',
      label: '姓名',
      placeholder: '請輸入使用者姓名',
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手機號碼',
      placeholder: '請輸入手機號碼',
    },
    {
      type: 'select',
      prop: 'enable',
      label: '狀態',
      placeholder: '請選擇狀態',
      initialValue: null,
      options: [
        { name: '啟用', id: 1 },
        { name: '停用', id: 0 },
      ],
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
