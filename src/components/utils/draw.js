import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  remove as svgRemove,
} from 'tiny-svg'

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

export { drawLine, drawCircle, drawRect }
