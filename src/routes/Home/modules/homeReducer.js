import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'
import { mapAccountToPlayer, matchToPlayers } from '../../../actions/matchProcessing'

const filterLiveMatches = (liveMatchId, matches) => {
  const filteredOut = {
    liveMatch: null,
  }

  filteredOut.matches = matches.filter((match) => {
    if (match.server_steam_id === liveMatchId) {
      filteredOut.liveMatch = match
      return false
    }

    return true
  })

  return filteredOut
}

const getLiveMatchId = (state) => {
  return state.live && state.live.match ? state.live.match.server_steam_id : ''
}

const ACTION_HANDLERS = {
  [LIVE_MATCHES] : (state, action) => {
    const gameMatches = action.payload.game_list

    if (!gameMatches) {
      return { ...state, matches: [] }
    }

    const matches = gameMatches.map(match => matchToPlayers(match))
    return { ...state, matches }
  },
  [LIVE_MATCH_DETAILS] : (state, action) => {
    const payload = action.payload
    payload.teams.forEach((team) => {
      team.players.map(player => mapAccountToPlayer(player))
    })

    const liveMatchState = { ...state.live, updated: Date.now(), ...payload }
    const liveMatch = state.matches.find(match => match.server_steam_id === payload.match.server_steam_id)

    // Only update if we have a found live match
    if (liveMatch) {
      liveMatchState.average_mmr = liveMatch.average_mmr
    }

    return { ...state, live: liveMatchState }
  },
  MATCH_FINISHED : (state, action) => ({ ...state, live: null })
}

const initialState = {
  matches: [],
  live: null,
}

export default function counterReducer(state: {matches: []} = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
