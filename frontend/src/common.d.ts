export type Email = string
export type Identifier = string | Email

export interface Credential {
  id: Identifier
  password: string
}
