// ------------------------------------
// Constants
// ------------------------------------
// @flow
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const LIVE_MATCHES = 'LIVE_MATCHES'
const config = require('../../../../project.config')

// Test data
const proPlayers = require('../../../data/pro-players.json')
const heroes = require('../../../data/heroes.json')
const dummyData = require('../../../data/game-list.json')
const live = require('../../../data/real-time.json')

// ------------------------------------
// Actions
// ------------------------------------
export function increment(value: number = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export function getLiveMatches(partner: number = 0) {
  return (dispatch, getState) => {
    dispatch({ type: LIVE_MATCHES, payload: dummyData.game_list })
  }
}

export function getLiveMatch(serverSteamId: string) {
  return live.match.server_steam_id === serverSteamId ? live : null;
}

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

export function matchToPlayers(match) {

  const liveData = getLiveMatch(match.server_steam_id)
  let livePlayersData

  if (liveData) {
    const teams = liveData.teams;
    livePlayersData = teams[0].players.concat(teams[1].players)
  }

  match.players.map(player => {

    if (livePlayersData) {
      const data = livePlayersData.find(livePlayer => livePlayer.accountid === player.account_id)
      if (data) {
        player = Object.assign(player, data)
      }
    }
    return mapAccountToPlayer(player)
  })


  if (liveData) {
    
  }

  return match
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => state.counter + action.payload,
  [LIVE_MATCHES] : (state, action) => {
    action.payload.map(match => matchToPlayers(match))
    return Object.assign({}, state, { matches: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  counter: 0,
  matches: []
}
export default function counterReducer(state: { counter: number, matches: [] } = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
