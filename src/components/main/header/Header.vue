<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick()">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <BreadCrumb />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserInfo from './UserInfo.vue'
import BreadCrumb from './BreadCrumb.vue'

// 接收父元件傳入的摺疊狀態
const props = defineProps<{
  isFold: boolean
}>()

// 定義事件
const emit = defineEmits(['foldChange'])

// aside 摺疊狀態切換
const handleFoldClick = () => {
  emit('foldChange', !props.isFold)
}
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
