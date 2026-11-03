import type { IPageModalConfig } from '@/types'

export const modalConfig: IPageModalConfig = {
  pageName: 'role',
  title: '角色',
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
      type: 'custom',
      prop: 'menuList',
      label: '選單權限',
      slotName: 'menulist',
      initialValue: null,
    },
  ],
}
