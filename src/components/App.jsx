import React from 'react'
import { Route } from 'react-router'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui'
import { darkBaseTheme, getMuiTheme } from 'material-ui/styles/index'
import { BrowserRouter, Link } from 'react-router-dom'
import HomeView from '../routes/Home/components/HomeView'
import createStore from '../store/createStore'
import '../styles/main.scss'

const store = createStore(window.__INITIAL_STATE__)
const muiTheme = {
  button: { height: 38 },
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
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
              <BrowserRouter>
                <div className='container'>
                  <div className='navigation'>
                    <h1>Dota Tv</h1>
                    <Link to='/' activeClassName='page-layout__nav-item--active'>Home</Link>
                  </div>
                  <div className='page-layout__viewport'>
                    <Route path='/' component={HomeView} />
                  </div>
                </div>
              </BrowserRouter>
            </MuiThemeProvider>
          </div>
        </React.StrictMode>
      </Provider>
    )
  }
}

export default App
