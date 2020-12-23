import { Month } from "../models"

export function needsMigration(): boolean {
  let storageState = localStorage.getItem("redux")
  return !!storageState && Array.isArray(JSON.parse(storageState).months)
}

export function migrate(): void {
  let storageState = JSON.parse(localStorage.getItem("redux")!).months

  let migratedMonths: Month[] = storageState.map((oldState: any) => ({
    // Delete "monthAbbr" and "monthName"
    // Change "gameName" to "game"
    game: oldState.gameName,

    // Change string dates to numbers
    startDate: oldState.startDate && new Date(oldState.startDate).getTime(),
    // Change "completeDate" to "finishDate"
    finishDate:
      oldState.completeDate && new Date(oldState.completeDate).getTime(),
    // Change "hundredPercentDate" to "completeDate"
    completeDate:
      oldState.hundredPercentDate &&
      new Date(oldState.hundredPercentDate).getTime(),
  }))

  // Nest months under 2020
  let migratedState = {
    months: {
      2020: migratedMonths,
    },
  }

  localStorage.setItem("redux", JSON.stringify(migratedState))
}
