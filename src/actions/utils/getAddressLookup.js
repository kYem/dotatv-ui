import fetch from 'isomorphic-fetch';
import config from 'config';

module.exports = function(postData, errorCallback, successCallback) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    //dispatch(requestProject())
    return fetch(`${config.hostname}/${language}/companion/address?${postData}`,  {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(
            json => errorCallback(json)
            //json => dispatch(projectError(json))
          )
          return;
        }
        response.json().then(
          json => successCallback(json)
        )
      })
      .catch(err => dispatch())

  }
};
