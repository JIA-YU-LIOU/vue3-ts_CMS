<template>
  <div class="login-panel">
    <h1 class="title">後台管理系統</h1>
    <el-tabs type="border-card" stretch v-model="activeName">
      <el-tab-pane name="account">
        <template #label>
          <el-icon><UserFilled /></el-icon>
          <span class="text"> 帳號登入</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <el-icon><Cellphone /></el-icon>
          <span class="text"> 手機登入</span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isRemPwd">記住密碼</el-checkbox>
      <el-link type="primary" onclick="alert('尚未開啟此功能')">忘記密碼</el-link>
    </div>
    <el-button type="primary" class="login-btn" size="large" @click="handleLoginBtnClick"
      >立即登入</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
import { localCache } from '@/utils/cache.ts'
import { IS_REM_PWD } from '@/global/constants.ts'

// 選中的登入分頁，預設為帳號登入
const activeName = ref('account')

// 監聽記住密碼的狀態
const isRemPwd = ref(localCache.getCache(IS_REM_PWD) ?? false)
watch(isRemPwd, (n) => {
  localCache.setCache(IS_REM_PWD, n)
})

// 存取子元件
const accountRef = ref<InstanceType<typeof LoginAccount>>()

/**
 * 登入
 */
const handleLoginBtnClick = () => {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    alert('手機登入功能尚未開啟')
  }
}
</script>

<style scoped lang="scss">
.login-panel {
  max-width: 400px;
  width: 90%;
  background: #fff;
  padding: 20px 20px;
  border-radius: 10px;

  .title {
    text-align: center;
  }

  .text {
    margin-top: 2px;
    margin-left: 3px;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
