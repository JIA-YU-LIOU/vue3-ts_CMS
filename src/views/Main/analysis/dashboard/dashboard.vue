<template>
  <div class="dashboard">
    <el-row>
      <el-col v-for="item in amountList" :key="item.amount" :xs="24" :sm="12" :lg="6">
        <CountCard v-bind="item" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :lg="7">
        <ChartCard title="分類商品數量(圓餅圖)">
          <PieEchart :pie-data="showCategoryCount" />
        </ChartCard>
      </el-col>
      <el-col :xs="24" :lg="10">
        <ChartCard title="不同城市商品銷售量">
          <MapEchart :map-data="showAddressSale" />
        </ChartCard>
      </el-col>
      <el-col :xs="24" :lg="7">
        <ChartCard title="分類商品數量(玫瑰圖)">
          <RoseEchart :rose-data="showCategoryCount" />
        </ChartCard>
      </el-col>
    </el-row>
    <el-row class="content-row">
      <el-col :xs="24" :lg="12">
        <ChartCard title="各商品分類銷量">
          <LineEchart v-bind="showCategorySale" />
        </ChartCard>
      </el-col>
      <el-col :xs="24" :lg="12">
        <ChartCard title="各商品分類收藏量">
          <BarEchart v-bind="showCategoryFavor" />
        </ChartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

import ChartCard from '@/components/main/analysis/dashboard/ChartCard.vue'
import CountCard from '@/components/main/analysis/dashboard/CountCard.vue'
import BarEchart from '@/components/main/echarts/BarEchart.vue'
import LineEchart from '@/components/main/echarts/LineEchart.vue'
import MapEchart from '@/components/main/echarts/MapEchart.vue'
import PieEchart from '@/components/main/echarts/PieEchart.vue'
import RoseEchart from '@/components/main/echarts/RoseEchart.vue'

import { useAnalysisStore } from '@/stores/main/system/analysis'
import { RESULT_TYPE } from '@/global/constants'
import { getErrorMessage, showMessage } from '@/utils/message'

// 建立分析統計 Store
const analysisStore = useAnalysisStore()
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, addressSale } =
  storeToRefs(analysisStore)

// 載入所有統計資料
const fetchDashboardData = async () => {
  try {
    // 取得失敗的統計項目清單
    const failedItems = await analysisStore.fetchAnalysisDataAction()

    // 只有存在失敗項目時，才顯示警告
    if (failedItems.length > 0) {
      showMessage(`部分統計資料載入失敗：${failedItems.join('、')}`, RESULT_TYPE.warning, 3000)
    }
  } catch (error: unknown) {
    showMessage(getErrorMessage(error, '統計資料載入失敗，請稍後再試'), RESULT_TYPE.error)
  }
}

// 元件掛載後載入統計資料
onMounted(() => {
  void fetchDashboardData()
})

// 將商品分類數量轉換成圖表需要的資料格式。
// name 為分類名稱，value 為該分類的商品數量。
const showCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount,
  }))
})

// 將商品分類銷售資料轉換成折線圖格式。
// xLabels 為 X 軸分類名稱，values 為各分類的銷售數量。
const showCategorySale = computed(() => {
  const xLabels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)

  return {
    xLabels,
    values,
  }
})

// 將商品分類收藏資料轉換成長條圖格式。
// xLabels 為 X 軸分類名稱，values 為各分類的收藏數量。
const showCategoryFavor = computed(() => {
  const xLabels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)

  return {
    xLabels,
    values,
  }
})

// 將各地區銷售資料轉換成地圖圖表格式。
// name 為地區名稱，value 為該地區的銷售數量。
const showAddressSale = computed(() => {
  return addressSale.value.map((item) => ({
    name: item.address,
    value: item.count,
  }))
})
</script>

<style scoped lang="scss">
.dashboard {
  .el-row > div {
    padding: 5px;
  }
}
</style>
