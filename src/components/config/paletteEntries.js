import { is } from 'bpmn-js/lib/util/ModelUtil'
import { assign } from 'min-dash'
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg'

let TASK_BORDER_RADIUS = 12

export default {
  'create.start-event': createAction(
    'bpmn:StartEvent',
    'event',
    'bpmn-icon-start-event-none',
    'Create StartEvent',
    '',
    drawShape // 📌
  ),
  // 'create.task': createAction(
  //   'bpmn:Task',
  //   'activity',
  //   'bpmn-icon-task-custom', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
  //   'Create Task',
  //   require('../img/task.png'),
  //   drawShape // 📌
  // ),
  'create.gttest': createAction(
    'bpmn:Task',
    'event',
    'bpmn-icon-start-event-none',
    '创建',
    '',
    drawShape,
    '1'
  ),
  'create.gttest1': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '任务',
    require('../img/task.png'),
    drawShape, // 📌
    '2'
  ),
  'create.gttest2': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '任务2',
    require('../img/task.png'),
    drawShape, // 📌x
    '3'
  ),
  'create.gttest3': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttes5': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttes4': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttes23': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttes2': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttes1': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),

  'create.gttest8': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttest7': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttest6': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttest5': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.gttest4': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '启动定时器',
    require('../img/task.png'),
    drawShape, // 📌
    '4'
  ),
  'create.dengyu': createAction(
    'bpmn:IntermediateThrowEvent',
    'event',
    'bpmn-icon-start-event-none', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '并发',
    '',
    drawShape,
    '6'
  ),
  'create.init-task': createAction(
    'bpmn:signalEventDefinition',
    'event',
    'bpmn-icon-start-event-none',
    '并发1',
    '',
    drawShape,
    '7'
  ),
}

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
    localStorage.setItem('infoType', infoType)
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
  if (!customShapeArr.includes(element.type)) {
    shape = bpmnRenderer.drawShape(parentNode, element)
  } else {
    shape = null
  }
  // let color = ''
  console.log('+bpmnbpmn:Data++++', bpmnRenderer, shape, element)
  if (is(element, 'bpmn:Task')) {
    let name =
      element.businessObject.name && element.businessObject.name.split('：')[0]
    const height = 80
    const width = 100
    element.width = width
    element.height = height
    if (name) {
      let inColor = ''
      if (name === '获取物料') {
        inColor = 'blue'
        let rect1 = drawCircle(parentNode, 12, 12, inColor)
        svgAttr(rect1, {
          transform: 'translate(75, 10)',
        })
        prependTo(rect1, parentNode)
        TASK_BORDER_RADIUS = 12
      } else if (name === '输入物料') {
        inColor = 'red'
        let rect1 = drawCircle(parentNode, 12, 12, inColor)
        svgAttr(rect1, {
          transform: 'translate(75, 10)',
        })
        prependTo(rect1, parentNode)
        TASK_BORDER_RADIUS = 0
      } else {
        TASK_BORDER_RADIUS = 12
      }
    }

    let rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS)
    prependTo(rect, parentNode)
    svgRemove(shape)
    return shape
  }
  if (is(element, 'bpmn:IntermediateThrowEvent')) {
    shape = drawLine(parentNode, 10, 300, 'black')
    shape = drawLine(parentNode, 20, 300, 'black')
    return shape
  }
  return shape
}

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js

// 自定义画椭圆
function drawCircle(parentNode, width, height, strokeColor) {
  var cx = width / 2,
    cy = height / 2

  var circle = svgCreate('circle')
  svgAttr(circle, {
    cx: cx,
    cy: cy,
    r: Math.round((width + height) / 4),
    fill: strokeColor || '#000',
  })

  svgAppend(parentNode, circle)

  return circle
}

// 自定义画直线
function drawLine(parentNode, height, length, strokeColor) {
  let line = svgCreate('line')
  svgAttr(line, {
    x1: 10,
    y1: height,
    x2: length + 10,
    y2: height,
    stroke: strokeColor || '#000',
    strokeWidth: 2,
  })
  svgAppend(parentNode, line)
  return line
}

// 自定义画矩形
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
  const rect = svgCreate('rect')

  svgAttr(rect, {
    width: width,
    height: height,
    rx: borderRadius,
    ry: borderRadius,
    stroke: strokeColor || '#000',
    strokeWidth: 2,
    fill: '#fff',
  })

  svgAppend(parentNode, rect)

  return rect
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild)
}
