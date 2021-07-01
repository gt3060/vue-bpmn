<template>
  <div class="containers">
    <div
      class="canvas"
      ref="canvas"
    ></div>
    <!-- <div
      id="js-properties-panel"
      class="panel"
    ></div> -->
    <div v-if="viewer">
      <properComp
        :modeler="viewer"
        @changeShowProperty="changeShowProperty"
      ></properComp>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'; // 引入 bpmn-js
import paletteEntries from './config/paletteEntries';
import customRenderer from './renderer';
import customPalette from './palette';
// import customContextPad from './contextPad';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import properComp from './properComp';
import CustomModeler from './customModeler';
import paletteProvider from './bpmnTools';
import CustomDescriptor from './config/CustomDescriptor.json'
// import diagram from './diagram'

export default {
  name: 'bpmn',
  props: {
  },
  data () {
    return {
      viewer: null,
      isShowProperty: false,
    }
  },
  components: {
    properComp
  },
  mounted () {
    const canvas = this.$refs.canvas;
    // // // 去除默认工具栏  -- 如果不去除默认工具栏，渲染会出现两个工具栏重叠
    // const modules = BpmnModeler.prototype._modules
    // const index = modules.findIndex(it => it.contextPadProvider);
    // modules.splice(index, 1);
    let contextPadProvider = ['value', ''];

    // 生成实例
    // this.viewer = new BpmnModeler({
    this.viewer = new CustomModeler({
      paletteEntries,
      container: canvas,
      keyboard: {
        bindTo: window
      },
      propertiesPanel: {
        // parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesProviderModule,
        propertiesPanelModule,
        // customContextPad,
        customRenderer,
        customPalette,
        contextPadProvider,
        paletteProvider
      ],
      // additionalModules: [{
      //   // contextPadProvider: ['value', ''],
      // }],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
        self: CustomDescriptor
      }
    })
    console.log('this.viewer.additionalModules', this.viewer.additionalModules);
    this.createNewDiagram() // 新增流程定义
    this.$emit('viewer', this.viewer);
  },
  methods: {
    createNewDiagram () {
      const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0qnjqfg" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="8.6.0">
  <bpmn:process id="Process_0coajcg" isExecutable="false">
    <bpmn:task id="Activity_1cojvvu" name="输入物料">
      <bpmn:outgoing>Flow_13cur33</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Activity_1vzyu40" name="获取物料">
      <bpmn:outgoing>Flow_1482bqh</bpmn:outgoing>
    </bpmn:task>
    <bpmn:intermediateThrowEvent id="Event_0tnw83s" name="">
      <bpmn:incoming>Flow_13cur33</bpmn:incoming>
      <bpmn:incoming>Flow_1482bqh</bpmn:incoming>
    </bpmn:intermediateThrowEvent>
    <bpmn:sequenceFlow id="Flow_13cur33" sourceRef="Activity_1cojvvu" targetRef="Event_0tnw83s" />
    <bpmn:sequenceFlow id="Flow_1482bqh" sourceRef="Activity_1vzyu40" targetRef="Event_0tnw83s" />
    <bpmn:parallelGateway id="Gateway_0yokimf" name="" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0coajcg">
      <bpmndi:BPMNEdge id="Flow_1482bqh_di" bpmnElement="Flow_1482bqh">
        <di:waypoint x="430" y="230" />
        <di:waypoint x="430" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_13cur33_di" bpmnElement="Flow_13cur33">
        <di:waypoint x="230" y="230" />
        <di:waypoint x="230" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_1cojvvu_di" bpmnElement="Activity_1cojvvu">
        <dc:Bounds x="180" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1vzyu40_di" bpmnElement="Activity_1vzyu40">
        <dc:Bounds x="380" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0tnw83s_di" bpmnElement="Event_0tnw83s">
        <dc:Bounds x="155" y="275" width="330" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_18598hi_di" bpmnElement="Gateway_0yokimf">
        <dc:Bounds x="295" y="415" width="50" height="50" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
      `
      // 将字符串转换成图显示出来
      try {
        this.viewer.importXML(bpmnXmlStr).then(res => {
          // 流程图自适应屏幕
          this.viewer.get('canvas');
          this.success();
          this.getNewData();
          this.getNodeInfoList();
        })
      } catch (err) {
        console.log(err)
      }
    },

    // 获取流程图中所有节点信息
    getNodeInfoList () {
      const elementRegistry = this.viewer.get('elementRegistry')
      const userTaskList = elementRegistry.filter(
        (item) => item.type === 'bpmn:UserTask'
      )
      // 此时得到的userTaskList 便是流程图中所有的用户节点的集合
      console.log(userTaskList)
    },

    saveBpmn () {
      this.viewer.saveXML({ format: true }, (err, xml) => {
        console.log(err, xml);
        // 将xml转换为file
        let fileName = 'diagram'; // 文件名
        let { href, filename } = this.setEncoded('xml'.toUpperCase(), fileName, xml);
        this.downloadFunc(href, filename);
      })
    },

    // 根据所需类型进行转码并返回下载地址
    // type: xml/svg
    setEncoded (type, filename = "diagram", data) {
      const encodedData = encodeURIComponent(data);
      return {
        filename: `${filename}.${type}`,
        href: `data:application/${type === "svg" ? "text/xml" : "bpmn20-xml"};charset=UTF-8,${encodedData}`,
        data: data
      };
    },

    // 文件下载方法
    downloadFunc (href, filename) {
      if (href && filename) {
        let a = document.createElement("a");
        a.download = filename; //指定下载的文件名
        a.href = href; //  URL对象
        a.click(); // 模拟点击
        URL.revokeObjectURL(a.href); // 释放URL 对象
      }
    },

    success () {
      // 添加绑定事件,
      this.viewer.on('commandStack.changed', () => {
        this.saveDiagram((err, xml) => {
          console.log(err, xml);
        })
      })
      // const modeling = this.modeler.get('modeling');

      // 判断拖拽是点击还是拖拽
      const eventBus = this.viewer.get('eventBus')
      // 注册节点事件，eventTypes中可以写多个事件
      const eventTypes = ['element.click', 'element.hover', 'shape.added']
      eventTypes.forEach((eventType) => {
        eventBus.on(eventType, (e) => {
          const { element } = e;
          if (!element.parent) return;
          if (!e || element.type === 'bpmn:Process') {
            return false
          } else {
            if (eventType === 'element.click') {
              // 节点点击后想要做的处理
              // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
              this.currentElement = element;
              this.isShowProperty = true;
              console.log(element, '---------______________elementClick');
              // console.log('this.viewer', this.viewer.get('elementRegistry'));
            } else if (eventType === 'element.hover') {
              // 鼠标滑过节点后想要做的处理
              // console.log('鼠标经过节点啦~')
            } else if (eventType === 'shape.added') {
              console.log("_______________________新增一个shape节点", element);
              
              // if(element.type === '')
              // let properties = {
              //   newProps: '新增自定义属性', // 新增属性，在xml文件以新属性展示
              //   // this.element.businessObject.$attr.newProps
              // }
              // modeling.updateProperties(this.element, properties)
            }
          }
        })
      })
    },
    changeShowProperty () {
      this.isShowProperty = false;
    },
    saveDiagram (done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      // saveXML需要用try...catch...
      // this.viewer.saveXML({ format: true }, function (err, xml) {
      //   done(err, xml)
      // })
    },
    getNewData () {
      // this.viewer.on('selection.changed', (e) => {
      // console.log('监听e', e);
      // if (e.newSelection[0]) {
      //   e.newSelection[0].id = `test02_${e.newSelection[0].id.split('_')[1]}`
      // }
      // })
    },
  }
}
</script>

<style scoped lang="less">
@import 'bpmn-js/dist/assets/diagram-js.css'; // 左边工具栏以及编辑节点的样式
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
@import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

.containers {
  display: flex;
  // position: absolute;
  background-color: #ffffff;
  width: 80%;
  height: 100vh;
  border-top: 1px solid #f6f8fa;
  // overflow: scroll;
  .canvas {
    width: 100%;
    height: 100%;
    // background: #f6f8fa;
    /deep/ .djs-palette {
      width: 280px;
      overflow-y: auto;
      height: 85%;
      background: white;
    }
    /deep/ .bjs-powered-by {
      display: none;
    }
  }
  .bjs-powered-by {
    display: none;
  }
}
</style>
