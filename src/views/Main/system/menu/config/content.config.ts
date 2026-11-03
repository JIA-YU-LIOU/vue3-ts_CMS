import type { IPageContentConfig } from '@/types'

export const contentConfig: IPageContentConfig = {
  pageName: 'menu',
  header: {
    title: '選單列表',
  },
  propsList: [
    { label: '選單名稱', prop: 'name' },
    { label: '級別', prop: 'type' },
    { label: '網址', prop: 'url' },
    { label: '排序', prop: 'sort' },
    { label: '權限', prop: 'permission' },
    { type: 'time', label: '創建時間', prop: 'createAt' },
    { type: 'time', label: '更新時間', prop: 'updateAt' },
  ],
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
    },
  },
}
