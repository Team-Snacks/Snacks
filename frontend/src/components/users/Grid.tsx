import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { Widgets, WidgetType } from 'common'
import { createRef, LegacyRef, useState } from 'react'

type Coordinate = {
  x: number
  y: number
}

export const Grid = ({ gridItems }: { gridItems: Widgets }) => {
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
  //#######이동 알고리즘 들어가는 부분 제일 중요#########
  //교환할 수 있는 경우 moveItem, 빈 곳으로 이동하는 경우 moveItemToEmpty로 이동
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.active.id !== event.over?.id) {
      const oldIndex = gridItems.findIndex(
        item => item.uuid === event.active.id
      )
      const newIndex = gridItems.findIndex(item => item.uuid === event.over?.id)
      moveItem(gridItems, oldIndex, newIndex)
    } else if (event.active && event.over === null) {
      //useState로 좌표를 가지고 있기 handleDragMove를 만들고 그 함수에서 계속 State를 갱신하게 하자
      //그리고 moveItemToEmpty 같은 거 만들고 그 state를 적용시키도록 한다
      if (cursorPosition.x !== 0 || cursorPosition.y !== 0) {
        const index = gridItems.findIndex(item => item.uuid === event.active.id)
        moveItemToEmpty(gridItems, index)
      }
    }
  }
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
  const swapItem = (layout: Widgets, oldIndex: number, newIndex: number) => {
    const tmpX = layout[oldIndex].x
    const tmpY = layout[oldIndex].y
    layout[oldIndex].x = layout[newIndex].x
    layout[oldIndex].y = layout[newIndex].y
    layout[newIndex].x = tmpX
    layout[newIndex].y = tmpY
  }
  //해당 위젯이 차지하고 있는 좌표 리스트를 반환
  const makeCoordinates = (layout: Widgets, start: number, end: number) => {
    const swapPlace: Coordinate[] = []
    for (let i = 0; i < layout[start].h; i++) {
      for (let j = 0; j < layout[start].w; j++) {
        swapPlace.push({
          x: layout[end].x + j,
          y: layout[end].y + i,
        })
      }
    }
    return swapPlace
  }

  const pushItem = (layout: Widgets, oldIndex: number, newIndex: number) => {
    const swapCoordinates = makeCoordinates(layout, oldIndex, newIndex)
    layout.map((ele, index) => {
      if (index !== oldIndex) {
        const eleCoordinates = makeCoordinates(layout, index, index)
        //filtered는 중복된 좌표값 좌표값만 토대로 어떤 위젯인지 찾아야함
        //각 위젯의 좌표배열을 생성. 배열 중 filteredEle가 있는 지 찾기.
        const filtered = eleCoordinates.map(it => {
          return swapCoordinates.filter(swapEle => {
            return swapEle.x === it.x && swapEle.y === it.y
          })
        })
        if (filtered[0].length === 0) return
        //filtered 위치만 알지 무슨 위젯인지는 아직 모름
        //일단 layout을 돌면서 해당 위치를 차지하고 있는 위젯을 찾기
        filtered[0].map(filteredEle => {
          const overlapWidget: WidgetType | undefined = layout.find(
            (layoutEle, index) => {
              const tmpWidgetCoordinate = makeCoordinates(layout, index, index)
              const includeWidget = tmpWidgetCoordinate.map(ele => {
                return ele.x === filteredEle.x && ele.y === filteredEle.y
              })
              if (includeWidget.includes(true)) return layoutEle
            }
          )
          if (overlapWidget === undefined) return
          //overlapWidget까지는 잘 찾아졌음
          console.log(overlapWidget)
          if (tryPush(layout, overlapWidget, { x: -1, y: 0 }) === true) return
          if (tryPush(layout, overlapWidget, { x: 1, y: 0 }) === true) return
          if (tryPush(layout, overlapWidget, { x: 0, y: 1 }) === true) return
          if (tryPush(layout, overlapWidget, { x: 0, y: -1 }) === true) return
          // console.log('밀 수 없음')
          //위젯을 찾았으면 좌, 우, 상, 하 순서로 밀기 시도. 못찾았다면 밀지 않고 종료
          //다 실패 시 console.log(밀 수 없음)//
        })
        //filtered가 비어있지 않다면 이 ele는 겹치는 위젯이다
        //겹치는 위젯은 상하좌우로 밀 수 있음.
        //좌->우->상->하 순서로 검사해서 밀 수 있는 지 확인하고,
        //가능하다면 밀기
      }
    })
  }

  const tryPush = (
    layout: Widgets,
    widget: WidgetType,
    direction: Coordinate
  ) => {
    //layout에서 widget을 찾아서 왼쪽으로 한 칸 밀기
    //layout 좌표들에서 왼쪽 한 칸 기준으로 비어있는지를 확인하기.
    const widgetIndex = layout.findIndex(ele => {
      return ele.uuid === widget.uuid
    })
    const widgetCoordinate = makeCoordinates(layout, widgetIndex, widgetIndex)
    //widgetCoodinate의 좌표들에 (-1, 0)씩 연산해서 이 위치랑 eleCoodinate랑 겹치는지 확인.
    const moveCoordinate = widgetCoordinate.map(ele => {
      return { x: ele.x + direction.x, y: ele.y + direction.y }
    })
    //오버랩을 한 칸 옮긴 위치랑 비교해서 겹치면 움직이지 말고
    const tmp = layout.map((ele, index) => {
      const eleCoordinate = makeCoordinates(layout, index, index)
      const isOverlap = moveCoordinate.map(moveEle => {
        return eleCoordinate.map(eleEle => {
          if (moveEle.x === eleEle.x && moveEle.y === eleEle.y) return false
          else if (moveEle.x < 0 || moveEle.y) return false
          else return true
        })
      })
      if (isOverlap[0].includes(false)) return false
      else {
        return true
      }
    })
    if (tmp.includes(true)) {
      //옮길 수 있음
      widget.x += direction.x
      widget.y += direction.y
      return true
    } else return false
  }

  const moveItem = (layout: Widgets, oldIndex: number, newIndex: number) => {
    //push를 먼저 시도하고 실패하면 swap을 시도할 예정 아직 덜만듦

    //1. 해당 위젯 스왑될 위치를 다음과 같은 배열로 만듬 [{x, y}, ...] 차지하고 있는 좌표들의 배열
    //2. 위젯리스트를 돌면서 그 위젯에 대한 배열을 만들고, 1의 배열과 비교해서 겹치는 좌표가 있는 지 확인
    //3. 겹치는 좌표가 없다면 바로 스왑
    //4. 겹치는 좌표가 있다면, 그 위젯을 상하좌우로 밀어내기(밀어낼 위치를 검사해 가능 불가능 확인 후 밀기)
    //5. 우선순위는 밀어내기 -> 스왑 -> 불가능
    //드래그 시 CSS 등 세세한 동작은 추후 만들기..

    pushItem(layout, oldIndex, newIndex)
    // swapItem(layout, oldIndex, newIndex)
  }

  const moveItemToEmpty = (layout: Widgets, index: number) => {
    layout[index].x += cursorPosition.x
    layout[index].y += cursorPosition.y
  }

  return (
    <div style={tmpStyle} ref={gridRef}>
      <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
        <SortableContext
          items={gridItems.map(ele => ele.uuid)}
          strategy={rectSwappingStrategy}
        >
          {gridItems.map((ele, index) => (
            <Widget layout={gridItems} widget={ele} key={index}></Widget>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
