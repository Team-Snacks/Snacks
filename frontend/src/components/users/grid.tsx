import { DndContext } from '@dnd-kit/core'
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
  // 센서, 핸들러, 정렬 함수 등 추가할 것
  return (
    <div style={tmpStyle}>
      <DndContext>
        <SortableContext
          items={gridItems.map(ele => ele.name)}
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
