import { assign } from 'min-dash'

/**
 * A palette provider for BPMN 2.0 elements.
 */
export default function PaletteProvider(
  palette,
  create,
  elementFactory,
  spaceTool,
  lassoTool,
  handTool,
  globalConnect,
  translate
) {
  this._palette = palette
  this._create = create
  this._elementFactory = elementFactory
  this._spaceTool = spaceTool
  this._lassoTool = lassoTool
  this._handTool = handTool
  this._globalConnect = globalConnect
  this._translate = translate

  palette.registerProvider(this)
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate',
]

PaletteProvider.prototype.getPaletteEntries = function (element) {
  var actions = {},
    create = this._create,
    elementFactory = this._elementFactory,
    spaceTool = this._spaceTool,
    lassoTool = this._lassoTool,
    handTool = this._handTool,
    globalConnect = this._globalConnect,
    translate = this._translate

  function createAction(type, group, className, title, imageUrl = '') {
    function createListener(event) {
      // var shape = elementFactory.createShape(assign({ type: type }, options))
      var shape = elementFactory.createShape({ type: type })

      // if (options) {
      //   shape.businessObject.di.isExpanded = options.isExpanded
      // }

      create.start(event, shape)
    }

    var shortType = type.replace(/^bpmn:/, '')
    let config = {
      group: group,
      className: className,
      title: title || translate('Create {type}', { type: shortType }),
      action: {
        dragstart: createListener,
        click: createListener,
      },
    }
    if (imageUrl) {
      assign(config, {
        imageUrl,
      })
    }
    return config
  }

  assign(actions, {
    'tool-title': {
      //工具分割线
      group: 'tools',
      titleName: 'Drag components',
    },
    'hand-tool': {
      //抓手工具
      group: 'tools',
      className: '',
      title: translate('Hand'),
      action: {
        click: function (event) {
          handTool.activateHand(event)
        },
      },
      imageUrl: require('../img/dragW2x.png'),
    },
    'lasso-tool': {
      //索套工具
      group: 'tools',
      className: '',
      title: translate('Group'),
      action: {
        click: function (event) {
          lassoTool.activateSelection(event)
        },
      },
      imageUrl: require('../img/groupW2x.png'),
    },
    'global-connect-tool': {
      //全局连接工具
      group: 'tools',
      className: '',
      title: translate('Connect'),
      action: {
        click: function (event) {
          globalConnect.toggle(event)
        },
      },
      imageUrl: require('../img/connectW2x.png'),
    },
    'tool-separator': {
      //工具分割线
      group: 'tools',
      separator: true,
    },
    'task-title': {
      //工具分割线
      group: 'tools',
      titleName: 'Process components',
    },
    'create.start-event': createAction(
      //开始事件
      'bpmn:StartEvent',
      'event',
      'bpmn-customIcon-start',
      translate('开始'),
      require('../img/start2x.png')
    ),
    'create.end-event': createAction(
      //结束事件
      'bpmn:EndEvent',
      'event',
      'bpmn-customIcon-end',
      translate('结束'),
      require('../img/endW2x.png')
    ),
    // 'create.exclusive-gateway': createAction(
    //   //互斥网关
    //   'bpmn:ExclusiveGateway',
    //   'gateway',
    //   'bpmn-icon-gateway-xor',
    //   translate('Create ExclusiveGateway')
    // ),
    'create.parallel-gateway': createAction(
      //并行网关
      'bpmn:ParallelGateway',
      'gateway',
      'bpmn-customIcon-collection',
      translate('汇集'),
      require('../img/collectionW2x.png')
    ),
    // 'create.inclusive-gateway': createAction(
    //   //相容网关
    //   'bpmn:InclusiveGateway',
    //   'gateway',
    //   'bpmn-icon-gateway-or',
    //   translate('Create InclusiveGateway')
    // ),
    // 'create.complex-gateway': createAction(
    //   //复杂网关
    //   'bpmn:ComplexGateway',
    //   'gateway',
    //   'bpmn-icon-gateway-complex',
    //   translate('Create ComplexGateway')
    // ),
    // 'create.event-based-gateway': createAction(
    //   //事件网关
    //   'bpmn:EventBasedGateway',
    //   'gateway',
    //   'bpmn-icon-gateway-eventbased',
    //   translate('Create EventbasedGateway')
    // ),
    // 'gateway-separator': {
    //   //网关分割线
    //   group: 'gateways',
    //   separator: true,
    // },
    // 'create.task': createAction(
    //   //空白任务
    //   'bpmn:Task',
    //   'activity',
    //   'bpmn-icon-task',
    //   translate('Create Task')
    // ),
    // 'create.user-task': createAction(
    //   //用户任务
    //   'bpmn:UserTask',
    //   'activity',
    //   'bpmn-icon-user-task',
    //   translate('Create UserTask')
    // ),
    // 'create.send-task': createAction(
    //   //发送任务
    //   'bpmn:SendTask',
    //   'activity',
    //   'bpmn-icon-send-task',
    //   translate('Create SendTask')
    // ),
    // 'create.receive-task': createAction(
    //   //接收任务
    //   'bpmn:ReceiveTask',
    //   'activity',
    //   'bpmn-icon-receive-task',
    //   translate('Create ReceiveTask')
    // ),
    // 'create.business-rule-task': createAction(
    //   //业务规则任务
    //   'bpmn:BusinessRuleTask',
    //   'activity',
    //   'bpmn-icon-business-rule-task',
    //   translate('Create BusinessRuleTask')
    // ),
    // 'create.service-task': createAction(
    //   //服务任务
    //   'bpmn:ServiceTask',
    //   'activity',
    //   'bpmn-icon-service-task',
    //   translate('Create ServiceTask')
    // ),
    // 'create.script-task': createAction(
    //   //脚本任务
    //   'bpmn:ScriptTask',
    //   'activity',
    //   'bpmn-icon-script-task',
    //   translate('Create ScriptTask')
    // ),
    // 'create.manual-task': createAction(
    //   //手工任务
    //   'bpmn:ManualTask',
    //   'activity',
    //   'bpmn-icon-manual-task',
    //   translate('Create ManualTask')
    // ),
    // 'create.call-activity': createAction(
    //   //调用活动
    //   'bpmn:CallActivity',
    //   'activity',
    //   'bpmn-icon-call-activity',
    //   translate('Create CallActivityTask')
    // ),
    // 'create.subprocess-expanded': {
    //   //创建子流程（展开的）
    //   group: 'activity',
    //   className: 'bpmn-icon-subprocess-expanded',
    //   title: translate('Create SubProcessExpanded'),
    //   action: {
    //     dragstart: createSubprocess,
    //     click: createSubprocess,
    //   },
    // },
    // 'task-separator': {
    //   //任务分割线
    //   group: 'tasks',
    //   separator: true,
    // },
    // 'create.data-object': createAction(
    //   //数据对象
    //   'bpmn:DataObjectReference',
    //   'data-object',
    //   'bpmn-icon-data-object',
    //   translate('Create DataObjectReference')
    // ),

    // 'create.data-store': createAction(
    //   //数据存储引用
    //   'bpmn:DataStoreReference',
    //   'data-store',
    //   'bpmn-icon-data-store',
    //   translate('Create DataStoreReference')
    // ),

    // 'create.participant-expanded': {
    //   //池/参与者
    //   group: 'collaboration',
    //   className: 'bpmn-icon-participant',
    //   title: translate('Create Pool/Participant'),
    //   action: {
    //     dragstart: createParticipant,
    //     click: createParticipant,
    //   },
    // },
    // 'create.group': createAction(
    //   //组
    //   'bpmn:Group',
    //   'artifact',
    //   'bpmn-icon-group',
    //   translate('Create Group')
    // ),
  })

  return actions
}
