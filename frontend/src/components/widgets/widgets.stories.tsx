import { Widgets, WidgetType } from 'common'
import { Weather } from './Weather'
import { Widget } from './Widget'
import type { Story } from '@ladle/react'
import { layoutDummy, widgetDummy } from 'dummy'

export const weather: Story<{ widget: WidgetType }> = ({ widget }) => (
  <Weather widgetData={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ layout: Widgets; widget: WidgetType }> = ({
  layout,
  widget,
}) => <Widget layout={layout} widget={widget} />
widget.args = { layout: layoutDummy, widget: widgetDummy }
