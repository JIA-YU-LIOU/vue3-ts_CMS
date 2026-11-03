<template>
  <div class="role">
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
    />
    <PageModal
      ref="modelRef"
      :modal-config="modalConfig"
      :other-info="otherInfo"
      @submit-success="handleSubmitSuccess"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name',
          }"
          @check="handleElTreeCheck"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageContent from '@/components/main/page/pageContent.vue'
import PageModal from '@/components/main/page/pageModal.vue'
import PageSearch from '@/components/main/page/PageSearch.vue'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { modalConfig } from './config/modal.config'
import { useMainStore } from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { PageRecord } from '@/types'
import type { TreeInstance } from 'element-plus'
import { mapMenuListToIds } from '@/utils/mapMenus'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const { modelRef, handleNewClick, handleEditClick } = usePageModal(newCallback, editCallback)
const { contentRef, handleQueryClick, handleResetClick, handleSubmitSuccess } = usePageContent()
const otherInfo = ref<PageRecord>({})
const handleElTreeCheck = (data1, data2) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<TreeInstance>()
// 新增
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
// 編輯
function editCallback(itemData) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped></style>
