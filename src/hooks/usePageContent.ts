import { ref } from 'vue'
import PageContent from '@/components/main/page/pageContent.vue'
import type { PageFormData } from '@/types'

export const usePageContent = () => {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  // 查詢使用者資料
  const handleQueryClick = (formData: PageFormData) => {
    contentRef.value?.handleSearch(formData)
  }
  // 重置搜尋資料
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  // 使用者新增或編輯成功後重新查詢列表
  const handleSubmitSuccess = async (mode: 'create' | 'update') => {
    if (mode === 'create') {
      contentRef.value?.resetCurrentPage()
    }

    await contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick,
    handleSubmitSuccess,
  }
}
