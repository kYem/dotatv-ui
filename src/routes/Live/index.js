import {injectReducer} from '../../store/reducers'

export default(store) => ({
  path: 'live/:serverId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LiveContainer = require('./components/LiveView').default
      const reducer = require('./modules/liveReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'live', reducer })
      cb(null, LiveContainer)
    }, 'live')
  }
})
