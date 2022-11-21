import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { Coordinate, Widgets, WidgetType } from 'common'
import { createRef, LegacyRef, useState } from 'react'
import { moveItemEmpty, moveItemSwap } from './GridTools'

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

  //위젯을 미는 동작을 수행한다 [새로 만들 예정][주기능]
  // const pushItem = (layout: Widgets, oldIndex: number, newIndex: number) => {
  //   const swapCoordinates = makeCoordinates(layout, oldIndex, newIndex)
  //   layout.map((ele, index) => {
  //     if (index !== oldIndex) {
  //       const eleCoordinates = makeCoordinates(layout, index, index)
  //       //filtered는 중복된 좌표값 좌표값만 토대로 어떤 위젯인지 찾아야함
  //       //각 위젯의 좌표배열을 생성. 배열 중 filteredEle가 있는 지 찾기.
  //       const filtered = eleCoordinates.map(it => {
  //         return swapCoordinates.filter(swapEle => {
  //           return swapEle.x === it.x && swapEle.y === it.y
  //         })
  //       })
  //       if (filtered[0].length === 0) return
  //       //filtered 위치만 알지 무슨 위젯인지는 아직 모름
  //       //일단 layout을 돌면서 해당 위치를 차지하고 있는 위젯을 찾기
  //       filtered[0].map(filteredEle => {
  //         const overlapWidget: WidgetType | undefined = layout.find(
  //           (layoutEle, index) => {
  //             const tmpWidgetCoordinate = makeCoordinates(layout, index, index)
  //             const includeWidget = tmpWidgetCoordinate.map(ele => {
  //               return ele.x === filteredEle.x && ele.y === filteredEle.y
  //             })
  //             if (includeWidget.includes(true)) return layoutEle
  //           }
  //         )
  //         if (overlapWidget === undefined) return
  //         //overlapWidget까지는 잘 찾아졌음
  //         if (tryPush(layout, overlapWidget, { x: -1, y: 0 }) === true) return
  //         if (tryPush(layout, overlapWidget, { x: 1, y: 0 }) === true) return
  //         if (tryPush(layout, overlapWidget, { x: 0, y: 1 }) === true) return
  //         if (tryPush(layout, overlapWidget, { x: 0, y: -1 }) === true) return
  //         //위젯을 찾았으면 좌, 우, 상, 하 순서로 밀기 시도. 못찾았다면 밀지 않고 종료
  //       })
  //       //filtered가 비어있지 않다면 이 ele는 겹치는 위젯이다
  //       //겹치는 위젯은 상하좌우로 밀 수 있음.
  //       //좌->우->상->하 순서로 검사해서 밀 수 있는 지 확인하고,
  //       //가능하다면 밀기
  //     }
  //   })
  // }
  //매개변수로 받은 방향으로 push한다 [새로 만들 예정][주기능]
  // const tryPush = (
  //   layout: Widgets,
  //   widget: WidgetType,
  //   direction: Coordinate
  // ) => {
  //   //layout에서 widget을 찾아서 왼쪽으로 한 칸 밀기
  //   //layout 좌표들에서 왼쪽 한 칸 기준으로 비어있는지를 확인하기.
  //   const widgetIndex = layout.findIndex(ele => {
  //     return ele.uuid === widget.uuid
  //   })
  //   const widgetCoordinate = makeCoordinates(layout, widgetIndex, widgetIndex)
  //   //widgetCoodinate의 좌표들에 (-1, 0)씩 연산해서 이 위치랑 eleCoodinate랑 겹치는지 확인.
  //   const moveCoordinate = widgetCoordinate.map(ele => {
  //     return { x: ele.x + direction.x, y: ele.y + direction.y }
  //   })
  //   //오버랩을 한 칸 옮긴 위치랑 비교해서 겹치면 움직이지 말고
  //   const tmp = layout.map((ele, index) => {
  //     const eleCoordinate = makeCoordinates(layout, index, index)
  //     const isOverlap = moveCoordinate.map(moveEle => {
  //       return eleCoordinate.map(eleEle => {
  //         if (moveEle.x === eleEle.x && moveEle.y === eleEle.y) return false
  //         else if (moveEle.x < 0 || moveEle.y) return false
  //         else return true
  //       })
  //     })
  //     if (isOverlap[0].includes(false)) return false
  //     else {
  //       return true
  //     }
  //   })
  //   if (tmp.includes(true)) {
  //     //옮길 수 있음
  //     widget.x += direction.x
  //     widget.y += direction.y
  //     return true
  //   } else return false
  // }

  //이동 알고리즘 들어가는 함수 [주기능]
  const moveItem = (index: number) => {
    //빈 공간일 경우
    if (moveItemEmpty(widgets[index], cursorPosition, widgets) !== false) {
      widgets[index].x += cursorPosition.x
      widgets[index].y += cursorPosition.y
      return
    }
    //swap할 수 있는 경우
    const swapWidget = moveItemSwap(widgets[index], cursorPosition, widgets)
    if (swapWidget !== false) {
      const swapCoords: Coordinate = { x: swapWidget.x, y: swapWidget.y }
      swapWidget.x = widgets[index].x
      swapWidget.y = widgets[index].y
      widgets[index].x = swapCoords.x
      widgets[index].y = swapCoords.y
      return
    }
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
