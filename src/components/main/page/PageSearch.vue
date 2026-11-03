<template>
  <div class="search" v-if="isQuery">
    <el-form label-width="120px" ref="formRef" :model="searchForm">
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          v-for="item in searchConfig.formItems"
          :key="item.label"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              v-if="item.type === 'input'"
              :placeholder="item.placeholder"
              v-model="searchForm[item.prop] as string"
            />
            <el-date-picker
              v-if="item.type === 'date-picker'"
              v-model="searchForm[item.prop] as string[]"
              type="daterange"
              range-separator="-"
              start-placeholder="開始時間"
              end-placeholder="結束時間"
              value-format="YYYY-MM-DD"
              popper-class="mobile-date-picker"
            />
            <el-select
              v-if="item.type === 'select'"
              placeholder="請選擇狀態"
              style="width: 100%"
              v-model="searchForm[item.prop]"
            >
              <el-option
                v-for="option in item.options"
                :key="option.id"
                :label="option.name"
                :value="option.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick()">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick()">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from '@/hooks/usePermissions'
import type { IPageSearchConfig, PageFormData } from '@/types'
import type { ElForm } from 'element-plus'
import { ref } from 'vue'

interface IProps {
  searchConfig: IPageSearchConfig
}
// 定義接收資料
const props = defineProps<IProps>()
// 定義事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 使用者權限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

// 搜索資料
const initialForm: PageFormData = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue !== undefined ? item.initialValue : ''
}
const searchForm = ref<PageFormData>(initialForm)
// 表單元件
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置搜索資料
const handleResetClick = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}
// 查詢使用者
const handleQueryClick = () => {
  emit('queryClick', searchForm.value)
}
</script>

<style scoped lang="scss">
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
@media (max-width: 767px) {
  .search {
    .el-form-item {
      padding: 10px 10px;
    }
  }
  :global(.mobile-date-picker) {
    max-width: calc(100vw - 16px) !important;
    box-sizing: border-box;
    overflow: auto hidden;
  }
  :global(.mobile-date-picker .el-date-range-picker) {
    box-sizing: border-box;
    max-width: calc(100vw - 16px) !important;
  }
}
</style>
