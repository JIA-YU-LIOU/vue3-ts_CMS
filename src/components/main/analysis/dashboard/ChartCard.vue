<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot>默認內容</slot>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
// 定義 Props
interface IProps {
  title?: string
}

// 設定 Props 預設值
withDefaults(defineProps<IProps>(), {
  title: '標題',
})
</script>

<style scoped lang="scss">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
</style>
