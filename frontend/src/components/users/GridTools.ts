import { Coordinate, WidgetDimension, Widgets, WidgetType } from 'common'
import { widget } from 'components/widgets/widgets.stories'
import { cartesianProduct, range } from 'utils'

export const gridSize = { w: 5, h: 3 } as const

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
export const makeWidgetCoordinates = ({ x, y, w, h }: WidgetDimension) =>
  cartesianProduct(range(x, x + w), range(y, y + h)).map(([x, y]) => ({ x, y }))

//prettier-ignore
export const makePermutation = (start: Coordinate, end: Coordinate) =>
  cartesianProduct(range(start.x, end.x), range(start.y, end.y))
    .map(([x, y]) => ({ x, y }))

//해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Coordinate,
  end: Coordinate
) => {
  const permutation = makePermutation(start, end)

  const widgetList: Widgets = []
  widgets.map(ele => {
    const indexCoords = makeWidgetCoordinates(ele)
    permutation.map(perEle => {
      indexCoords.map(indexEle => {
        if (indexEle.x === perEle.x && indexEle.y === perEle.y)
          widgetList.push(ele)
      })
    })
  })
  return widgetList
}
//위젯들을 기반으로 위젯이 채워진 좌표계를 만듦 [완료][tools]
export const makeGridCoordinates = (widgets: Widgets) => {
  const newGridCoordinates: Array<{ uuid: string }[]> = new Array(gridSize.w)
  for (let i = 0; i < gridSize.w; i++) {
    newGridCoordinates[i] = new Array(gridSize.h)
    newGridCoordinates[i].fill({ uuid: 'empty' })
  }
  widgets.map(ele => {
    const eleCoordinate = makeWidgetCoordinates(ele)
    eleCoordinate.map(eleEle => {
      newGridCoordinates[eleEle.x][eleEle.y] = { uuid: ele.uuid }
    })
  })
  return newGridCoordinates
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
  cursorPosition: Coordinate,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const swapRange = coordinateRangeWidgets(
    widgets,
    {
      x: widget.x + cursorPosition.x,
      y: widget.y + cursorPosition.y,
    },
    {
      x: widget.x + widget.w + cursorPosition.x,
      y: widget.y + widget.h + cursorPosition.y,
    }
  ).filter(ele => ele.uuid !== widget.uuid)
  if (
    swapRange.length === 1 &&
    swapRange[0].w === widget.w &&
    swapRange[0].h === widget.h
  ) {
    const swapWidget = widgets.find(ele => {
      return ele.uuid === swapRange[0].uuid
    })
    if (!swapWidget) return false
    else return swapWidget
  }
  return false
}
//빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]
export const isMovable = (
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
    { x: movedWidget.x, y: movedWidget.y },
    { x: movedWidget.x + movedWidget.w, y: movedWidget.y + movedWidget.h }
  ).filter(ele => ele.uuid !== widget.uuid)

  return (
    movedRangeWidgets.length === 0 &&
    movedWidget.x >= 0 &&
    movedWidget.y >= 0 &&
    movedWidget.x + movedWidget.w - 1 < gridSize.w &&
    movedWidget.y + movedWidget.h - 1 < gridSize.h
  )
}
