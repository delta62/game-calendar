export interface Month {
    game?:         string
    startDate?:    number
    finishDate?:   number
    completeDate?: number
}

export interface StoreState {
    months: Record<number, Month[]>
}
