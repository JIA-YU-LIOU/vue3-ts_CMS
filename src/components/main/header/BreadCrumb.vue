<template>
  <div class="header-crumbs">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login'
import { mapPathToBreadcrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const LoginStore = useLoginStore()

const route = useRoute()
// 麵包屑導覽資料
const breadcrumbs = computed(() => {
  const path = route.path
  return mapPathToBreadcrumbs(path, LoginStore.userMenus)
})
</script>
