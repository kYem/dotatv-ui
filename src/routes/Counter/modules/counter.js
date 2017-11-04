// @flow
import { matchToPlayers } from '../../../actions/matchProcessing'

const ACTION_HANDLERS = {
  LIVE_MATCH_DETAILS : (state, action) => {
    const oldLive = Object.assign({}, state.live, { ...action.payload.match })

    if (!action.payload.teams) {
      return state
    }

    const teams = Object.assign({}, action.payload.teams)
    const livePlayersData = teams[0].players.concat(teams[1].players)

    oldLive.players.map((player) => {
      const data = livePlayersData.find(livePlayer => livePlayer.account_id === player.account_id)
      return data ? Object.assign(player, data) : player
    })

    oldLive.updated = Date.now()
    return Object.assign({}, state, { live: oldLive })
  },
  LIVE_MATCHES : (state, action) => {
    const gameMatches = action.payload.game_list
    const liveMatch = matchToPlayers(gameMatches[1])
    return Object.assign({}, state, {
      matches: [liveMatch],
      live: Object.assign({}, liveMatch)
    })
  },
  MATCH_FINISHED : (state, action) => Object.assign({}, state, { matches: [], live: null })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  counter: 0,
  matches: [],
  live: null,
}
export default function counterReducer(state: { counter: number, matches: [] } = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
