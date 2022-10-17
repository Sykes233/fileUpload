<template>
  <el-row type="flex" justify="center">
    <el-upload :on-success="uploadSuccess" class="uploader" name="file" action="/api/upload" :on-preview="handlePreview" :on-remove="handleRemove"
      :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList"
      :on-error="handleError">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </el-row>
</template>
  
<script>
export default {
  props: ['successFunc'],
  data() {
    return {
      fileList: [],
      uploadSuccess: this.successFunc
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleError(err, file, fileList) {
      this.$message.error(`上传错误：${err}`)
      console.log(file, fileList)
    }
  }
}
</script>
<style>

.uploader{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>