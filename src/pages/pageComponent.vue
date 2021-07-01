<template>
  <div>
    <div class="bpmnTopStyle">
      <template v-for="(item,index) in isGlobalWhite ? btnWhiteArr : btnArr">
        <customButton
          :label="item.label"
          :icon='item.img'
          :type="item.type"
          :key="index"
          @handleReturn="handleReturn"
          :defaultZoom="defaultZoom"
          :className="item.groupClass"
        ></customButton>
      </template>
      <div class="saveBtnStyle">
        <el-button
          size="mini"
          class="saveBtnItem"
        >Save process</el-button>
        <el-button
          size="mini"
          class="saveBtnItem"
        >Compilation</el-button>
        <el-button
          size="mini"
          class="saveBtnItem"
        >Implementation</el-button>
      </div>

      <!-- <el-upload
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
      </el-upload> -->
    </div>
    <bpmnComp
      ref="bpmnRef"
      @viewer="viewer"
    ></bpmnComp>
  </div>
</template>

<script>
import bpmnComp from '../components/bpmnComp'
import customButton from '../components/components/button.vue'
import returnImg from '../components/img/return.png'
import exportImg from '../components/img/export.png'
import revokeImg from '../components/img/revoke.png'
import restoreImg from '../components/img/restore.png'
import leftImg from '../components/img/left.png'
import rightImg from '../components/img/right.png'
import topImg from '../components/img/top.png'
import bottomImg from '../components/img/bottom.png'
import horizontallyImg from '../components/img/horizontally.png'
import verticalCenterImg from '../components/img/verticalCenter.png'
import returnWImg from '../components/img/returnW.png'
import exportWImg from '../components/img/exportW.png'
import revokeWImg from '../components/img/revokeW.png'
import restoreWImg from '../components/img/restoreW.png'
import leftWImg from '../components/img/leftW.png'
import rightWImg from '../components/img/rightW.png'
import topWImg from '../components/img/topW.png'
import bottomWImg from '../components/img/bottomW.png'
import horizontallyWImg from '../components/img/horizontallyW.png'
import verticalCenterWImg from '../components/img/verticalCenterW.png'
import deleteWImg from '../components/img/deleteW.png'
export default {
  data () {
    return {
      defaultZoom: 1,
      bpmnModeler: null,
      isGlobalWhite: true,
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
      btnArr: [
        {
          label: 'Return',
          img: returnImg,
          type: 'return'
        },
        {
          label: 'Export',
          img: exportImg,
          type: 'export'
        },
        {
          label: 'Zoom',
          img: returnImg,
          type: 'zoom',
        },
        {
          label: 'Revoke',
          img: revokeImg,
          type: 'revoke',
          groupClass: 'group'
        },
        {
          label: 'Restore',
          img: restoreImg,
          type: 'restore'
        },
        {
          label: 'Left',
          img: leftImg,
          type: 'left',
          groupClass: 'group'
        },
        {
          label: 'Center',
          img: horizontallyImg,
          type: 'center'
        },
        {
          label: 'Right',
          img: rightImg,
          type: 'right'
        },
        {
          label: 'Top',
          img: topImg,
          type: 'top'
        },
        {
          label: 'Middle',
          img: verticalCenterImg,
          type: 'middle'
        },
        {
          label: 'Bottom',
          img: bottomImg,
          type: 'bottom'
        },
      ],
      btnWhiteArr: [
        {
          label: 'Return',
          img: returnWImg,
          type: 'return'
        },
        {
          label: 'Export',
          img: exportWImg,
          type: 'export'
        },
        {
          label: 'Zoom',
          img: returnImg,
          type: 'zoom',
        },
        {
          label: 'Revoke',
          img: revokeWImg,
          type: 'revoke',
          groupClass: 'group'
        },
        {
          label: 'Restore',
          img: restoreWImg,
          type: 'restore'
        },
        {
          label: 'Left',
          img: leftWImg,
          type: 'left',
          groupClass: 'group'
        },
        {
          label: 'Center',
          img: horizontallyWImg,
          type: 'center'
        },
        {
          label: 'Right',
          img: rightWImg,
          type: 'right'
        },
        {
          label: 'Top',
          img: topWImg,
          type: 'top'
        },
        {
          label: 'Middle',
          img: verticalCenterWImg,
          type: 'middle'
        },
        {
          label: 'Bottom',
          img: bottomWImg,
          type: 'bottom'
        },
        {
          label: 'Delete',
          img: deleteWImg,
          type: 'delete',
          groupClass: 'group'
        }
      ],
    }
  },
  mounted () {
    // console.log('PaletteProviderPaletteProviderPaletteProvider,', PaletteProvider, )
  },
  methods: {
    viewer (data) {
      this.bpmnModeler = data
    },
    handleReturn (data) {
      console.log('+++++++++++++data,', data);
      if (data === 'return') {
        this.handleBack();
      } else if (data === 'export') {
        this.saveBpmn();
      } else if (data === 'narrow') {
        this.processZoomOut();
      } else if (data === 'enlarge') {
        this.processZoomIn();
      } else if (data === 'zoomCenter') {
        this.processReZoom();
      } else if (data === 'revoke') {
        this.processUndo();
        this.processUndo();
      } else if (data === 'restore') {
        this.processRedo();
        this.processRedo();
      } else if (['left', 'right', 'top', 'bottom', 'center', 'middle'].includes(data)) {
        this.handleAlign(data);
      } else if (data === 'delete') {
        this.handleDeleteElement();
      }
    },

    // 返回上一层
    handleBack () {
      this.$router.go(-1);
    },

    // 导出文件
    saveBpmn () {
      this.$refs.bpmnRef.saveBpmn();
    },

    // 缩小视图
    processZoomOut (zoomStep = 0.1) {
      let newZoom = Math.floor(this.defaultZoom * 100 - zoomStep * 100) / 100;
      if (newZoom < 0.2) {
        throw new Error("[Process Designer Warn ]: The zoom ratio cannot be less than 0.2");
      }
      this.defaultZoom = newZoom;
      this.bpmnModeler.get("canvas").zoom(this.defaultZoom);
    },

    // 放大视图
    processZoomIn (zoomStep = 0.1) {
      let newZoom = Math.floor(this.defaultZoom * 100 + zoomStep * 100) / 100;
      if (newZoom > 4) {
        throw new Error("[Process Designer Warn ]: The zoom ratio cannot be greater than 4");
      }
      this.defaultZoom = newZoom;
      this.bpmnModeler.get("canvas").zoom(this.defaultZoom);
    },

    // 重置视图并居中
    processReZoom () {
      this.defaultZoom = 1;
      this.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
    },

    // 撤销
    processUndo () {
      this.bpmnModeler.get("commandStack").undo();
    },

    // 恢复
    processRedo () {
      this.bpmnModeler.get("commandStack").redo();
    },

    // 对齐方式（上：top，下：bottom，右：right，左：left，水平居中：center，垂直居中：middle）
    handleAlign (align) {
      const Selection = this.bpmnModeler.get("selection");
      const SelectedElements = Selection.get();
      const AlignElements = this.bpmnModeler.get("alignElements");
      if (!SelectedElements || SelectedElements.length <= 1) {
        this.$message.warning("请按住 Shift 键选择多个元素对齐");
        return;
      }
      this.$confirm("自动对齐可能造成图形变形，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => AlignElements.trigger(SelectedElements, align));
    },

    // 删除元素
    handleDeleteElement () {
      const Selection = this.bpmnModeler.get('selection');
      const SelectedElements = Selection.get();
      const Modeling = this.bpmnModeler.get('modeling');
      if (!SelectedElements || SelectedElements.length < 1) {
        this.$message.warning("请按住 Shift 键至少选择一个元素");
        return;
      }
      let newSelectedElements = SelectedElements.map(item => [item])
      newSelectedElements.forEach(item => {
        Modeling.removeElements(item)
      })
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
  height: 55px;
  display: flex;
  padding-left: 10px;
  // background-color: #323232;
  // color: white;
  .saveBtnStyle {
    display: flex;
    margin-left: 50px;
    margin-top: 7px;
    height: 35px;
    .saveBtnItem {
      margin-right: 10px;
      background: #00b8a4;
      color: #fff;
    }
  }
}
</style>
