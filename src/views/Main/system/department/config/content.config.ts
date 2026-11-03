import type { IPageContentConfig } from '@/types'

export const contentConfig: IPageContentConfig = {
  pageName: 'department',
  header: {
    title: '部門列表',
    btnTitle: '新增部門',
  },
  propsList: [
    { type: 'selection', label: '選擇', width: '50px' },
    { type: 'index', label: '編號', width: '80px' },
    { type: 'normal', label: '部門名稱', prop: 'name' },
    { type: 'normal', label: '部門主管', prop: 'leader' },
    { type: 'custom', label: '上級部門', prop: 'parentId', slotName: 'parentDepartment' },
    { type: 'time', label: '創建時間', prop: 'createAt' },
    { type: 'time', label: '更新時間', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
  // childrenProps?: Record<string, unknown>
}
