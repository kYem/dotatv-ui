import { injectReducer } from '../../store/reducers'

export default(store) => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LiveContainer = require('./components/HomeView').default
      const reducer = require('./modules/homeReducer').default
      injectReducer(store, { key: 'home', reducer })
      cb(null, LiveContainer)
    }, 'home')
  }
})
