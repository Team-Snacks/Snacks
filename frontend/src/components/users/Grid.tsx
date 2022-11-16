import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { layoutType } from 'common'

export const Grid = ({ gridItems }: { gridItems: layoutType }) => {
  const tmpStyle: React.CSSProperties = {
    background: '#aaffaa',
    display: 'inline-grid',
    width: '100%',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 10,
  }
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.active.id !== event.over?.id) {
      const oldIndex = gridItems.findIndex(
        item => item.uuid === event.active.id
      )
      const newIndex = gridItems.findIndex(item => item.uuid === event.over?.id)
      moveItem(gridItems, oldIndex, newIndex)
    }
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
  // 센서, 핸들러, 정렬 함수 등 추가할 것
  return (
    <div style={tmpStyle}>
      <DndContext onDragEnd={handleDragEnd}>
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
