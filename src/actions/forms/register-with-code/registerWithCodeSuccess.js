module.exports = function(timeStamp, postData) {
  return {
    type: 'REGISTER_WITH_CODE_SUCCESS',
    timeStamp,
    postData
  }
};
