import fetch from 'isomorphic-fetch';
import requestForgotPassword from './requestForgotPassword';
import forgotPasswordError from './forgotPasswordError';
import forgotPasswordSuccess from './forgotPasswordSuccess';
import config from 'config';

module.exports = function(postData) {
  return (dispatch, getState) => {
    dispatch(requestForgotPassword())

    //dispatch(forgotPasswordSuccess(Date.now()))
    //dispatch(resetForgotPasswordForm())
    const language = getState().appConfig.lang;
    return fetch(`${config.hostname}/${language}/companion/reset-password/request`,  {
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
          json => dispatch(forgotPasswordError(json))
        )
        return;
      }
      response.json().then(
        dispatch(forgotPasswordSuccess(Date.now()))
      )
    })
    .catch(err => dispatch(forgotPasswordError(err)))

  }
};
