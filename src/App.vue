<template>
  <el-config-provider :locale="zhTw">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
</script>

<style scoped lang="scss"></style>
