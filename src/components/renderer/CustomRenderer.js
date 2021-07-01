import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

import { find } from 'min-dash'

import { getRoundRectPath } from 'bpmn-js/lib/draw/BpmnRenderUtil'

import { is } from 'bpmn-js/lib/util/ModelUtil'
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil'

const HIGH_PRIORITY = 1500

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer, paletteEntries, customToolEntries) {
    super(eventBus, HIGH_PRIORITY)

    this.bpmnRenderer = bpmnRenderer
    this.paletteEntries = paletteEntries
    this.customToolEntries = customToolEntries
  }

  canRender(element) {
    // only render tasks and events (ignore labels)
    return (
      isAny(element, [
        'bpmn:Task',
        'bpmn:Event',
        'bpmn:IntermediateThrowEvent',
      ]) && !element.labelTarget
    )
  }

  drawShape(parentNode, element) {
    const paletteEntries = this.paletteEntries
    const shape = find(paletteEntries, (entry) => {
      return is(element, entry.type)
    })
    console.log(
      '+++++drawShape',
      shape,
      paletteEntries,
      element,
      this.bpmnRenderer,
      this.customToolEntries
    )
    let optimazationArr = ['bpmn:StartEvent', 'bpmn:EndEvent']
    if (shape && shape.drawShape instanceof Function) {
      return shape.drawShape(parentNode, element, this.bpmnRenderer)
    } else if (optimazationArr.includes(element.type)) {
      return drawOptimazationShape(parentNode, element, this.bpmnRenderer)
    }
    return this.bpmnRenderer.drawShape(parentNode, element)
  }
}

// 优化svg图形构造
function drawOptimazationShape(parentNode, element, bpmnRenderer) {
  let shape
  console.log('+bpmnbpmn:Data22222222++++', bpmnRenderer, shape, element)
  return shape
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer', 'config.paletteEntries']
