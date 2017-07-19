module.exports = function(timeStamp, mediaItems) {
  return {
    type: 'TIMELINE_MEDIA_SUCCESS',
    timeStamp,
    mediaItems
  }
};
