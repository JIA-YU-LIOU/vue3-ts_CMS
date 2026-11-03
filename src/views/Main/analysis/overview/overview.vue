<template>
  <div class="overview">
    <Card title="關於">
      <div class="c-left">
        本專案是基於 Vue3、Pinia、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
        等技術的後台系統。
      </div>
    </Card>
    <Card title="技術棧">
      <TextLink :text-arrs="technologyStacks" />
      <Description title="生產環境依賴" :column="2" :table-datas="dependencies" />
      <Description title="開發環境依賴" :column="2" :table-datas="devDependencies" />
    </Card>
    <Card title="項目結構">
      <div class="c-left">
        <Code language="bash" :code="projectDir" />
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts" name="overview">
import Card from '@/components/main/analysis/overview/Card.vue'
import Code from '@/components/main/analysis/overview/Code.vue'
import Description from '@/components/main/analysis/overview/Description.vue'
import TextLink from '@/components/main/analysis/overview/TextLink.vue'
import { projectDir } from './config/project-dir'
import { technologyStacks } from './config/technology-stacks'
import { dependencies } from './config/dependencies'
import { devDependencies } from './config/dev-dependencies'
</script>

<style scoped lang="scss">
.overview {
  .c-left {
    text-align: left;
    line-height: 1.5;
  }

  .el-card {
    margin-bottom: 20px;
    &:deep(.el-card__header span) {
      font-weight: 700;
    }
  }

  .description {
    &:deep(.el-descriptions__title) {
      font-weight: 400;
    }
  }
}
</style>
