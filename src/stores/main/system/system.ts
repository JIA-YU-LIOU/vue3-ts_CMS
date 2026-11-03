import {
  postPageListData,
  deletPageById,
  newPageData,
  editPageData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IPageQuery, PageRecord } from '@/types'
import { useMainStore } from '../main'

export const useSystemStore = defineStore('system', () => {
  // 頁面資料列表
  const pageList = ref<PageRecord[]>([])
  // 頁面資料總筆數
  const pageTotalCount = ref(0)

  /**
   * 查詢列表
   * @param pageName API 對應的頁面名稱
   * @param queryInfo 分頁查詢條件，包含起始位置與每頁筆數
   */
  const postPageListAction = async (pageName: string, queryInfo: IPageQuery) => {
    const pageListResult = await postPageListData(pageName, queryInfo)
    const { list, totalCount } = pageListResult.data
    pageList.value = list
    pageTotalCount.value = totalCount
  }

  /**
   * 新增
   *
   * @param pageName API 對應的頁面名稱
   * @param pageInfo 新增所需的資料
   */
  const newPageDataAction = async (pageName: string, pageInfo: Record<string, unknown>) => {
    await newPageData(pageName, pageInfo)
    const mainStore = useMainStore()
    await mainStore.fetchEntireDataAction()
  }

  /**
   * 更新指定的資料
   *
   * @param pageName API 對應的頁面名稱
   * @param id 要更新資料的 ID
   * @param userInfo 更新所需的資料
   */
  const editPageDataAction = async (
    pageName: string,
    id: number,
    pageInfo: Record<string, unknown>,
  ) => {
    await editPageData(pageName, id, pageInfo)
    const mainStore = useMainStore()
    await mainStore.fetchEntireDataAction()
  }

  /**
   * 刪除指定資料
   *
   * @param pageName API 對應的頁面名稱
   * @param id 要刪除資料的 ID
   */
  const deletPageByIdAction = async (pageName: string, id: number) => {
    await deletPageById(pageName, id)
    const mainStore = useMainStore()
    await mainStore.fetchEntireDataAction()
  }

  return {
    pageList,
    pageTotalCount,
    postPageListAction,
    deletPageByIdAction,
    newPageDataAction,
    editPageDataAction,
  }
})
