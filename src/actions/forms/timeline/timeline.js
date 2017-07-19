import fetch from 'isomorphic-fetch';
import requestTimelineMedia from './requestTimelineMedia';
import timelineMediaError from './timelineMediaError';
import timelineMediaSuccess from './timelineMediaSuccess';
import config from 'config';

module.exports = function() {
  return (dispatch, getState) => {
    const language = getState().appConfig.lang;
    dispatch(requestTimelineMedia())
    return fetch(`${config.hostname}/${language}/companion/media`,  {
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
          json => dispatch(timelineMediaError(json))
        )
        return;
      }
      response.json().then(
        json => dispatch(timelineMediaSuccess(Date.now(), json))
      )
    })
    .catch(err => dispatch(timelineMediaError(err)))

  }
};
