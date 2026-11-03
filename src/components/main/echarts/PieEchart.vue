<template>
  <div class="pie-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BaseEchart from '@/components/main/echarts/BaseEchart.vue'
import type { IDataType } from '@/types/index.ts'
import type { EChartsOption } from 'echarts'

interface IProps {
  pieData: IDataType[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: '分類數據',
        type: 'pie',
        radius: '50%',
        center: ['50%', '55%'],
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
})
</script>

<style scoped lang="scss"></style>
