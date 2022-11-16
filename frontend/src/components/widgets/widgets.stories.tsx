import { layoutType, widgetType } from 'common'
import { Weather } from './Weather'
import { Widget } from './Widget'
import type { Story } from '@ladle/react'
import { layoutDummy, widgetDummy } from 'Dummy'

export const weather: Story<{ widget: widgetType }> = ({ widget }) => (
  <Weather widgetData={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ layout: layoutType; widget: widgetType }> = ({
  layout,
  widget,
}) => <Widget layout={layout} widget={widget} />
widget.args = { layout: layoutDummy, widget: widgetDummy }
