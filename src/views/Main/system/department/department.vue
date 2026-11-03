<template>
  <div class="department">
    <PageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
      :search-config="searchConfig"
    />
    <PageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      :content-config="contentConfig"
    >
      <template #leader="scoped">
        <span class="leader">{{ scoped.row[scoped.prop] }}</span>
      </template>
      <template #parentDepartment="scoped">
        <span>
          {{ getParentDepartmentName(scoped.row.parentId) }}
        </span>
      </template>
    </PageContent>
    <PageModal
      ref="modelRef"
      :modal-config="modalConfigRef"
      @submit-success="handleSubmitSuccess"
    />
  </div>
</template>

<script setup lang="ts" name="department">
import PageContent from '@/components/main/page/pageContent.vue'
import PageModal from '@/components/main/page/pageModal.vue'
import PageSearch from '@/components/main/page/PageSearch.vue'
import { computed } from 'vue'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useMainStore } from '@/stores/main/main'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageContent } from '@/hooks/usePageContent'

const mainStore = useMainStore()

// 當部門資料更新時，Modal 中的上級部門選項也會同步更新
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options = mainStore.entireDepartments
    }
  })
  return modalConfig
})

// 透過上級部門 ID 查找部門名稱
const getParentDepartmentName = (parentId: number | null) => {
  if (parentId == null || parentId === 0) {
    return '無'
  }
  const department = mainStore.entireDepartments.find((item) => item.id === parentId)
  return department?.name ?? '未知部門'
}

const { contentRef, handleQueryClick, handleResetClick, handleSubmitSuccess } = usePageContent()
const { modelRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style lang="scss" scoped></style>
