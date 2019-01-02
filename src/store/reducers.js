import { combineReducers } from 'redux'
import home from '../routes/Home/modules/homeReducer'
import live from '../routes/Live/modules/liveReducer'
import streamReducer from '../routes/streams/streamReducer'

const makeRootReducer = asyncReducers => combineReducers({
  home,
  live,
  streams: streamReducer,
  ...asyncReducers
})

export default makeRootReducer
