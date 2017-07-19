import {LIVE_MATCHES} from '../routes/Counter/modules/counter'

const config = require('../../project.config')

module.exports = function (parner = 0) {
  return (dispatch, getState) => {
    fetch(`${config.apiHostname}/live?partner=${partner}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        Accept: 'application/json',
      })
    })
      .then((response) => {
        if (response.status !== 200) {
          response.json().then(json => console.log(json))
          return
        }
        response.json().then(
          (json) => {
            dispatch({ type: LIVE_MATCHES, payload: json.game_list })
          }
        )
      })
  }
}
