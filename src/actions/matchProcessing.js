// @flow

const config = require('../../project.config')
const proPlayers = require('../data/pro-players.json')
const heroes = require('../data/heroes.json')

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
  if (!match) {
    return match
  }
  match.players.map(player => mapAccountToPlayer(player))
  return match
}

export function getKnownPlayers(players) {
  return players.filter(player => player.is_pro)
}

export function gameTime(time: number) {
  const minutes = Math.floor(time / 60).toFixed(0)
  const seconds = (time - (minutes * 60)).toFixed(0)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${formattedSeconds}:${formattedMinutes}`
}