<template>
  <div class="count-card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="countRef1">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="countRef2">{{ number2 }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'

// 統計卡片接收的資料
interface IProps {
  amount: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

// 設定統計卡片的預設值
const props = withDefaults(defineProps<IProps>(), {
  title: '商品總銷量',
  tips: '所有商品的總銷量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品總銷量',
})

// 綁定主要數字的 DOM 元素
const countRef1 = ref<HTMLElement>()

// 綁定底部數字的 DOM 元素
const countRef2 = ref<HTMLElement>()

// 設定 CountUp 動畫選項
// 當 amount 為 saleroom 時，數字前方顯示新臺幣符號
const options = {
  prefix: props.amount === 'saleroom' ? 'NT $' : '',
}

// 元件掛載後初始化數字動畫
onMounted(() => {
  // 建立主要統計數字的動畫
  const countUp1 = new CountUp(countRef1.value!, props.number1, options)

  // 建立底部統計數字的動畫
  const countUp2 = new CountUp(countRef2.value!, props.number2, options)

  // 啟動數字遞增動畫
  countUp1.start()
  countUp2.start()
})
</script>

<style scoped lang="scss">
.count-card {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 130px;
  overflow: hidden;
  text-align: left;

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    // border: 1px solid red;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    align-items: center;
    height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
