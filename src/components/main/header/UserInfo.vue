<template>
  <div class="user-info">
    <div class="operation">
      <span
        ><el-icon><Message /></el-icon
      ></span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon
      ></span>
      <span
        ><el-icon><Search /></el-icon
      ></span>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="username">{{ loginStore.userInfo?.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logOut">
            <el-icon> <CircleClose /></el-icon><span>登出</span>
          </el-dropdown-item>
          <el-dropdown-item divided
            ><el-icon><InfoFilled /></el-icon><span>用户信息</span></el-dropdown-item
          >
          <el-dropdown-item
            ><el-icon><Unlock /></el-icon><span>系统管理</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useLoginStore } from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'
// 使用 loginStore
const loginStore = useLoginStore()
// 登出
const router = useRouter()
const logOut = () => {
  localCache.clear()
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 35px;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}
.username {
  margin-left: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}
@media (max-width: 767px) {
  .operation {
    display: none;
  }
}
</style>
