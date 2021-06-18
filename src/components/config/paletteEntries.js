import { is } from 'bpmn-js/lib/util/ModelUtil'
import { assign } from 'min-dash'
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg'

const TASK_BORDER_RADIUS = 12

export default {
  'create.start-event': createAction(
    'bpmn:StartEvent',
    'event',
    'bpmn-icon-start-event-none',
    'Create StartEvent',
    '',
    drawShape // 📌
  ),
  'create.task': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    'Create Task',
    require('../img/task.png'),
    drawShape // 📌
  ),
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
    drawShape
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
  console.log(
    'typetypetypeytpe',
    type,
    group,
    className,
    infoType
  )
  function createListener(event, autoActivate, elementFactory, create) {
    console.log('++++elementfactory', elementFactory, type, infoType)
    localStorage.setItem('infoType', infoType)
    var shape
    shape = elementFactory.createShape({
      type,
    })
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

function drawShape(parentNode, element, bpmnRenderer) {
  const shape = bpmnRenderer.drawShape(parentNode, element)
  let color = ''
  if (is(element, 'bpmn:Task')) {
    const height = 80
    const width = 100
    element.width = width
    element.height = height
    const rect = drawRect(parentNode, width, height, TASK_BORDER_RADIUS, color)
    prependTo(rect, parentNode)

    // const circle = drawCircle(parentNode, 10, 10, 'red')
    // svgAttr(circle, {
    //   transform: 'translate(75, 10)',
    // })
    svgRemove(shape)
    return shape
  }
  if (is(element, 'bpmn:IntermediateThrowEvent')) {
    console.log('++++bpmn:IntermediateThrowEvent', shape)
  }

  // const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, color);

  // svgAttr(rect, {
  //   transform: 'translate(-20, -10)',
  // });

  return shape
}

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
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
