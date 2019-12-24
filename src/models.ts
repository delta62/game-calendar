export interface Month {
    monthAbbr:           string
    monthName:           string
    gameName?:           string
    startDate?:          Date
    completeDate?:       Date
    hundredPercentDate?: Date
}

export interface StoreState {
    months: Month[]
}
