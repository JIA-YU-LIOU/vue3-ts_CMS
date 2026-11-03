import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
} from '@/service/main/system/analysis'
import type { IAddressSale, IGoodsAmount, IGoodsCount, IGoodsFavor } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnalysisStore = defineStore('analysis', () => {
  // 統計項目列表
  const amountList = ref<IGoodsAmount[]>([])
  // 各商品數量
  const goodsCategoryCount = ref<IGoodsCount[]>([])
  // 各商品銷售額
  const goodsCategorySale = ref<IGoodsCount[]>([])
  // 各商品銷售額
  const goodsCategoryFavor = ref<IGoodsFavor[]>([])
  // 各地區銷售額
  const addressSale = ref<IAddressSale[]>([])

  /**
   * 取得所有首頁分析統計資料
   * @returns 失敗的統計項目名稱清單
   */
  const fetchAnalysisDataAction = async (): Promise<string[]> => {
    // 定義 API 執行結果對應的統計項目名稱
    const apiNames = [
      '首頁統計卡片',
      '商品分類數量',
      '商品分類銷售數量',
      '商品分類收藏數量',
      '各地區商品銷售數量',
    ]

    // 平行執行五支 API，等待所有請求完成
    const results = await Promise.allSettled([
      getAmountListData(),
      getGoodsCategoryCount(),
      getGoodsCategorySale(),
      getGoodsCategoryFavor(),
      getGoodsAddressSale(),
    ])

    // 儲存失敗的統計項目名稱
    const failedItems: string[] = []

    // 逐一判斷 API 結果，成功才更新對應資料
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        const apiName = apiNames[index]

        if (apiName !== undefined) {
          failedItems.push(apiName)
          console.error(`${apiName}載入失敗：`, result.reason)
        }
      }
    })

    // 只有 API 成功時才更新資料，失敗時保留原有資料
    if (results[0].status === 'fulfilled') {
      amountList.value = results[0].value.data
    }

    if (results[1].status === 'fulfilled') {
      goodsCategoryCount.value = results[1].value.data
    }

    if (results[2].status === 'fulfilled') {
      goodsCategorySale.value = results[2].value.data
    }

    if (results[3].status === 'fulfilled') {
      goodsCategoryFavor.value = results[3].value.data
    }

    if (results[4].status === 'fulfilled') {
      addressSale.value = results[4].value.data
    }
    return failedItems
  }

  return {
    amountList,
    goodsCategoryCount,
    goodsCategorySale,
    goodsCategoryFavor,
    addressSale,
    fetchAnalysisDataAction,
  }
})
