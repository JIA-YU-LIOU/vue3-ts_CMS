<template>
  <div class="nav-menu">
    <div class="logo">
      <router-link to="/"
        ><img class="img" src="@/assets/img/logo.webp" alt="logo" />
        <span class="title" v-show="!isFold">Vue3+TS</span>
      </router-link>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="isFold"
    >
      <el-sub-menu :index="String(menu.id)" v-for="menu in userMenus" :key="menu.id">
        <template #title>
          <el-icon><component :is="menu.icon" /></el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item
          :index="String(submenu.id)"
          v-for="submenu in menu.children"
          :key="submenu.id"
          @click="handleItemClick(submenu)"
          >{{ submenu.name }}</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login'
import type { IMenu } from '@/types'
import { mapPathToMenu } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
// 登入 store
const loginStore = useLoginStore()
const { userMenus } = loginStore

// 目前選擇菜單的 id
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

// 定義外層傳入資料
defineProps({
  isFold: { type: Boolean },
})

// 點擊前往所選頁面
const router = useRouter()
const handleItemClick = (item: IMenu) => {
  router.push(item.url)
}
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    padding: 12px 20px;

    a {
      display: flex;
      align-items: center;
    }

    .img {
      max-width: 21px;
      margin-right: 10px;
      filter: invert(1);
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  .el-submenu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
