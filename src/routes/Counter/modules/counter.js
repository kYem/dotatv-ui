// @flow
import { LIVE_MATCH_DETAILS, LIVE_MATCHES } from '../../../actions/api'

const config = require('../../../../project.config')

// Test data
const proPlayers = require('../../../data/pro-players.json')
const heroes = require('../../../data/heroes.json')

// ------------------------------------
// Actions
// ------------------------------------
export function mapAccountToPlayer(playerObject) {
  const heroData = heroes.heroes.find(hero => hero.id === playerObject.hero_id)
  const heroName = heroData ? heroData.name.replace('npc_dota_hero_', '') : ''

  return Object.assign(
    playerObject,
    proPlayers.find(player => player.account_id === playerObject.account_id),
    {
      hero_name: heroName,
      hero_image: heroData ? `${config.dotaImageCdn}/heroes/${heroName}_sb.png` : ''
    }
  )
}

const matchToPlayers = (match) => {
  match.players.map(player => mapAccountToPlayer(player))
  return match
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  LIVE_MATCH_DETAILS : (state, action) => {
    const oldLive = Object.assign({}, state.live, { ...action.payload.match })

    if (!action.payload.teams) {
      return state
    }

    const teams = Object.assign({}, action.payload.teams)
    const livePlayersData = teams[0].players.concat(teams[1].players)

    oldLive.players.map((player) => {
      const data = livePlayersData.find(livePlayer => livePlayer.accountid === player.account_id)
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
  MATCH_FINISHED : (state, action) => {
    return Object.assign({}, state, { matches: [], live: null })
  }
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
