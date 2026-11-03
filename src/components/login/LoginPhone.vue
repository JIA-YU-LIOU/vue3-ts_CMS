<template>
  <el-form>
    <el-form-item label="手機號碼">
      <el-input />
    </el-form-item>
    <el-form-item label="驗證碼">
      <div class="get-code">
        <el-input />
        <el-button type="primary" class="get-btn" disabled>取得驗證碼</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup></script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
