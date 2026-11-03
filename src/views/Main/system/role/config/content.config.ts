import type { IPageContentConfig } from '@/types'

export const contentConfig: IPageContentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新增角色',
  },
  propsList: [
    { type: 'selection', label: '選擇', width: '50px' },
    { type: 'index', label: '編號', width: '80px' },
    { type: 'normal', label: '角色名稱', prop: 'name' },
    { type: 'normal', label: '權限介紹', prop: 'intro' },
    { type: 'time', label: '創建時間', prop: 'createAt' },
    { type: 'time', label: '更新時間', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
}
