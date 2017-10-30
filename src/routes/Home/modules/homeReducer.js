import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'
import {mapAccountToPlayer, matchToPlayers} from '../../../actions/matchProcessing'

const ACTION_HANDLERS = {
  LIVE_MATCHES : (state, action) => {
    const gameMatches = action.payload.game_list
    let liveMatches = [];
    if (gameMatches) {
      liveMatches = gameMatches.map(match => matchToPlayers(match))
    }
    return Object.assign({}, state, {
      matches: liveMatches,
    })
  },
  LIVE_MATCH_DETAILS : (state, action) => {
    action.payload.teams.forEach((team) => {
      team.players.map(player => mapAccountToPlayer(player))
    })
    const oldLive = Object.assign({}, state.live, { ...action.payload })
    oldLive.updated = Date.now()
    return Object.assign({}, state, { live: oldLive })
  },
  MATCH_FINISHED : (state, action) => {
    return Object.assign({}, state, { matches: [], live: null })
  }
}

const initialState = {
  matches: [],
}

export default function counterReducer(state: {matches: []} = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
