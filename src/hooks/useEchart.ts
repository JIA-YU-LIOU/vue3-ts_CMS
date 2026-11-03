import * as echarts from 'echarts'
import { onUnmounted } from 'vue'
// import chinaMapData from '@/components/main/echarts/data/china.json'
import taiwanMap from '@/components/main/echarts/data/taiwan.json'

// echarts.registerMap('china', chinaMapData as any)
echarts.registerMap('taiwan', taiwanMap as any)

export const useEchart = (el: HTMLElement) => {
  // 初始化
  const echartInstance = echarts.init(el, 'light', { renderer: 'canvas' })
  // 設置配置
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  const handleResize = () => {
    echartInstance.resize()
  }
  // resize
  const updateSize = () => {
    handleResize()
  }

  // 監聽 resize
  window.addEventListener('resize', handleResize)

  // 卸載監聽
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    echartInstance.dispose()
  })

  return {
    echartInstance,
    setOptions,
    updateSize,
  }
}
