<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="not-found-code">404</div>

      <h1 class="not-found-title">找不到這個頁面</h1>

      <p class="not-found-description">很抱歉，您造訪的頁面不存在、已被移除，或網址可能有誤。</p>

      <div class="not-found-actions">
        <el-button type="primary" size="large" @click="handleGoHome">
          <el-icon class="icon">
            <HomeFilled />
          </el-icon>
          返回首頁
        </el-button>

        <el-button size="large" @click="handleGoBack"> 返回上一頁 </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'

const router = useRouter()

// 返回首頁
const handleGoHome = () => {
  router.push('/')
}

// 返回上一頁；若沒有可返回的歷史紀錄，則回到首頁
const handleGoBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 50px);
  padding: 24px;
  box-sizing: border-box;
  background-color: #f5f7fa;
  text-align: center;

  &-content {
    width: 100%;
    max-width: 520px;
    padding: 40px 24px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgb(0 0 0 / 5%);
  }

  &-code {
    margin-bottom: 12px;
    color: var(--el-color-primary);
    font-size: clamp(80px, 18vw, 140px);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 4px;
  }

  &-title {
    margin: 20px 0 12px;
    color: #303133;
    font-size: 24px;
    font-weight: 600;
  }

  &-description {
    margin: 0 auto 28px;
    color: #909399;
    font-size: 15px;
    line-height: 1.8;
  }

  &-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;

    .el-button + .el-button {
      margin-left: 0;
    }

    .icon {
      margin-right: 6px;
    }
  }
}

@media (max-width: 767px) {
  .not-found {
    min-height: calc(100vh - 50px);
    padding: 16px;

    &-content {
      padding: 36px 20px;
    }

    &-title {
      font-size: 21px;
    }

    &-description {
      font-size: 14px;
    }
  }
}
</style>
