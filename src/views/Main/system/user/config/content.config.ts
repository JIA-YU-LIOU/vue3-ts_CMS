import type { IPageContentConfig } from '@/types'

export const contentConfig: IPageContentConfig = {
  pageName: 'users',
  header: {
    title: '使用者列表',
    btnTitle: '新增使用者',
  },
  propsList: [
    { type: 'selection', label: '選擇', width: '50px' },
    { type: 'index', label: '編號', width: '80px' },
    { type: 'normal', label: '使用者名稱', prop: 'name' },
    { type: 'normal', label: '使用者姓名', prop: 'realname' },
    { type: 'normal', label: '手機', prop: 'cellphone' },
    { type: 'custom', label: '狀態', prop: 'enable', slotName: 'enable' },
    { type: 'time', label: '創建時間', prop: 'createAt' },
    { type: 'time', label: '更新時間', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
  // childrenProps?: Record<string, unknown>
}
