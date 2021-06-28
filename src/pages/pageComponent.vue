<template>
  <div>
    <div class="bpmnTopStyle">
      <customButton
        label="return"
        :icon='img'
        type="return"
      ></customButton>
      <el-button
        @click="saveBpmn"
        type="text"
      >保存</el-button>
      <el-button
        @click="saveBpmn"
        type="text"
      >保存</el-button>
      <el-upload
        style="margin-top: 20px"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
      >
        <el-button
          size="small"
          type="primary"
        >点击上传</el-button>
      </el-upload>
    </div>
    <bpmnComp ref="bpmnRef"></bpmnComp>
  </div>
</template>

<script>
import bpmnComp from '../components/bpmnComp'
import customButton from '../components/components/button.vue'
import img from '../components/img/return.png'
export default {
  data () {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      img
    }
  },
  methods: {
    saveBpmn () {
      this.$refs.bpmnRef.saveBpmn()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  components: {
    bpmnComp,
    customButton
  }
}
</script>

<style scoped lang="less">
.bpmnTopStyle {
  height: 50px;
  display: flex;
  padding: 10px;
  background-color: #323232;
  color: white;
}
</style>
