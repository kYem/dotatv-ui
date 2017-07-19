import projectError from './projectError';
import projectSuccess from './projectSuccess';
const config = require('../../../project.config')

module.exports = function(postData) {
  return (dispatch, getState) => {
    return fetch(`${config.apiHostname}/live`,  {
      method: 'GET',
      credentials: 'same-origin',
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        console.log(response);
        // if (response.status !== 200) {
        //   response.json().then(
        //     json => dispatch(projectError(json))
        //   )
        //   return;
        // }
        // response.json().then(
        //   json => {
        //     dispatch(projectSuccess(Date.now(), json));
        //   }
        // )
      })
      .catch(err => dispatch(projectError(err)))

  }
};
