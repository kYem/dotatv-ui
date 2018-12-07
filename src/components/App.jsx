import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from 'material-ui'
import { darkBaseTheme, getMuiTheme } from 'material-ui/styles/index'

const muiTheme = {
  button: { height: 38 },
}

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  static shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <React.StrictMode>
          <div style={{ height: '100%' }}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
              <Router history={browserHistory} children={this.props.routes}/>
            </MuiThemeProvider>
          </div>
        </React.StrictMode>
      </Provider>
    )
  }
}

export default App
