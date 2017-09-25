// @flow
import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  LIVE_MATCH_DETAILS : (state, action) => {
    const oldLive = Object.assign({}, state.live, { ...action.payload.match })
    oldLive.updated = Date.now()
    return Object.assign({}, state, { live: oldLive })
  },
  MATCH_FINISHED : (state, action) => {
    return Object.assign({}, state, { matches: [], live: null })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  live: {},
}
export default function liveReducer(state: { counter: number, matches: [] } = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}