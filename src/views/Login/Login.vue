<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from '@/components/login/LoginPanel.vue'
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(@/assets/img/login-bg.jpg) no-repeat center;
  background-size: cover;
}
</style>
