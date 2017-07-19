module.exports = function(timeStamp, qrCodes) {
  return {
    type: 'QR_CODES_SUCCESS',
    timeStamp,
    qrCodes
  }
};
