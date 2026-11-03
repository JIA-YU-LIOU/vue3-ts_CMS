<template>
  <div class="login-account">
    <el-form :model="account" :rules="accountRules" status-icon ref="formRef">
      <el-form-item label="帳號" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { CACHE_NAME, CACHE_PASSWORD, RESULT_TYPE } from '@/global/constants'
import { useLoginStore } from '@/stores/login/login'
import type { IAccountLoginParams } from '@/types'
import { localCache } from '@/utils/cache'
import { showMessage, getErrorMessage } from '@/utils/message'
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'

// 帳號密碼
const account = ref<IAccountLoginParams>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? '',
})

// 驗證規則
const accountRules: FormRules = {
  name: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { pattern: /[a-z0-9]{4,10}/, message: '請輸入4-10位的英文或數字', trigger: 'change' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { pattern: /[a-z0-9]{4,10}/, message: '請輸入4-10位的英文或數字', trigger: 'change' },
  ],
}

// 表單元件
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()

/**
 * 登入
 * @param isRemPwd 是否記住密碼
 */
const loginAction = (isRemPwd: boolean) => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) {
      showMessage('請確認帳號及密碼格式是否正確', RESULT_TYPE.error)
      return
    }
    try {
      await loginStore.loginAccountAction(account.value)
      if (isRemPwd) {
        localCache.setCache(CACHE_NAME, account.value.name)
        localCache.setCache(CACHE_PASSWORD, account.value.password)
      } else {
        localCache.removeCache(CACHE_NAME)
        localCache.removeCache(CACHE_PASSWORD)
      }
      showMessage('登入成功', RESULT_TYPE.success)
    } catch (error) {
      showMessage(getErrorMessage(error, '登入失敗，請稍後再試'), RESULT_TYPE.error)
    }
  })
}

// 向父層暴露
defineExpose({
  loginAction,
})
</script>

<style scoped></style>
