import { ref } from 'vue'
import PageModal from '@/components/main/page/pageModal.vue'
import type { PageRecord } from '@/types'

type callbackFnType = (data?: any) => void
export const usePageModal = (newCallback?: callbackFnType, editCallback?: callbackFnType) => {
  const modelRef = ref<InstanceType<typeof PageModal>>()
  // 新增使用者
  const handleNewClick = () => {
    modelRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  // 編輯使用者
  const handleEditClick = (itemData: PageRecord) => {
    modelRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return {
    modelRef,
    handleNewClick,
    handleEditClick,
  }
}
