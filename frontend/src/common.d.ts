export type Email = string
export type Identifier = string | Email

export interface Credential {
  id: Identifier
  password: string
}

export interface widgetType {
  uuid: string
  name: string
  x: number
  y: number
  w: number
  h: number
  data: JSON
}
export type layoutType = widgetType[]
