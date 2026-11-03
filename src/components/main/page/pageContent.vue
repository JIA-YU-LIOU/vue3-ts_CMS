<template>
  <div class="content" v-if="isQuery">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '數據列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新增數據'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        style="width: 100%"
        border
        lazy
        v-bind="contentConfig.childrenProps"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'time'">
            <el-table-column align="center" v-bind="item">
              <template #default="scoped">
                {{ item.prop ? formatUTC(scoped.row[item.prop]) : '' }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-if="isUpdate || isDelete" align="center" label="操作">
              <template #default="scoped">
                <div class="btn_outer">
                  <el-button
                    v-if="isUpdate"
                    type="primary"
                    icon="Edit"
                    text
                    @click="handleEditBtnClick(scoped.row)"
                    >編輯</el-button
                  >
                  <el-button
                    v-if="isDelete"
                    type="danger"
                    icon="Delete"
                    text
                    @click="handleDeleteBtnClick(scoped.row.id)"
                    >刪除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scoped">
                <slot :name="item.slotName" v-bind="scoped" :prop="item.prop"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <el-pagination
      v-if="!(contentConfig.pageName === 'menu')"
      class="pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :pager-count="5"
      :total="pageTotalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { RESULT_TYPE } from '@/global/constants'
import { usePermissions } from '@/hooks/usePermissions'
import { useSystemStore } from '@/stores/main/system/system'
import type { IPageContentConfig, IPageQuery, PageFormData, PageRecord } from '@/types'
import { formatUTC } from '@/utils/format'
import { getErrorMessage, showMessage } from '@/utils/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// 定義接收資料
interface Iprops {
  contentConfig: IPageContentConfig
}
const props = defineProps<Iprops>()

// 定義事件
const emit = defineEmits(['newClick', 'editClick'])

// 使用者權限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

const systemStore = useSystemStore()

// 使用者列表、總數
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// 目前所在頁碼
const currentPage = ref(1)
// 每頁顯示資料數
const pageSize = ref(3)

// 控制每頁顯示資料數
const handleSizeChange = () => {
  currentPage.value = 1
  fetchPageListData()
}
// 跳轉當前頁數
const handleCurrentChange = () => {
  fetchPageListData()
}

// 取得列表資料
const searchFormData = ref<PageFormData>({})
const fetchPageListData = async () => {
  if (!isQuery) return
  const queryInfo: IPageQuery = {
    size: pageSize.value,
    offset: (currentPage.value - 1) * pageSize.value,
    ...searchFormData.value,
  }
  try {
    await systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
  } catch (error) {
    showMessage(getErrorMessage(error, '查詢資料失敗，請稍後再試'), RESULT_TYPE.error)
  }
}

// 依據搜尋條件重新取得使用者列表
const handleSearch = (formData: PageFormData) => {
  searchFormData.value = formData
  currentPage.value = 1
  fetchPageListData()
}

fetchPageListData()

// 刪除指定資料
const handleDeleteBtnClick = async (id: number) => {
  try {
    await systemStore.deletPageByIdAction(props.contentConfig.pageName, id)
  } catch (error) {
    showMessage(getErrorMessage(error, '刪除失敗，請稍後再試'), RESULT_TYPE.error)
    return
  }

  // 刪除 API 已成功，立即顯示成功訊息
  showMessage('刪除成功', RESULT_TYPE.success)

  // 計算刪除後的資料總筆數
  const remainingCount = Math.max(0, pageTotalCount.value - 1)

  // 計算刪除後的總頁數，至少保留第 1 頁
  const totalPages = Math.max(1, Math.ceil(remainingCount / pageSize.value))

  // 如果目前頁碼超出範圍，退回最後一個有效頁面
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages
  }

  // 重新查詢目前頁面的資料
  await fetchPageListData()
}

// 新增資料
const handleNewUserClick = () => {
  emit('newClick')
}

// 編輯指定資料
const handleEditBtnClick = (itemData: PageRecord) => {
  emit('editClick', itemData)
}

// 重設至第一頁
const resetCurrentPage = () => {
  currentPage.value = 1
}

defineExpose({ fetchPageListData, handleSearch, resetCurrentPage })
</script>

<style scoped lang="scss">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    min-height: 160px;

    :deep(.el-table__cell) {
      padding: 14px 0;
    }

    :deep(.btn_outer) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      white-space: nowrap;
      gap: 10px;
      .el-button {
        margin: 0;
      }
    }
  }

  .error {
    margin-bottom: 16px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
@media (max-width: 767px) {
  .content {
    .pagination {
      flex-wrap: wrap;
      row-gap: 10px;
      justify-content: center;
    }
  }
}
</style>
