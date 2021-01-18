import apiClient from '../client'

const LS_KEY = 'migrationLevel'
const CURRENT_MIGRATION = 1

export let migrate = () => {
  if (true) {
    console.log('would migrate')
    return
  }

  let stateStr = localStorage.getItem('redux') ?? '{}'
  let state = JSON.parse(stateStr)
  let games = state.games ?? { byId: {}, allIds: [] }
  let userId = state.user?.id

  if (!userId) {
    console.warn("Can't migrate because nobody is logged in")
    return
  }

  Object.entries(games.byId).forEach(([id, game]) => {
    console.log('migrate', id, game)
    apiClient.saveGame(userId, game as any)
  })

  localStorage.setItem(LS_KEY, `${CURRENT_MIGRATION}`)
}

export let needsMigration = () => {
  let storageLevel = localStorage.getItem(LS_KEY) ?? '0'
  let migrationLevel = parseInt(storageLevel, 10)

  return migrationLevel < CURRENT_MIGRATION
}
