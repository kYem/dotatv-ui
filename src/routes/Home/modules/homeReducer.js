import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'
import { mapAccountToPlayer, matchToPlayers } from '../../../actions/matchProcessing'

const filterLiveMatches = (liveMatchId, matches) => matches.filter(match => match.server_steam_id !== liveMatchId)

const ACTION_HANDLERS = {
  LIVE_MATCHES : (state, action) => {
    const gameMatches = action.payload.game_list

    if (!gameMatches) {
      return Object.assign({}, state, { matches: [] })
    }

    const parsedMatches = gameMatches.map(match => matchToPlayers(match))
    const liveMatchId = state.live && state.live.match ? state.live.match.server_steam_id : ''

    return Object.assign({}, state, {
      matches: filterLiveMatches(liveMatchId, parsedMatches),
    })
  },
  LIVE_MATCH_DETAILS : (state, action) => {
    action.payload.teams.forEach((team) => {
      team.players.map(player => mapAccountToPlayer(player))
    })
    const oldLive = Object.assign({}, state.live, { updated: Date.now(), ...action.payload })
    const liveMatchId = oldLive.match ? oldLive.match.server_steam_id : ''

    return Object.assign({}, state, {
      live: oldLive,
      matches: filterLiveMatches(liveMatchId, state.matches)
    })
  },
  MATCH_FINISHED : (state, action) => Object.assign({}, state, { matches: [], live: null })
}

const initialState = {
  matches: [],
}

export default function counterReducer(state: {matches: []} = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
