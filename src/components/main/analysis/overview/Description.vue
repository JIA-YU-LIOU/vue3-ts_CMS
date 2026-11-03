<template>
  <div class="description">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="(itemData, index) in props.tableDatas" :key="index">
        <el-descriptions-item>
          <template #label> {{ itemData.name }} </template>
          <el-tag size="small"> {{ itemData.description }} </el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import type { DescriptionProp } from '@/types'

interface IProps {
  title: string
  column: number
  tableDatas?: DescriptionProp[]
}
const props = withDefaults(defineProps<IProps>(), {
  title: 'Title',
  tableDatas: () => [],
})
</script>

<style scoped lang="scss">
.description {
  margin-bottom: 20px;
}
</style>
