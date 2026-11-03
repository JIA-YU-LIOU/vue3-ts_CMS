<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside
        ref="asideRef"
        :width="isFold ? '60px' : '200px'"
        :class="{ open: mediaQuery.matches && !isFold }"
      >
        <MainMenu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <Header :is-fold="isFold" @fold-change="handleFoldChange" />
        </el-header>
        <el-main @click="handleOutsideClick"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/main/header/Header.vue'
import MainMenu from '@/components/main/aside/MainMenu.vue'
import { onMounted, onUnmounted, ref } from 'vue'
// aside 摺疊狀態
const isFold = ref(false)
// 側邊欄 DOM 元素參考
const asideRef = ref()
// 媒體查詢：裝置寬度是否小於 768px
const mediaQuery = window.matchMedia('(max-width: 767px)')

// 根據裝置寬度更新 aside 摺疊狀態
const updateFoldState = () => {
  isFold.value = mediaQuery.matches
}

// aside 摺疊狀態切換
const handleFoldChange = (value: boolean) => {
  isFold.value = value
}

// 點擊選單外部時，關閉手機版展開的側邊欄
const handleOutsideClick = (event: MouseEvent) => {
  // 只處理手機版且選單目前展開的情況
  if (!mediaQuery.matches || isFold.value) return

  // 取得 el-aside 元件對應的原生 DOM 元素
  const asideElement = asideRef.value?.$el as HTMLElement | undefined

  // 點擊位置不在側邊欄內時，將選單摺疊
  if (asideElement && !asideElement.contains(event.target as Node)) {
    isFold.value = true
  }
}

// 元件掛載時，初始化狀態並監聽視窗尺寸變化
onMounted(() => {
  updateFoldState()
  mediaQuery.addEventListener('change', updateFoldState)
})

// 元件卸載時，移除監聽事件
onUnmounted(() => {
  mediaQuery.removeEventListener('change', updateFoldState)
})
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .el-header,
  .el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
  }

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    background-color: #f0f2f5;
  }
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

@media (max-width: 767px) {
  .el-aside {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    z-index: 999;
    &.open {
      position: absolute;
      transform: translateX(0%);
    }
  }
}
</style>
