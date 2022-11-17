import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
} from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { layoutType } from 'common'
import { createRef, LegacyRef, Ref, useState } from 'react'

export const Grid = ({ gridItems }: { gridItems: layoutType }) => {
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
      console.log(gridItems)
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

  const moveItem = (layout: layoutType, oldIndex: number, newIndex: number) => {
    //layout에서 oldIndex와 newIndex를 위치만 교체
    const tmpX = layout[oldIndex].x
    const tmpY = layout[oldIndex].y
    layout[oldIndex].x = layout[newIndex].x
    layout[oldIndex].y = layout[newIndex].y
    layout[newIndex].x = tmpX
    layout[newIndex].y = tmpY
  }
  const moveItemToEmpty = (layout: layoutType, index: number) => {
    console.log(index)
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
