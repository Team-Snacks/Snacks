import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { layoutType, widgetType } from 'common'
import { Weather } from './Weather'

export const Widget = ({
  layout,
  widget,
}: {
  layout: layoutType
  widget: widgetType
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.name })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const selectWidget = () => {
    switch (widget.name) {
      case 'weather':
        return <Weather widgetData={widget}></Weather>
      default:
        return <div>dummy</div> //추후 위젯 추가
    }
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {selectWidget()}
    </div>
  )
}
