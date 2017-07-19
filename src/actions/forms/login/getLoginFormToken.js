import fetch from 'isomorphic-fetch';
import storeLoginFormToken from './storeLoginFormToken';
import config from 'config';

module.exports = function() {
  return (dispatch, getState) => {

    const language = getState().appConfig.lang;
    return fetch(`${config.hostname}/${language}/companion/user/login/token`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
    .then(response => {
      if (response.status !== 200) {
        //dispatch(loginError(response.status))
        return;
      }
      response.json().then(
        json => dispatch(storeLoginFormToken(json))

      )
    })

  }
};
