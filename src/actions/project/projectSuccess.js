module.exports = function(timeStamp, data) {
  return {
    type: 'PROJECT_SUCCESS',
    timeStamp,
    data
  }
};
