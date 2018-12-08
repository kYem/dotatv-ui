import { combineReducers } from 'redux'
import home from '../routes/Home/modules/homeReducer'
import live from '../routes/Live/modules/liveReducer'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    home,
    live,
    ...asyncReducers
  })
}

export default makeRootReducer
