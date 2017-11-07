// @flow
import fetch from 'isomorphic-fetch'

export const API_ERROR = 'API_ERROR'
export const LIVE_MATCH_DETAILS = 'LIVE_MATCH_DETAILS'
export const LIVE_MATCHES = 'LIVE_MATCHES'
export const MATCH_FINISHED = 'MATCH_FINISHED'

const config = require('../../project.config')

const DEFAULT_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin',
  headers: new Headers({
    Accept: 'application/json',
  })
}

function makeRequest(url, options, dispatch, dispatchType) {
  fetch(url, options)
    .then((response) => {
      const type = response.status !== 200 ? API_ERROR : dispatchType
      response.json().then((json) => {
        dispatch({ type, payload: json })
      })
    })
    .catch(err => dispatch({ type: API_ERROR, payload: err }))
}

export function getLiveMatches(partner = 0) {
  return dispatch => makeRequest(
      `${config.apiHostname}/live?partner=${partner}`,
      DEFAULT_OPTIONS,
      dispatch,
      LIVE_MATCHES
    )
}

const isMatchComplete = (json) => {
  const buildings = json.buildings
  if (!json.match || !buildings) {
    return true
  }

  return (buildings[17] && buildings[17].destroyed) || (buildings[35] && buildings[35].destroyed)
}

export function getLiveMatchDetails(serverSteamId) {
  return (dispatch, getState) =>
    fetch(`${config.apiHostname}/live/stats?server_steam_id=${serverSteamId}`, DEFAULT_OPTIONS)
      .then((response) => {
        response.json().then((json) => {
          const type = isMatchComplete(json) ? MATCH_FINISHED : LIVE_MATCH_DETAILS
          // If we still have match, update details otherwise get new live matches
          return dispatch({ type, payload: json })
        })
      })
      .catch(err => dispatch({ type: API_ERROR, payload: err }))
}
