export type Email = string
export type Identifier = string | Email

export interface Credential {
  id: Identifier
  password: string
}

export interface WidgetType {
  uuid: string
  name: string
  x: number
  y: number
  w: number
  h: number
  data: JSON
}
export type Widgets = WidgetType[]
export type WidgetDimension = Pick<WidgetType, 'x' | 'y' | 'w' | 'h'>

export type Coordinate = {
  x: number
  y: number
}
