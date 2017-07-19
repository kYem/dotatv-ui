import fetch from 'isomorphic-fetch';
import loginSuccess from './loginSuccess';
import loginError from './loginError';
import userUpdated from './userUpdated';
import config from 'config';

module.exports = function() {
  return (dispatch, getState) => {

    const language = getState().appConfig.lang;
    return fetch(`${config.hostname}/${language}/companion/user`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status !== 200) {
          // dispatch(loginError(response.status))
          return;
        }
        response.json().then(
          json => {
            dispatch(loginSuccess(Date.now()));

            if(json.hasOwnProperty('user')){
              dispatch(userUpdated(json.user));
            }
              
          }
        )
      })

  }
};
