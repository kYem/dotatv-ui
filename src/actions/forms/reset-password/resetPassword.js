import fetch from 'isomorphic-fetch';
import requestReset from './requestReset';
import resetError from './resetError';
import resetSuccess from './resetSuccess';
import config from 'config';

module.exports = function(postData, token) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestReset())
    return fetch(`${config.hostname}/${language}/companion/change-password/${token}`,  {
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
          json => dispatch(resetError(json))
        )
        return;
      }
      response.json().then(
        dispatch(resetSuccess(Date.now()))
      )
    })
    .catch(err => dispatch(resetError(err)))

  }
};
