import fetch from 'isomorphic-fetch';
import requestLogin from './requestLogin';
import loginError from './loginError';
import loginSuccess from './loginSuccess';
import config from 'config';

module.exports = function(token) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestLogin())
    return fetch(`${config.hostname}/${language}/companion/s/${token}`,  {
      method: 'POST',
      credentials: 'same-origin',
      body: '',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status !== 200) {
          response.json().then(
            json => dispatch(loginError(json))
          )
          return;
        }
        response.json().then(
          dispatch(loginSuccess(Date.now()))
        )
      })
      .catch(err => dispatch(loginError(err)))

  }
};
