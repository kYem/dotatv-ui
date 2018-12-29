import React from 'react'
import 'typeface-roboto' // eslint-disable-line
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import HomeView from '../routes/Home/components/HomeView'
import createStore from '../store/createStore'
import '../styles/main.scss'

const store = createStore(window.__INITIAL_STATE__)

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React, { include: [/^PlayerTable/]})
}

class App extends React.Component {

  static shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={store}>
        <React.StrictMode>
          <div style={{ height: '100%' }}>
            <Router>
              <div className='container'>
                <div className='navigation'>
                  <h1>Dota Tv</h1>
                  <NavLink to='/' activeClassName='page-layout__nav-item--active'>Home</NavLink>
                </div>
                <div className='page-layout__viewport'>
                  <Route path='/' component={HomeView} />
                </div>
              </div>
            </Router>
          </div>
        </React.StrictMode>
      </Provider>
    )
  }
}

export default App
