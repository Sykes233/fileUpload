<template>
  <div>
    <FileView />
    <FileListView :tableData="this.tableData" />
  </div>
</template>

<script>
import axios from 'axios'
import FileView from '../components/FileView.vue'
import FileListView from '../components/FileListView.vue'
export default {
  name: "IndexPage",
  components: { FileView, FileListView },
  data() {
    return {
      tableData: []
    }
  },
  asyncData() {
    return axios.get('/api/fileList').then((response) => {
      let fileArr = response.data.result
      console.log(fileArr)
      return { tableData: fileArr }
    }).catch((error) => {
      console.error(error)
    })
  }
}
</script>
