import fetch from 'isomorphic-fetch';
import requestRegisterWithCode from './requestRegisterWithCode';
import registerWithCodeError from './registerWithCodeError';
import registerWithCodeSuccess from './registerWithCodeSuccess';
import manualUpdateEmailValue from '../registration/manualUpdateEmailValue';
import config from 'config';

module.exports = function(postData, projectCode) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestRegisterWithCode())
    return fetch(`${config.hostname}/${language}/companion/${projectCode}/attendee/code`,  {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(postData),
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => {
        if (response.status !== 200) {
          response.json().then(
            json => dispatch(registerWithCodeError(json))
          )
          return;
        }
        response.json().then(
          json => {
            dispatch(manualUpdateEmailValue(postData.email));
            dispatch(registerWithCodeSuccess(Date.now(), postData));
          }
        )
      })
      .catch(err => dispatch(registerWithCodeError(err)))

  }
};
