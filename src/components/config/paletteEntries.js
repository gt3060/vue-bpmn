import { is } from 'bpmn-js/lib/util/ModelUtil'
import { assign } from 'min-dash'
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg'
import {
  drawLine,
  drawCircle,
  drawRect,
  drawDiamond,
  drawPath,
  drawHorizonLine,
  drawEllipse,
} from '../utils'

let TASK_BORDER_RADIUS = 12
function createAction(
  type,
  group,
  className,
  title,
  imageUrl = '',
  drawShape,
  infoType = ''
) {
  // 还记得 CustomPalette.js 吗？便是这里回调 createListener 函数
  // if (action === 'click') {
  // handler(originalEvent, autoActivate, elementFactory, create)
  // }
  console.log('typetypetypeytpe', type, group, className, infoType)
  function createListener(event, autoActivate, elementFactory, create) {
    console.log(
      '++++elementfactory*****************',
      elementFactory,
      type,
      infoType
    )
    localStorage.setItem('infoType', title)
    let isCustomShape = ['bpmn:IntermediateThrowEvent']
    var shape
    if (isCustomShape.includes(type)) {
      let width, height
      if (type === 'bpmn:IntermediateThrowEvent') {
        width = 330
        height = 30
      }
      shape = elementFactory.createShape({
        type,
        width,
        height,
      })
    } else if (infoType === '5') {
      let width, height
      width = 120
      height = 100
      shape = elementFactory.createShape({
        type,
        width,
        height,
      })
    } else {
      shape = elementFactory.createShape({
        type,
      })
    }
    create.start(event, shape)
  }

  const config = {
    type, // 📌
    group: group,
    className: className,
    title: title,
    drawShape: drawShape, // 📌
    action: {
      dragstart: createListener,
      click: createListener,
    },
    infoType,
  }
  if (imageUrl) {
    assign(config, {
      imageUrl,
    })
  }
  if (drawShape) {
    assign(config, {
      drawShape,
    })
  }

  return config
}

// svg图形构造
function drawShape(parentNode, element, bpmnRenderer) {
  let shape
  let customShapeArr = ['bpmn:IntermediateThrowEvent']
  let name =
    element.businessObject.name && element.businessObject.name.split('：')[0]
  if (!customShapeArr.includes(element.type)) {
    shape = bpmnRenderer.drawShape(parentNode, element)
  } else {
    shape = null
  }
  console.log('+bpmnbpmn:Data++++', bpmnRenderer, shape, element)
  if (is(element, 'bpmn:Task')) {
    let height = 80
    let width = 100
    // 过程组件
    let processComp = ['物料输入', '输入物料', '物料变更', '数据计算']
    // 输入/输出组件
    let inOutputComp = [
      '物料输出',
      '输入输出',
      '获取物料',
      '物料释放',
      '数据输入',
      '数据输出',
    ]
    // 预处理组件
    let pretreatmentComp = ['新建变量']
    if (name) {
      let inColor = ''
      if (name === '获取物料1') {
        inColor = 'blue'
        let rect1 = drawEllipse(parentNode, 12, 12, inColor)
        svgAttr(rect1, {
          transform: `translate(${element.width - 25}, 10)`,
        })
        prependTo(rect1, parentNode)
        TASK_BORDER_RADIUS = 12
        let rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS)
        prependTo(rect, parentNode)
        svgRemove(shape)
        element.width = width
        element.height = height
        return shape
      } else if (processComp.includes(name)) {
        inColor = 'red'
        let rect1 = drawEllipse(parentNode, 12, 12, inColor)
        svgAttr(rect1, {
          transform: `translate(${element.width - 25}, 10)`,
        })
        prependTo(rect1, parentNode)
        TASK_BORDER_RADIUS = 0
        let rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS)
        prependTo(rect, parentNode)
        svgRemove(shape)
        element.width = width
        element.height = height
        return shape
      } else if (name === '循环') {
        svgAttr(shape, {
          stroke: 'white',
        })
        let d = `M100 80 L0 80 L0 0 L100 0 L100 60 L110 52 L100 60 L90 52 L100 61`
        let rect = drawPath(parentNode, d)
        element.width = width
        element.height = height
        return rect
      } else if (name === '判断') {
        svgAttr(shape, {
          stroke: 'white',
        })
        let rect = drawDiamond(parentNode, width, height)
        element.width = width
        element.height = height
        return rect
      } else if (name === '等待') {
        height = 100
        svgAttr(shape, {
          stroke: 'white',
        })
        let d = `M50 0 A50 50 0 1  1 0 50`
        let rect = drawPath(parentNode, d, 'black')
        let point = [Math.floor(width / 2), Math.floor(height / 2)]
        let length = Math.floor(width / 2)
        let attrs = {
          strokeDasharray: '2 13',
        }
        rect = drawCircle(parentNode, point, length, attrs)
        element.width = width
        element.height = height
        return rect
      } else if (pretreatmentComp.includes(name)) {
        TASK_BORDER_RADIUS = 0
        width = 200
        let rect = drawHorizonLine(parentNode, 10, 80, 'black')
        rect = drawHorizonLine(parentNode, width - 10, 80, 'black')
        rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS)
        prependTo(rect, parentNode)
        svgRemove(shape)
        element.width = width
        element.height = height
        return shape
      } else if (inOutputComp.includes(name)) {
        width = 120
        svgAttr(shape, {
          stroke: 'white',
        })
        let d = `M0 0 L100 0 Q140 40, 100 80 L0 80 Q 40 40, 0 0`
        let rect = drawPath(parentNode, d)
        element.width = width
        element.height = height
        return rect
      } else if (name === '人工输入') {
        svgAttr(shape, {
          stroke: 'white',
        })
        let d = `M0 20 L100 0 L100 80 L0 80 Z`
        let rect = drawPath(parentNode, d)
        element.width = width
        element.height = height
        return rect
      } else {
        TASK_BORDER_RADIUS = 12
        let rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS)
        prependTo(rect, parentNode)
        svgRemove(shape)
        element.width = width
        element.height = height
        return shape
      }
    }
  }
  if (is(element, 'bpmn:IntermediateThrowEvent')) {
    shape = drawLine(parentNode, 10, 300, 'black')
    shape = drawLine(parentNode, 20, 300, 'black')
    return shape
  }
  console.log('---最终渲染shape', shape)
  return shape
}

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild)
}

