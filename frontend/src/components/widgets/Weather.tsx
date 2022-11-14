import { widgetType } from 'Types'

export const Weather = ({ widgetData }: { widgetData: widgetType }) => {
  return <div>{widgetData.name}</div>
}
