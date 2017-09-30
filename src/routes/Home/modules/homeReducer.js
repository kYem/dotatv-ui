import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'
import { matchToPlayers } from '../../../actions/matchProcessing'

const ACTION_HANDLERS = {
  LIVE_MATCHES : (state, action) => {
    const gameMatches = action.payload.game_list
    const liveMatches = gameMatches.map(match => matchToPlayers(match))
    return Object.assign({}, state, {
      matches: liveMatches,
    })
  },
}

const initialState = {
  matches: [],
}

export default function counterReducer(state: {matches: []} = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
