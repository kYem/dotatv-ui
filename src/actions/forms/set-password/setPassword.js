import fetch from 'isomorphic-fetch';
import requestSet from './requestSet';
import setError from './setError';
import setSuccess from './setSuccess';
import config from 'config';

module.exports = function(postData, callback) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestSet());
    return fetch(`${config.hostname}/${language}/companion/user/change-password`,  {
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
          json => {
            dispatch(setError(json));
            callback();
          }
        )
        return;
      }
      response.json().then(
        () => {
          dispatch(setSuccess(Date.now()));
          callback();
        }
      )

    })
    .catch(err => dispatch(setError(err)))

  }
};
