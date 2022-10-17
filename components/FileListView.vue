<template>
  <el-row type="flex" justify="center" align="middle" class="fileTable">
    <el-table :default-sort = "{prop: 'date', order: 'descending'}" :data="table" style="width: 50%">
      <el-table-column prop="filename" label="文件名" min-width="180">
      </el-table-column>
      <el-table-column :sortable="true" prop="date" label="创建时间" width="180">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  props: ['tableData'],
  data() {
    return {
      table : this.tableData
    }
  },

}
</script>

<style>
</style>