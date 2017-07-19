import fetch from 'isomorphic-fetch';
import config from 'config';

module.exports = function(postData, callback) {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    const projectId = getState().project.projectId;
    //dispatch(requestProject())

    return fetch(`${config.hostname}/companion/${projectId}/attendee/register`,  {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(postData),
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          response.json().then(
            json => callback(true, json)
            //json => dispatch(projectError(json))
          )
          return;
        }
        response.json().then(
          json => callback(false, json)
        )
      })
      .catch(err => dispatch())

  }
};
