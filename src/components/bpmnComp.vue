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
      <properComp :modeler="viewer"></properComp>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler' // 引入 bpmn-js
import paletteEntries from './config/paletteEntries'
import customRenderer from './renderer'
import customPalette from './palette'
import customContextPad from './contextPad'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import propertiesPanelModule from 'bpmn-js-properties-panel'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import properComp from './properComp'
import CustomModeler from './customModeler'

export default {
  name: 'bpmn',
  data () {
    return {
      viewer: null
    }
  },
  components: {
    properComp
  },
  mounted () {
    const canvas = this.$refs.canvas;
    // // // 去除默认工具栏  -- 如果不去除默认工具栏，渲染会出现两个工具栏重叠
    // const modules = BpmnModeler.prototype._modules
    // const index = modules.findIndex(it => it.paletteProvider);
    // modules.splice(index, 1, customPalette);
    console.log('modules', BpmnModeler.prototype._modules)
    let contextPadProvider = ['value', ''];

    // 生成实例
    this.viewer = new BpmnModeler({
      // this.viewer = new CustomModeler({
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
        customContextPad,
        customRenderer,
        customPalette,
        contextPadProvider
      ],
      // additionalModules: [{
      //   // contextPadProvider: ['value', ''],
      // }],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })
    console.log('this.viewer.additionalModules', this.viewer.additionalModules)
    this.createNewDiagram() // 新增流程定义
  },
  methods: {
    createNewDiagram () {
      // const bpmnXmlStr = `
      // <?xml version="1.0" encoding="UTF-8"?>
      // <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0qnjqfg" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="8.6.0">
      //   <bpmn:process id="Process_0coajcg" isExecutable="false">
      //     <bpmn:startEvent id="StartEvent_1abk3p9">
      //       <bpmn:outgoing>Flow_0bc06np</bpmn:outgoing>
      //       <bpmn:outgoing>Flow_0x6glee</bpmn:outgoing>
      //     </bpmn:startEvent>
      //     <bpmn:startEvent id="Event_1fpqthn" />
      //     <bpmn:intermediateThrowEvent id="Event_065tw9n">
      //       <bpmn:incoming>Flow_0x6glee</bpmn:incoming>
      //       <bpmn:outgoing>Flow_09whvvh</bpmn:outgoing>
      //     </bpmn:intermediateThrowEvent>
      //     <bpmn:exclusiveGateway id="Gateway_08u18p2" />
      //     <bpmn:task id="Activity_0v0uv0w" />
      //     <bpmn:task id="Activity_12putzz" />
      //     <bpmn:exclusiveGateway id="Gateway_1bgpsze" />
      //     <bpmn:dataStoreReference id="DataStoreReference_057af40" />
      //     <bpmn:subProcess id="Activity_18snyzv">
      //       <bpmn:startEvent id="Event_1gfpg1e">
      //         <bpmn:outgoing>Flow_1lq72zz</bpmn:outgoing>
      //       </bpmn:startEvent>
      //       <bpmn:intermediateThrowEvent id="Event_062je3y">
      //         <bpmn:incoming>Flow_1lq72zz</bpmn:incoming>
      //       </bpmn:intermediateThrowEvent>
      //       <bpmn:sequenceFlow id="Flow_1lq72zz" sourceRef="Event_1gfpg1e" targetRef="Event_062je3y" />
      //       <bpmn:textAnnotation id="TextAnnotation_1ieu9lj">
      //         <bpmn:text>111111111111234</bpmn:text>
      //       </bpmn:textAnnotation>
      //       <bpmn:association id="Association_1hqsewu" sourceRef="Event_1gfpg1e" targetRef="TextAnnotation_1ieu9lj" />
      //     </bpmn:subProcess>
      //     <bpmn:subProcess id="Activity_1cmnuh9" />
      //     <bpmn:endEvent id="Event_08z5ug6">
      //       <bpmn:incoming>Flow_09whvvh</bpmn:incoming>
      //       <bpmn:incoming>Flow_0bc06np</bpmn:incoming>
      //     </bpmn:endEvent>
      //     <bpmn:sequenceFlow id="Flow_09whvvh" sourceRef="Event_065tw9n" targetRef="Event_08z5ug6" />
      //     <bpmn:sequenceFlow id="Flow_0bc06np" sourceRef="StartEvent_1abk3p9" targetRef="Event_08z5ug6" />
      //     <bpmn:sequenceFlow id="Flow_0x6glee" sourceRef="StartEvent_1abk3p9" targetRef="Event_065tw9n" />
      //     <bpmn:textAnnotation id="TextAnnotation_0xu4iim" />
      //     <bpmn:association id="Association_1tze60u" sourceRef="DataStoreReference_057af40" targetRef="TextAnnotation_0xu4iim" />
      //     <bpmn:association id="Association_0p3lpg6" sourceRef="TextAnnotation_0xu4iim" targetRef="DataStoreReference_057af40" />
      //   </bpmn:process>
      //   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      //     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0coajcg">
      //       <bpmndi:BPMNShape id="TextAnnotation_0xu4iim_di" bpmnElement="TextAnnotation_0xu4iim">
      //         <dc:Bounds x="200" y="330" width="100" height="30" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNEdge id="Flow_09whvvh_di" bpmnElement="Flow_09whvvh">
      //         <di:waypoint x="948" y="300" />
      //         <di:waypoint x="1002" y="300" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge id="Flow_0bc06np_di" bpmnElement="Flow_0bc06np">
      //         <di:waypoint x="852" y="219" />
      //         <di:waypoint x="970" y="219" />
      //         <di:waypoint x="970" y="300" />
      //         <di:waypoint x="1002" y="300" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge id="Flow_0x6glee_di" bpmnElement="Flow_0x6glee">
      //         <di:waypoint x="852" y="219" />
      //         <di:waypoint x="882" y="219" />
      //         <di:waypoint x="882" y="300" />
      //         <di:waypoint x="912" y="300" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNShape id="DataStoreReference_09ozzh2_di" bpmnElement="DataStoreReference_057af40">
      //         <dc:Bounds x="155" y="415" width="50" height="50" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1abk3p9">
      //         <dc:Bounds x="816" y="201" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Event_1fpqthn_di" bpmnElement="Event_1fpqthn">
      //         <dc:Bounds x="832" y="312" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Event_065tw9n_di" bpmnElement="Event_065tw9n">
      //         <dc:Bounds x="912" y="282" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Gateway_08u18p2_di" bpmnElement="Gateway_08u18p2" isMarkerVisible="true">
      //         <dc:Bounds x="1145" y="275" width="50" height="50" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Activity_0v0uv0w_di" bpmnElement="Activity_0v0uv0w">
      //         <dc:Bounds x="1350" y="280" width="100" height="80" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Activity_12putzz_di" bpmnElement="Activity_12putzz">
      //         <dc:Bounds x="1740" y="280" width="100" height="80" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Event_08z5ug6_di" bpmnElement="Event_08z5ug6">
      //         <dc:Bounds x="1002" y="282" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Gateway_1bgpsze_di" bpmnElement="Gateway_1bgpsze" isMarkerVisible="true">
      //         <dc:Bounds x="1315" y="475" width="50" height="50" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNEdge id="Association_1tze60u_di" bpmnElement="Association_1tze60u">
      //         <di:waypoint x="198" y="415" />
      //         <di:waypoint x="239" y="360" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNEdge id="Association_0p3lpg6_di" bpmnElement="Association_0p3lpg6">
      //         <di:waypoint x="239" y="360" />
      //         <di:waypoint x="200" y="415" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNShape id="Activity_18snyzv_di" bpmnElement="Activity_18snyzv" isExpanded="true">
      //         <dc:Bounds x="340" y="270" width="350" height="310" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="TextAnnotation_1ieu9lj_di" bpmnElement="TextAnnotation_1ieu9lj">
      //         <dc:Bounds x="510" y="330" width="100" height="171.42857142857144" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNEdge id="Flow_1lq72zz_di" bpmnElement="Flow_1lq72zz">
      //         <di:waypoint x="490" y="448" />
      //         <di:waypoint x="490" y="482" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNShape id="Event_062je3y_di" bpmnElement="Event_062je3y">
      //         <dc:Bounds x="472" y="482" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNShape id="Event_1gfpg1e_di" bpmnElement="Event_1gfpg1e">
      //         <dc:Bounds x="472" y="412" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //       <bpmndi:BPMNEdge id="Association_1hqsewu_di" bpmnElement="Association_1hqsewu">
      //         <di:waypoint x="501" y="416" />
      //         <di:waypoint x="510" y="406" />
      //       </bpmndi:BPMNEdge>
      //       <bpmndi:BPMNShape id="Activity_1cmnuh9_di" bpmnElement="Activity_1cmnuh9" isExpanded="true">
      //         <dc:Bounds x="320" y="80" width="350" height="200" />
      //       </bpmndi:BPMNShape>
      //     </bpmndi:BPMNPlane>
      //   </bpmndi:BPMNDiagram>
      // </bpmn:definitions>
      // `
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
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0coajcg">
      <bpmndi:BPMNEdge id="Flow_13cur33_di" bpmnElement="Flow_13cur33">
        <di:waypoint x="230" y="230" />
        <di:waypoint x="230" y="275" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1482bqh_di" bpmnElement="Flow_1482bqh">
        <di:waypoint x="430" y="230" />
        <di:waypoint x="430" y="275" />
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
      this.saveViewer();
    },
    saveViewer () {
      let that = this;
      // try {
      //   this.viewer.saveXML({ format: true }).then(res => {
      //     console.log(res);
      //     // 将xml转换为file
      //     this.xmlSetFile(res);
      //   })
      // } catch (err) {
      //   console.log(err);
      // }
      this.viewer.saveXML({ format: true }, function (err, xml) {
        console.log(err, xml);
        // 将xml转换为file
        that.xmlSetFile(xml);
      })
    },
    xmlSetFile (xml) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(xml);
      // console.log('+++++encodedData',encodedData)
      let xmlFile = new File([xml], 'test.bpmn');
      console.log(xmlFile);
      // bpmn生成下载
      window.open('data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
    },
    success () {
      // 添加绑定事件,
      this.viewer.on('commandStack.changed', () => {
        this.saveDiagram((err, xml) => {
          console.log(err, xml);
        })
      })

      // 判断拖拽是点击还是拖拽
      // const eventBus = this.viewer.get('eventBus')
      // // 注册节点事件，eventTypes中可以写多个事件
      // const eventTypes = ['element.click', 'element.hover']
      // eventTypes.forEach((eventType) => {
      //   eventBus.on(eventType, (e) => {
      //     const { element } = e
      //     if (!element.parent) return
      //     if (!e || element.type === 'bpmn:Process') {
      //       return false
      //     } else {
      //       if (eventType === 'element.click') {
      //         // 节点点击后想要做的处理
      //         // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
      //         this.currentElement = element
      //         // console.log(element);
      //         // console.log('this.viewer', this.viewer.get('elementRegistry'));
      //       } else if (eventType === 'element.hover') {
      //         // 鼠标滑过节点后想要做的处理
      //         console.log('鼠标经过节点啦~')
      //       }
      //     }
      //   })
      // })
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
  // border: 1px solid black;
  // overflow: scroll;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .bjs-powered-by {
    display: none;
  }
}
</style>
