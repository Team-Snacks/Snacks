import { Pos, Size, Vec2 } from 'vec2'

export type Email = string
export type Identifier = string | Email

export interface Credential {
  id: Identifier
  password: string
}

export interface WidgetType {
  uuid: string
  name: string
  pos: Vec2
  size: Vec2
  data: JSON
}
export type Widgets = WidgetType[]
export type WidgetDimension = Pick<WidgetType, 'pos' | 'size'>
