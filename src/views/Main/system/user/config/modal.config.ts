import type { IPageModalConfig } from '@/types'

export const modalConfig: IPageModalConfig = {
  pageName: 'users',
  title: '使用者',
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
      label: '使用者姓名',
      placeholder: '請輸入使用者姓名',
    },
    {
      type: 'password',
      prop: 'password',
      label: '密碼',
      placeholder: '請輸入密碼',
      isHidden: false,
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手機',
      placeholder: '請輸入手機',
    },
    {
      type: 'select',
      prop: 'roleId',
      label: '使用者權限',
      placeholder: '請選擇使用者權限',
      initialValue: null,
      options: [],
    },
    {
      type: 'select',
      prop: 'departmentId',
      label: '部門',
      placeholder: '請選擇部門',
      initialValue: null,
      options: [],
    },
  ],
}
