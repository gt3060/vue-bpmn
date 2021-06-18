<template>
  <div
    class="property-panel"
    ref="properComp"
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
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="节点内容">
        <el-input
          v-model="form.value"
          @input="valueChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="节点颜色">
        <el-color-picker
          v-model="form.color"
          @active-change="colorChange"
        ></el-color-picker>
      </el-form-item>
      <template v-if="!sequenceFlow">
        <el-form-item label="节点长度">
          <el-input
            v-model="form.width"
            @input="widthChange"
          ></el-input>
        </el-form-item>
        <el-form-item label="节点宽度">
          <el-input
            v-model="form.height"
            @input="heightChange"
          ></el-input>
        </el-form-item>
      </template>
      <el-button @click="handleLeft('left')">左对齐</el-button>
      <el-button @click="handleLeft('right')">右对齐</el-button>
      <el-button @click="handleLeft('top')">上对齐</el-button>
      <el-button
        @click="handleLeft('bottom')"
        style="margin-top:12px"
      >下对齐</el-button>
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
    }
  },
  computed: {
    userTask () {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:UserTask";
    },
    sequenceFlow () {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:SequenceFlow";
    }
  },
  data () {
    return {
      form: {
        id: "",
        name: "",
        color: "",
        value: '',
        width: '',
        height: ''
      },
      element: {},
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
      nameSplit: []
    };
  },
  mounted () {
    this.handleModeler();
  },
  watch: {
    element: {
      handler (newVal, oldVal) {
        console.log("++++element监听", newVal, this.nameSplit, this.flag, !this.sequenceFlow, this.form);
        if (!this.form.name) {
          if (this.flag && !this.sequenceFlow) {
            let tempS = localStorage.getItem('infoType');
            localStorage.removeItem('infoType');
            let val = '';
            switch (tempS) {
              case '2':
                val = '获取物料';
                break;
              case '3':
                val = '输入物料';
                break;
              case '4':
                val = '启动定时器';
                break;
            }
            this.nameChange(val);
            this.flag = false;
          }
        } else {
          if (this.nameSplit.length > 1) {
            this.valueChange(this.nameSplit[1]);
          } else {
            let value = this.isEmpty(this.nameSplit[0])
            this.nameChange(value);
          }
        }
      },
      deep: true
    },
  },
  methods: {
    handleModeler () {
      // 监听节点选择变化
      this.modeler.on("selection.changed", e => {
        const element = e.newSelection[0];
        this.element = element;
        console.log('---selection.changed', element, this.form);
        if (this.element) {
          // console.log(this.element.id);
        } else {
          // console.log(this.element);
        }
        if (!element) return;
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        };
        if (element.businessObject.name && element.id === this.form.id) {
          this.nameSplit = element.businessObject.name.split('：');
          this.form.name = this.isEmpty(this.nameSplit[0]);
          console.log('+++++element存在2', this.nameSplit, JSON.parse(JSON.stringify(this.form)));
          this.form.value = this.isEmpty(this.nameSplit[1]);
        }
        if (this.form.userType === "candidateUsers") {
          this.form["candidateUsers"] =
            this.form["candidateUsers"].split(",") || [];
        }
      });
      //  监听节点属性变化
      this.modeler.on("element.changed", e => {
        const { element } = e;
        if (element.__proto__.constructor.name !== 'Connection') {
          this.flag = true;
        }
        console.log('---element.changed', element, this.form, element.__proto__.constructor.name)
        if (!element) return;
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id && element.businessObject.name) {
          let nameArr = element.businessObject.name.split('：');
          this.form.name = this.isEmpty(nameArr[0]);
          this.form.value = this.isEmpty(nameArr[1]);
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
    nameChange (name) {
      const modeling = this.modeler.get("modeling");
      if (this.element) {
        modeling.updateLabel(this.element, name);
      }
    },
    valueChange (value) {
      // this.form.value = value;
      const modeling = this.modeler.get("modeling");
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
          fill: null,
          stroke: color
        });
        modeling.updateProperties(this.element, { color: color });
      }
    },
    // 属性节点宽度
    widthChange () {
      if (this.element) {

      }
    },
    // 属性节点高度
    heightChange () {
      if (this.element) {

      }
    },
    // 左对齐
    handleLeft (align) {
      const Selection = this.modeler.get("selection");
      const SelectedElements = Selection.get();
      const AlignElements = this.modeler.get("alignElements");
      console.log('----SelectedElemtns', SelectedElements)
      if (!SelectedElements || SelectedElements.length <= 1) {
        this.$message.warning("请按住 Ctrl/Shift 键选择多个元素对齐");
        return;
      }
      this.$confirm("自动对齐可能造成图形变形，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => AlignElements.trigger(SelectedElements, align));
    },
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
  width: 300px;
  height: 100%;
}
</style>