let actionZh = [
  '循环',
  '判断',
  '等待',
  '物料输入',
  '物料输出',
  '获取物料',
  '物料释放',
  '物料变更',
  '新建变量',
  '数据计算',
  '数据输入',
  '数据输出',
  '输入输出',
  '人工输入',
]
let actionArr = actionZh

let exportPalette = {
  'create.dengyu': createAction(
    'bpmn:IntermediateThrowEvent',
    'event',
    'bpmn-customIcon-collect', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '并行',
    require('../img/collectW2x.png'),
    drawShape
  ),
  'create.gttes5': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[0],
    require('../img/loopW2x.png'),
    drawShape // 📌
  ),
  'create.gttes4': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[1],
    require('../img/judgmentW2x.png'),
    drawShape // 📌
  ),
  'create.gttes23': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[2],
    require('../img/waitW2x.png'),
    drawShape // 📌
  ),
  'material-separator': {
    group: 'activity',
    separator: true,
  },
  'material-title': {
    group: 'activity',
    titleName: 'Material management',
  },
  'create.enter': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[3],
    require('../img/materialEnterW2x.png'),
    drawShape, // 📌
    'materialEnter'
  ),
  'create.output': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[4],
    require('../img/materialOutputW2x.png'),
    drawShape // 📌
  ),
  'create.obtain': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[5],
    require('../img/obtainW2x.png'),
    drawShape // 📌
  ),
  'create.release': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[6],
    require('../img/freedW2x.png'),
    drawShape // 📌
  ),
  'create.change': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[7],
    require('../img/changeW2x.png'),
    drawShape // 📌
  ),
  'data-separator': {
    group: 'activity',
    separator: true,
  },
  'data-title': {
    group: 'activity',
    titleName: 'Data manipulation',
  },
  'create.newvariable': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[8],
    require('../img/newVariableW2x.png'),
    drawShape // 📌
  ),
  'create.dataCalculation': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[9],
    require('../img/calculationW2x.png'),
    drawShape // 📌x
  ),
  'create.dataInput': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[10],
    require('../img/dataInputW2x.png'),
    drawShape // 📌
  ),
  'create.dataOutput  ': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[11],
    require('../img/dataOutputW2x.png'),
    drawShape // 📌
  ),
  'dat1-separator': {
    group: 'activity',
    separator: true,
  },
  'data1-title': {
    group: 'activity',
    titleName: 'Data manipulation',
  },

  'create.gttes1': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[12],
    require('../img/task.png'),
    drawShape // 📌
  ),
  'create.gttest8': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    actionArr[13],
    require('../img/task.png'),
    drawShape // 📌
  ),
  'all-separator': {
    group: 'activity',
    separator: true,
  },
}
export default exportPalette
