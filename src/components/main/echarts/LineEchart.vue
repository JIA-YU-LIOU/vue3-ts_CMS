<template>
  <div class="line-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import BaseEchart from '@/components/main/echarts/BaseEchart.vue'
import { computed } from 'vue'

interface IProps {
  xLabels: string[]
  values: any[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      left: 'center',
      top: '5%',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '商品銷量',
        type: 'line',
        stack: '總量',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.values,
      },
    ],
  }
})
</script>

<style scoped lang="scss"></style>
