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

// 自定义画菱形
function drawDiamond(parentNode, width, height, attrs) {
  var x_2 = width / 2
  var y_2 = height / 2

  var points = [
    { x: x_2, y: 0 },
    { x: width, y: y_2 },
    { x: x_2, y: height },
    { x: 0, y: y_2 },
  ]

  var pointsString = points
    .map(function (point) {
      return point.x + ',' + point.y
    })
    .join(' ')

  var polygon = svgCreate('polygon')

  svgAttr(polygon, {
    points: pointsString,
    stroke: 'black',
    strokeWidth: 2,
    fill: 'none',
  })

  svgAppend(parentNode, polygon)

  return polygon
}

// 自定义画路径
function drawPath(parentNode, d, attrs) {
  var path = svgCreate('path')
  svgAttr(path, {
    d: d,
    stroke: attrs ? attrs : 'black',
    strokeWidth: 2,
    fill: 'none',
  })

  svgAppend(parentNode, path)

  return path
}

// 自定义循环
function drawLoop(parentNode, path) {
  svgAppend(parentNode, path)
  return path
}

export { drawLine, drawCircle, drawRect, drawDiamond, drawPath, drawLoop }
