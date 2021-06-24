import CustomTools from './customTools'
import bpmnData from './bpmnToolData'
export default {
  __init__: ['paletteProvider', 'bpmnData'],
  paletteProvider: ['type', CustomTools],
  bpmnData: ['type', bpmnData],
}
