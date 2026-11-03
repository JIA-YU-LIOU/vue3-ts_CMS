<template>
  <div class="user">
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
      <template #enable="scoped">
        <div class="btn_outer">
          <el-button :type="scoped.row[scoped.prop] ? 'primary' : 'danger'" plain>{{
            scoped.row[scoped.prop] ? '啟用' : '停用'
          }}</el-button>
        </div>
      </template>
    </PageContent>
    <PageModal
      ref="modelRef"
      :modal-config="modalConfigRef"
      @submit-success="handleSubmitSuccess"
    />
  </div>
</template>

<script setup lang="ts" name="user">
import PageSearch from '@/components/main/page/PageSearch.vue'
import PageContent from '@/components/main/page/pageContent.vue'
import PageModal from '@/components/main/page/pageModal.vue'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { useMainStore } from '@/stores/main/main'
import { computed } from 'vue'
import { modalConfig } from './config/modal.config'
import { contentConfig } from './config/content.config'
import { searchConfig } from './config/search.config'

const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.type === 'password')
  passwordItem!.isHidden = false
}

const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.type === 'password')
  passwordItem!.isHidden = true
}

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      item.options = mainStore.entireRoles
    }
    if (item.prop === 'departmentId') {
      item.options = mainStore.entireDepartments
    }
  })
  return modalConfig
})

const { contentRef, handleQueryClick, handleResetClick, handleSubmitSuccess } = usePageContent()
const { modelRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)
</script>

<style lang="scss" scoped></style>
