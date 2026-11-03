<template>
  <div class="rose-echart">
    <BaseEchart :options="options" />
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import BaseEchart from '@/components/main/echarts/BaseEchart.vue'
import { computed } from 'vue'
import type { IDataType } from '@/types'
import { convertData } from '@/utils/convertData'

interface IProps {
  mapData: IDataType[]
}
const props = defineProps<IProps>()
const options = computed<EChartsOption>(() => {
  return {
    backgroundColor: ' #fff',
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ' : ' + params.value[2]
      },
    },
    visualMap: {
      min: 0,
      max: 20,
      left: -20,
      bottom: 0,
      calculable: true,
      text: ['高', '低'],
      seriesIndex: 0,
      inRange: {
        color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)'],
      },
      textStyle: {
        color: '#000',
      },
    },
    geo: {
      center: [120.9876, 23.8388],
      zoom: 5,
      map: 'taiwan',
      roam: true,
      itemStyle: {
        areaColor: '#fff',
      },
      emphasis: {
        itemStyle: {
          borderColor: '#a2a2a2',
          areaColor: '#f3fff1',
        },
      },
    },
    series: [
      {
        name: '銷量',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(props.mapData),
        symbolSize: 20,
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        },
      },
      {
        type: 'map',
        map: 'taiwan',
        geoIndex: 0,
        itemStyle: {
          areaColor: '#fff',
        },
        aspectScale: 0.75,
        tooltip: {
          show: false,
        },
      },
    ],
  }
})
</script>

<style scoped lang="scss"></style>
