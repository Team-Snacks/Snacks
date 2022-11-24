import { Coordinate, WidgetDimension, Widgets, WidgetType } from 'common'

import { cartesianProduct, range, replicate } from 'utils'
import { pos, Pos, size, Size, vec2, Vec2 } from 'vec2'

export const gridSize = { w: 5, h: 3 } as const

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
export const makeWidgetCoordinates = ({ x, y, w, h }: WidgetDimension) =>
  makePermutation(pos(x, y), pos(x, y).add(size(w, h)))

//prettier-ignore
export const makePermutation = (start: Vec2, end: Vec2) =>
  cartesianProduct(range(start.v[0], end.v[0]), range(start.v[1], end.v[1]))
    .map(([x, y]) => ({ x, y }))

//해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Vec2,
  end: Vec2
) => {
  const permutation = makePermutation(start, end)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = makeWidgetCoordinates(ele)
    permutation.forEach(perEle => {
      indexCoords.forEach(indexEle => {
        if (indexEle.x === perEle.x && indexEle.y === perEle.y) {
          widgetList.push(ele)
        }
      })
    })
  })
  return widgetList
}
//위젯들을 기반으로 위젯이 채워진 좌표계를 만듦 [완료][tools]
export const makeGridCoordinates = (widgets: Widgets) => {
  const rows = () => replicate(gridSize.h, () => ({ uuid: 'empty' }))
  const result = replicate(gridSize.w, rows)

  widgets.forEach(ele => {
    const eleCoordinate = makeWidgetCoordinates(ele)
    eleCoordinate.forEach(
      eleEle => (result[eleEle.x][eleEle.y] = { uuid: ele.uuid })
    )
  })
  return result
}
//위젯을 옮길 경우 차지하게 될 좌표 배열을 반환 [tools]
// export const makeMoveCoordinates = (
//   widgets: Widgets,
//   index: number,
//   coord: Coordinate
// ) => {}

//위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]
export const moveItemSwap = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const swapRange = coordinateRangeWidgets(
    widgets,
    pos(widget.x, widget.y).add(cursorPosition),
    pos(widget.x, widget.y).add(size(widget.w, widget.h)).add(cursorPosition)
  ).filter(ele => ele.uuid !== widget.uuid)
  if (
    swapRange.length === 1 &&
    swapRange[0].w === widget.w &&
    swapRange[0].h === widget.h
  ) {
    return widgets.find(ele => ele.uuid === swapRange[0].uuid) ?? null
  }
  return null
}
//빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]
export const movableToEmpty = (
  widget: WidgetType,
  cursorPosition: Coordinate,
  widgets: Widgets
) => {
  let movedWidget: WidgetType = {
    ...widget,
    x: widget.x + cursorPosition.x,
    y: widget.y + cursorPosition.y,
  }

  const movedRangeWidgets = coordinateRangeWidgets(
    widgets,
    pos(movedWidget.x, movedWidget.y),
    pos(movedWidget.x, movedWidget.y).add(size(movedWidget.w, movedWidget.h))
  ).filter(ele => ele.uuid !== widget.uuid)

  return (
    movedRangeWidgets.length === 0 &&
    movedWidget.x >= 0 &&
    movedWidget.y >= 0 &&
    movedWidget.x + movedWidget.w - 1 < gridSize.w &&
    movedWidget.y + movedWidget.h - 1 < gridSize.h
  )
}
