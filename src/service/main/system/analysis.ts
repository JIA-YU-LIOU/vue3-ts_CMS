import hyRequest from '@/service'
import type { IApiResponse } from '@/service/types'
import type { IAddressSale, IGoodsAmount, IGoodsCount, IGoodsFavor } from '../types'
// 取得統計項目
export const getAmountListData = () => {
  return hyRequest.get<IApiResponse<IGoodsAmount[]>>({
    url: '/goods/amount/list',
  })
}

// 取得商品種類
export const getGoodsCategoryCount = () => {
  return hyRequest.get<IApiResponse<IGoodsCount[]>>({
    url: '/goods/category/count',
  })
}

// 取得商品銷售數
export const getGoodsCategorySale = () => {
  return hyRequest.get<IApiResponse<IGoodsCount[]>>({
    url: '/goods/category/sale',
  })
}

// 取得商品收藏數
export const getGoodsCategoryFavor = () => {
  return hyRequest.get<IApiResponse<IGoodsFavor[]>>({
    url: '/goods/category/favor',
  })
}

// 取得各地銷售數
export const getGoodsAddressSale = () => {
  return hyRequest.get<IApiResponse<IAddressSale[]>>({
    url: '/goods/address/sale',
  })
}
