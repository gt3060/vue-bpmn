// CustomContextPadProvider.js
export default function ContextPadProvider(
  contextPad,
  config,
  injector,
  translate,
  bpmnFactory,
  elementFactory,
  create,
  modeling,
  globalConnect,
  connect
) {
  this.create = create
  this.elementFactory = elementFactory
  this.translate = translate
  this.bpmnFactory = bpmnFactory
  this.modeling = modeling
  this.connect = connect
  this.globalConnect = globalConnect
  config = config || {}
  if (config.autoPlace !== false) {
    this._autoPlace = injector.get('autoPlace', false)
  }
  contextPad.registerProvider(this)
}

ContextPadProvider.$inject = [
  'contextPad',
  'config',
  'injector',
  'translate',
  'bpmnFactory',
  'elementFactory',
  'create',
  'modeling',
  'connect',
  'globalConnect',
]

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const {
    autoPlace,
    create,
    elementFactory,
    translate,
    modeling,
    globalConnect,
    connect,
  } = this
  // 删除功能
  function removeElement(e) {
    modeling.removeElements([element])
  }

  // contextPad删除icon
  function deleteElement() {
    return {
      group: 'edit',
      className: 'bpmn-icon-customdelete',
      title: translate('删除'),
      action: {
        click: removeElement,
      },
    }
  }

  // contextPad连接icon
  function connectElement() {
    return {
      group: 'tools',
      className: 'bpmn-icon-customconnection',
      title: translate('Activate the global connect tool'),
      action: {
        click: function (event, element) {
          globalConnect.start(event, element)
        },
      },
      // imageUrl: require('../../img/connectW2x.png'),
    }
  }

  return {
    // 'append.lindaidai-task': {
    //   group: 'model',
    //   className: 'icon-custom lindaidai-task',
    //   title: translate('创建一个类型为lindaidai-task的任务节点'),
    //   action: {
    //     click: appendTask,
    //     dragstart: appendTaskStart,
    //   },
    // },
    connect: connectElement(),
    delete: deleteElement(),
  }
}
