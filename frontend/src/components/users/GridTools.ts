import { Coordinate, Widgets } from 'common'

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
export const makeWidgetCoordinates = (widgets: Widgets, index: number) => {
  const coordList: Coordinate[] = []
  for (let i = 0; i < widgets[index].h; i++) {
    for (let j = 0; j < widgets[index].w; j++) {
      coordList.push({
        x: widgets[index].x + j,
        y: widgets[index].y + i,
      })
    }
  }
  return coordList
}
//해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Coordinate,
  end: Coordinate
) => {
  const widgetList: Widgets = []
  const permutation: Coordinate[] = []
  for (let i = start.x; i < end.x; i++) {
    for (let j = start.y; j < end.y; j++) {
      permutation.push({ x: i, y: j })
    }
  }
  widgets.map((ele, index) => {
    const indexCoords = makeWidgetCoordinates(widgets, index)
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
  const newGridCoordinates: Array<{ uuid: string }[]> = new Array(5)
  for (let i = 0; i < 5; i++) {
    newGridCoordinates[i] = new Array(3)
    newGridCoordinates[i].fill({ uuid: 'empty' })
  }
  widgets.map((ele, index) => {
    const eleCoordinate = makeWidgetCoordinates(widgets, index)
    eleCoordinate.map(eleEle => {
      newGridCoordinates[eleEle.x][eleEle.y] = { uuid: ele.uuid }
    })
  })
  return newGridCoordinates
}
//위젯을 옮길 경우 차지하게 될 좌표 배열을 반환 [tools]
export const makeMoveCoordinates = (
  widgets: Widgets,
  index: number,
  coord: Coordinate
) => {}
