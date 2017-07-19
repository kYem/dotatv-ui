import fetch from 'isomorphic-fetch';
import requestLogin from './requestLogin';
import loginError from './loginError';
import loginSuccess from './loginSuccess';
import config from 'config';

module.exports = function(postData) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestLogin())
    //TODO Store current values
    return fetch(`${config.hostname}/${language}/login_check`,  {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(postData),
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
