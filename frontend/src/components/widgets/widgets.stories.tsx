import { layoutType, widgetType } from 'common'
import { Weather } from './Weather'
import { Widget } from './Widget'
import type { Story } from '@ladle/react'
const widgetDummy = {
  uuid: '1',
  name: 'weather',
  x: 0,
  y: 0,
  w: 1,
  h: 1,
  data: JSON.parse('{"aa" : "bb"}'),
}
const layoutDummy: layoutType = [
  {
    uuid: '1',
    name: 'weather',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '2',
    name: 'memo',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '3',
    name: 'weather',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '4',
    name: 'ascii',
    x: 3,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '5',
    name: 'todo',
    x: 4,
    y: 0,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '6',
    name: 'memo',
    x: 0,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    uuid: '7',
    name: 'timer',
    x: 1,
    y: 1,
    w: 1,
    h: 1,
    data: JSON.parse('{"aa" : "bb"}'),
  },
]
export const weather: Story<{ widget: widgetType }> = ({ widget }) => (
  <Weather widgetData={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ layout: layoutType; widget: widgetType }> = ({
  layout,
  widget,
}) => <Widget layout={layout} widget={widget} />
widget.args = { layout: layoutDummy, widget: widgetDummy }
