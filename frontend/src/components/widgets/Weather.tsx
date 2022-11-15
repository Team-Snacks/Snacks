import { widgetType } from 'common'

export const Weather = ({ widgetData }: { widgetData: widgetType }) => {
  return <div>{widgetData.name}</div>
}
