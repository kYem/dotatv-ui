// @flow
import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'
const proPlayers = require('../../../data/pro-players.json')
const heroes = require('../../../data/heroes.json')
const config = require('../../../../project.config')

export function mapAccountToPlayer(playerObject) {
  const heroData = heroes.heroes.find(hero => hero.id === playerObject.heroid)
  const heroName = heroData ? heroData.name.replace('npc_dota_hero_', '') : ''

  return Object.assign(
    playerObject,
    proPlayers.find(player => player.account_id === playerObject.accountid),
    {
      hero_name: heroName,
      hero_image: heroData ? `${config.dotaImageCdn}/heroes/${heroName}_sb.png` : '',
      hero_id: playerObject.heroid
    }
  )
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
