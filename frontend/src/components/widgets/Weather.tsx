import { WidgetType } from 'common'

export const Weather = ({ widgetData }: { widgetData: WidgetType }) => {
  return <div>{widgetData.name}</div>
}
