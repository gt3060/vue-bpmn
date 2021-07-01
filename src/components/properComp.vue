<template>
  <div
    ref="properComp"
    class="property-panel"
  >
    <el-form
      :inline="true"
      :model="form"
      label-width="100px"
      size="small"
    >
      <el-form-item label="节点ID">
        <el-input
          v-model="form.id"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input
          v-model="form.name"
          :disabled="Task"
          @input="nameChange"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="节点内容"
        v-if="Task"
      >
        <el-input
          type="textarea"
          v-model="form.value"
          @input="valueChange"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="节点颜色">
        <el-color-picker
          v-model="form.color"
          @active-change="colorChange"
        ></el-color-picker>
      </el-form-item> -->
      <template v-if="!sequenceFlow">
        <el-form-item label="节点长度">
          <el-input
            v-model="form.width"
            @change="widthChange"
          ></el-input>
        </el-form-item>
        <el-form-item label="节点宽度">
          <el-input
            v-model="form.height"
            @input="heightChange"
          ></el-input>
        </el-form-item>
      </template>
      <!--  <el-button
        @click="processRestart"
        style="margin-top:12px"
      >重新绘制</el-button> -->
      <!-- 任务节点允许选择人员 -->
      <el-form-item
        label="节点人员"
        v-if="!userTask"
      >
        <el-select
          v-model="form.userType"
          placeholder="请选择"
          @change="typeChange"
        >
          <el-option
            value="assignee"
            label="指定人员"
          ></el-option>
          <el-option
            value="candidateUsers"
            label="候选人员"
          ></el-option>
          <el-option
            value="candidateGroups"
            label="角色/岗位"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 指定人员 -->
      <el-form-item
        label="指定人员"
        v-if="userTask && form.userType === 'assignee'"
      >
        <el-select
          v-model="form.assignee"
          placeholder="请选择"
          key="1"
          @change="(value) => addUser({assignee: value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 候选人员 -->
      <el-form-item
        label="候选人员"
        v-else-if="userTask && form.userType === 'candidateUsers'"
      >
        <el-select
          v-model="form.candidateUsers"
          placeholder="请选择"
          key="2"
          multiple
          @change="(value) => addUser({candidateUsers: value.join(',') || value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 角色/岗位 -->
      <el-form-item
        label="角色/岗位"
        v-else-if="userTask && form.userType === 'candidateGroups'"
      >
        <el-select
          v-model="form.candidateGroups"
          placeholder="请选择"
          @change="(value) => addUser({candidateGroups: value})"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分支允许添加条件 -->
      <el-form-item
        label="分支条件"
        v-if="sequenceFlow"
      >
        <el-select
          v-model="form.user"
          placeholder="请选择"
          @change="(value) => addUser({xxx: value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button size="mini">Save process</el-button>
    <div @contextmenu.prevent="handleRight">单击右键</div>
    <ul
      v-show="visible"
      :style="{left:left+'px',top:top+'px'}"
      class="contextmenu"
    >
      <li>历史记录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProperComp",
  props: {
    modeler: {
      type: Object,
      required: true,
      default: () => { }
    },
  },
  computed: {
    userTask () {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:UserTask";
    },
    Task () {
      if (!this.element) return;
      return this.element.type === "bpmn:Task"
    },
    sequenceFlow () {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:SequenceFlow";
    },
    conCurrent () {
      if (!this.element) return;
      return this.element.type === "bpmn:IntermediateThrowEvent";
    }
  },
  data () {
    return {
      form: {
        id: "",
        name: "",
        color: "",
        value: "",
        width: "",
        height: ""
      },
      inputValue: '',
      element: {},
      direction: 'rtl',
      users: [
        {
          value: "zhangsan",
          label: "张三"
        },
        {
          value: "lisi",
          label: "李四"
        },
        {
          value: "wangwu",
          label: "王五"
        }
      ],
      roles: [
        {
          value: "manager",
          label: "经理"
        },
        {
          value: "personnel",
          label: "人事"
        },
        {
          value: "charge",
          label: "主管"
        }
      ],
      flag: false,
      nameSplit: [],
      visible: false, // 右键弹窗展示、隐藏
      left: 0, // 右键弹窗展示、隐藏
      top: 0, // 右键弹窗展示、隐藏
    };
  },
  mounted () {
    this.handleModeler();
  },
  watch: {
    element: {
      handler (newVal, oldVal) {
        console.log("++++element监听", newVal, this.nameSplit, !this.sequenceFlow, this.form);
        if (!newVal) return;
        if (!this.form.name) {
          let defineTypeCompObj = {
            物料输入: 'maenter',
            输入物料: 'enterma',
            物料变更: 'machange',
            数据计算: 'dataCal',
            物料输出: 'maOutput',
            输入输出: 'inputOut',
            获取物料: 'getMat',
            物料释放: 'maRelease',
            数据输入: 'dataInput',
            数据输出: 'dataOutput'
          }
          let defineTypeCompArr = [
            '物料输入',
            '输入物料',
            '物料变更',
            '数据计算',
            '物料输出',
            '输入输出',
            '获取物料',
            '物料释放',
            '数据输入',
            '数据输出']
          if (!this.sequenceFlow) {
            let tempS = localStorage.getItem('infoType');
            localStorage.removeItem('infoType');
            let val = '';
            val = tempS;

            if (defineTypeCompArr.includes(val)) {
              // const modeling = this.modeler.get('modeling');
              let properties = {
                newType: defineTypeCompObj[val], // 新增属性，在xml文件以新属性展示
              }
              // modeling.updateProperties(this.element, properties)
              this.nameChange(val, properties);
            } else {
              this.nameChange(val);
            }
            this.flag = false;
          }
        } else {
          if (this.nameSplit.length > 1) {
            let value = this.nameSplit[1];
            this.valueChange(value);
          } else {
            let value = this.isEmpty(this.nameSplit[0])
            this.nameChange(value);
          }
        }
      },
      deep: true
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    // 鼠标右键打开列表
    handleRight (e) {
      let event = event || window.event;
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      console.log(maxLeft, offsetLeft, offsetWidth, event)
      const left = event.clientX - offsetLeft // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = event.clientY - 60 // fix 位置bug
      this.visible = true
    },
    // 鼠标右键关闭列表
    closeMenu () {
      this.visible = false
    },
    handleModeler () {
      // let canvas = this.modeler.get('canvas');
      // canvas.resized(e => {
      //   const { element } = e;
      //   console.log("----API属性", e)
      // })
      // 监听节点选择变化
      this.modeler.on("selection.changed", e => {
        this.nameSplit = [];
        const element = e.newSelection[0];
        // this.form = {};
        // console.log("------先前this.form", this.form, element)
        this.element = element;
        if (!element) {
          // this.$emit('changeShowProperty', false)
          return;
        };
        let labelArr = ['Label', 'Connection'];
        let shapType = this.element ? this.element.__proto__.constructor.name : '';
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        };
        if (labelArr.includes(shapType)) {
          this.nameSplit = this.form.name
        }
        console.log('---selection.changed', element, this.form);
        if (element.businessObject.name && element.id === this.form.id) {
          this.nameSplit = element.businessObject.name.split('：');
          this.form.name = this.isEmpty(this.nameSplit[0]);
          console.log('+++++element存在2', this.nameSplit, JSON.parse(JSON.stringify(this.form)));
          this.form.value = this.isEmpty(this.nameSplit[1]);
        }
        // this.updateElement(element);
      });
      //  监听节点属性变化
      this.modeler.on("element.changed", e => {
        this.nameSplit = []
        const { element } = e;
        console.log('---element.changed', element, this.form)
        if (!element) return;
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id && element.businessObject.name) {
          this.nameSplit = element.businessObject.name.split('：');
          this.form.name = this.isEmpty(this.nameSplit[0]);
          this.form.value = this.isEmpty(this.nameSplit[1]);
          this.form = { ...this.form };
        }
      });
    },
    // 判断是否为空
    isEmpty (value) {
      if (value) return value;
      return ''
    },
    // 属性面板名称，更新回流程节点
    nameChange (name, props) {
      if (!this.element) return;
      if (!props) {
        this.updateProperties({ name });
        return;
      } else {
        Object.assign(props, { name });
        this.updateProperties(props)
      }

      // const modeling = this.modeler.get("modeling");
      // if (this.element) {
      // modeling.updateLabel(this.element, name);
      // }
    },
    valueChange (value) {
      const modeling = this.modeler.get("modeling");
      let shapType = this.element ? this.element.__proto__.constructor.name : '';
      let labelArr = ['Label'];
      if (labelArr.includes(shapType)) {
        this.updateProperties({ name: this.form.name });
        return;
      }
      let name = this.form.name;
      if (this.element) {
        if (this.form.name) {
          modeling.updateLabel(this.element, `${name}：${value}`);
        } else {
          modeling.updateLabel(this.element, `${value}`);
        }
      }
    },
    // 属性面板颜色，更新回流程节点
    colorChange (color) {
      if (color && this.element) {
        const modeling = this.modeler.get("modeling");
        modeling.setColor(this.element, {
          stroke: color,
        });
      }
    },
    // 属性节点宽度
    widthChange (value) {
      if (this.element) {
        console.log('+++++this.element', this.element, value);
        let { x, y, width, height } = this.element;
        // this.element.width = value;
        // this.updateProperties({ width: value });
        const modeling = this.modeler.get('modeling');
        let newBounds = {
          x,
          y,
          height,
          width: value
        }
        modeling.resizeShape(this.element, newBounds)
      }
    },
    // 属性节点高度
    heightChange () {
      if (this.element) {

      }
    },

    processRestart () { },
    // 任务节点配置人员
    addUser (properties) {
      this.updateProperties(
        Object.assign(properties, {
          userType: Object.keys(properties)[0]
        })
      );
    },
    // 切换人员类型
    typeChange () {
      const types = ["assignee", "candidateUsers", "candidateGroups"];
      types.forEach(type => {
        delete this.element.businessObject.$attrs[type];
        delete this.form[type];
      });
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties (properties) {
      const modeling = this.modeler.get("modeling");
      modeling.updateProperties(this.element, properties);
    }
  }
}
</script>

<style lang="less" scoped>
.property-panel {
  position: absolute;
  right: 0px;
  top: 0px;
  border-left: 1px solid #cccccc;
  padding: 20px 0;
  width: 18%;
  height: 100%;
  box-shadow: -1px 0 5px #888888;
}
</style>