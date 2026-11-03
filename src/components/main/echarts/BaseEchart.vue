<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { useEchart } from '@/hooks/useEchart'
import type { EChartsOption } from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'

interface IProps {
  options: EChartsOption
  width?: string
  height?: string
}
const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '360px',
})
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="scss"></style>
