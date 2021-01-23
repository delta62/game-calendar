export interface Platform {
  id: number
  name: string
}

export type State = Record<number, Platform>
