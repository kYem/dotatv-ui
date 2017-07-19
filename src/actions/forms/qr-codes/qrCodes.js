import fetch from 'isomorphic-fetch';
import requestQRCodes from './requestQRCodes';
import qrCodesError from './qrCodesError';
import qrCodesSuccess from './qrCodesSuccess';
import config from 'config';

module.exports = function(postData, projectCode) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    const projectId = getState().project.projectId;

    dispatch(requestQRCodes())
    return fetch(`${config.hostname}/${language}/companion/qr/${projectId}`,  {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status !== 200) {
          response.json().then(
            json => dispatch(qrCodesError(json))
          )
          return;
        }
        response.json().then(
          json => {
            dispatch(qrCodesSuccess(Date.now(), json));
          }
        )
      })
      .catch(err => dispatch(qrCodesError(err)))

  }
};
