<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import BaseEchart from '@/components/main/echarts/BaseEchart.vue'
import { computed } from 'vue'

interface IProps {
  xLabels: string[]
  values: any[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    title: {
      text: '支援滑鼠滾動縮放',
    },
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: '#fff',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: props.values,
      },
    ],
  }
})
</script>

<style scoped lang="scss"></style>
