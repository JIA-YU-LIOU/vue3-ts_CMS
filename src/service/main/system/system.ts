import hyRequest from '../..'
import type { IApiResponse, IPaginatedData } from '../../types'
import type { IPageQuery } from '../types'

// 查詢列表
export const postPageListData = (pageName: string, queryInfo: IPageQuery) => {
  return hyRequest.post<IApiResponse<IPaginatedData<Record<string, unknown>>>, IPageQuery>({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}

// 新增
export const newPageData = (pageName: string, pageInfo: Record<string, unknown>) => {
  return hyRequest.post<IApiResponse<Record<string, unknown>>, Record<string, unknown>>({
    url: `/${pageName}`,
    data: pageInfo,
  })
}

// 更新指定的資料
export const editPageData = (pageName: string, id: number, pageInfo: Record<string, unknown>) => {
  return hyRequest.patch<IApiResponse<Record<string, unknown>>, Record<string, unknown>>({
    url: `/${pageName}/${id}`,
    data: pageInfo,
  })
}

// 刪除指定資料
export const deletPageById = (pageName: string, id: number) => {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  })
}
