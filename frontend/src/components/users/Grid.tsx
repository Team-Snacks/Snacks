import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { WidgetDimension, Widgets, WidgetType } from 'common'
import { createRef, LegacyRef, useState } from 'react'
import { exit } from 'process'

type Coordinate = {
  x: number
  y: number
}

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
const makeWidgetCoordinates = ({ x, y, w, h }: WidgetDimension) => {
  const coordList: Coordinate[] = []
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      coordList.push({ x: x + j, y: y + i })
    }
  }
  return coordList
}

export const Grid = ({ widgets }: { widgets: Widgets }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const gridRef: LegacyRef<HTMLDivElement> = createRef()
  const tmpStyle: React.CSSProperties = {
    background: '#aaffaa',
    display: 'inline-grid',
    width: '100%',
    height: '80vh',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 10,
  }
  //state cursorPosition을 기반으로 위젯을 이동한다 [완료][핸들러]
  const handleDragEnd = (event: DragEndEvent) => {
    if (cursorPosition.x !== 0 || cursorPosition.y !== 0) {
      const index = widgets.findIndex(item => item.uuid === event.active.id)
      moveItem(index)
    }
  }
  //드래그 중의 포인터 움직임을 State에 저장한다 [완료][핸들러]
  const handleDragMove = (event: DragMoveEvent) => {
    if (gridRef.current) {
      setCursorPosition({
        x: Math.round(event.delta.x / (gridRef.current.offsetWidth / 5)),
        y: Math.round(event.delta.y / (gridRef.current.offsetHeight / 3)),
      })
    }
    //delta값에 얼마나 움직였는지 정보가 담겨있고
    //이걸 그리드 사이즈에 대한 비율로 나눠서 어느 정도 이동했는지 좌표를 구한다
    //x, y좌표를 state로 저장한다
  }

  //해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
  const coordinateRangeWidgets = (start: Coordinate, end: Coordinate) => {
    const widgetList: Widgets = []
    const permutation: Coordinate[] = []
    for (let i = start.x; i < end.x; i++) {
      for (let j = start.y; j < end.y; j++) {
        permutation.push({ x: i, y: j })
      }
    }
    widgets.map((ele, index) => {
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
  const makeGridCoordinates = () => {
    const newGridCoordinates: Array<{ uuid: string }[]> = new Array(5)
    for (let i = 0; i < 5; i++) {
      newGridCoordinates[i] = new Array(3)
      newGridCoordinates[i].fill({ uuid: 'empty' })
    }
    widgets.map((ele, index) => {
      const eleCoordinate = makeWidgetCoordinates(ele)
      eleCoordinate.map(eleEle => {
        newGridCoordinates[eleEle.x][eleEle.y] = { uuid: ele.uuid }
      })
    })
    return newGridCoordinates
  }

  //위젯 둘을 서로 교환한다. [완료][주기능]
  const moveItemSwap = (widget: WidgetType) => {
    //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
    //2. 조건이 맞으면 교환 후 true, 실패하면 false
    const swapRange = coordinateRangeWidgets(
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
      const swapCoords: Coordinate = { x: swapWidget.x, y: swapWidget.y }
      swapWidget.x = widget.x
      swapWidget.y = widget.y
      widget.x = swapCoords.x
      widget.y = swapCoords.y
      return true
    }
    return false
  }
  //빈 곳으로 위젯을 이동한다 [완료] [주기능]
  const moveItemEmpty = (widget: WidgetType) => {
    const movedWidget: WidgetType = JSON.parse(JSON.stringify(widget))
    movedWidget.x += cursorPosition.x
    movedWidget.y += cursorPosition.y
    const movedRangeWidgets = coordinateRangeWidgets(
      { x: movedWidget.x, y: movedWidget.y },
      { x: movedWidget.x + movedWidget.w, y: movedWidget.y + movedWidget.h }
    ).filter(ele => ele.uuid !== widget.uuid)
    if (
      movedRangeWidgets.length === 0 &&
      movedWidget.x >= 0 &&
      movedWidget.y >= 0 &&
      movedWidget.x < 5 &&
      movedWidget.y < 3
    ) {
      widget.x += cursorPosition.x
      widget.y += cursorPosition.y
      return true //빈 공간으로 이동함
    }
    return false //빈공간으로 이동 할 수 없음
  }
  //이동 알고리즘 들어가는 함수 [주기능]
  const moveItem = (index: number) => {
    if (moveItemEmpty(widgets[index]) === true) return //빈 공간일 경우
    //if (moveItemPush(widgets[index]) === true) return//push할 수 있는 경우
    if (moveItemSwap(widgets[index]) === true) return //swap할 수 있는 경우
    console.log('이동불가') //불가능
  }

  return (
    <div style={tmpStyle} ref={gridRef}>
      <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
        <SortableContext
          items={widgets.map(ele => ele.uuid)}
          strategy={rectSwappingStrategy}
        >
          {widgets.map((ele, index) => (
            <Widget layout={widgets} widget={ele} key={index}></Widget>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
