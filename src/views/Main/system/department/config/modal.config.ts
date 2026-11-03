import type { IPageModalConfig } from '@/types'

export const modalConfig: IPageModalConfig = {
  pageName: 'department',
  title: '部門',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部門名稱',
      placeholder: '請輸入部門名稱',
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '上級部門',
      placeholder: '請選擇部門',
      initialValue: null,
      options: [],
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部門主管',
      placeholder: '請輸入部門主管',
    },
  ],
}
