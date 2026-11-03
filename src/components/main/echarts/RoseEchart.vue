<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import BaseEchart from '@/components/main/echarts/BaseEchart.vue'
import { computed } from 'vue'
import type { IDataType } from '@/types/index.ts'

interface IProps {
  roseData: IDataType[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)',
    },
    legend: {
      left: 'center',
      top: '5%',
    },
    toolbox: {
      bottom: '0%',
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '55%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data: props.roseData,
      },
    ],
  }
})
</script>

<style scoped lang="scss"></style>
