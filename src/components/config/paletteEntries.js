import { is } from 'bpmn-js/lib/util/ModelUtil'
import { assign } from 'min-dash'
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg'
import { drawLine, drawCircle, drawRect, drawDiamond, drawPath } from '../utils'

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
  let customTaskArr = ['循环']
  let name =
    element.businessObject.name && element.businessObject.name.split('：')[0]
  // && !customTaskArr.includes(name)
  if (!customShapeArr.includes(element.type)) {
    shape = bpmnRenderer.drawShape(parentNode, element)
  } else {
    shape = null
  }
  console.log('++++++++++++++++++++++++++shape', shape)
  // let color = ''
  console.log('+bpmnbpmn:Data++++', bpmnRenderer, shape, element)
  // if (is(element, 'bpmn:Task') && name === '循环') {
  //   shape = drawLine(parentNode, 10, 300, 'black')
  //   shape = drawLine(parentNode, 20, 300, 'black')
  //   return shape
  // }
  if (is(element, 'bpmn:Task')) {
    let height = 80
    let width = 100
    if (name) {
      let inColor = ''
      if (name === '获取物料') {
        inColor = 'blue'
        let rect1 = drawCircle(parentNode, 12, 12, inColor)
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
      } else if (name === '输入物料') {
        inColor = 'red'
        let rect1 = drawCircle(parentNode, 12, 12, inColor)
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
        // let d = `M20 0 L${
        //   width - 20
        // } 0 L${width} 20 L${width} ${height} L0 ${height} L0 20 Z`
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
        svgAttr(shape, {
          stroke: 'white',
        })
        let d = `M40 6 A1 1 0 0 1 65 73`
        let rect = drawPath(parentNode, d, 'rgb(140, 197, 255)')
        let s = `M33 8 A1 1 0 0 0 60 75`
        rect = drawPath(parentNode, s, '#409eff')
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

let exportPalette = {
  'matrix-title': {
    //工具分割线
    group: 'activity',
    titleName: 'Matrix components',
  },
  'create.gttest1': createAction(
    'bpmn:Task',
    'activity',
    '', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '获取物料',
    require('../img/task.png'),
    drawShape, // 📌
    '2'
  ),
  'create.gttest2': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '输入物料',
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
    '循环',
    require('../img/task.png'),
    drawShape, // 📌
    '5'
  ),
  'create.gttes4': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '判断',
    require('../img/task.png'),
    drawShape, // 📌
    '6'
  ),
  'gatew2ay-separator': {
    //网关分割线
    group: 'activity',
    separator: true,
  },
  'matrix2-title': {
    //工具分割线
    group: 'activity',
    titleName: 'Ma22trix components',
  },

  'create.gttes23': createAction(
    'bpmn:Task',
    'activity',
    'bpmn-icon-task-custom-bing', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '等待',
    require('../img/task.png'),
    drawShape, // 📌
    '7'
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
    'bpmn-customIcon-collect', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
    '并发',
    require('../img/collectW2x.png'),
    drawShape,
    '6'
  ),
  // 'create.exclusive-gateway': createAction(
  //   //互斥网关
  //   'bpmn:ExclusiveGateway',
  //   'gateway',
  //   'bpmn-icon-gateway-xor',
  //   'Create ExclusiveGateway',
  //   '',
  //   drawShape
  // ),
  // 'create.parallel-gateway': createAction(
  //   //并行网关
  //   'bpmn:ParallelGateway',
  //   'gateway',
  //   'bpmn-icon-gateway-parallel',
  //   'Create ParallelGateway',
  //   '',
  //   drawShape
  // ),
  // 'create.inclusive-gateway': createAction(
  //   //相容网关
  //   'bpmn:InclusiveGateway',
  //   'gateway',
  //   'bpmn-icon-gateway-or',
  //   'Create InclusiveGateway',
  //   '',
  //   drawShape
  // ),
  // 'create.complex-gateway': createAction(
  //   //复杂网关
  //   'bpmn:ComplexGateway',
  //   'gateway',
  //   'bpmn-icon-gateway-complex',
  //   'Create ComplexGateway',
  //   ''
  // ),
  // 'create.event-based-gateway': createAction(
  //   //事件网关
  //   'bpmn:EventBasedGateway',
  //   'gateway',
  //   'bpmn-icon-gateway-eventbased',
  //   'Create EventbasedGateway',
  //   '',
  //   drawShape
  // ),
}
export default exportPalette
