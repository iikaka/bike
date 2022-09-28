import React, { Component } from 'react'
import { HashRouter,Route, Switch  } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Admin from './admin'
import Button from './pages/ui/Button'
import NoMatch from './pages/nomatch/NoMatch'
export default class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <App>
            <Route path='/login' component={Login} ></Route>
            <Route path='/admin' render={()=>
              <Admin>
                <Switch>
                  <Route path='/admin/ui/buttons' component={Button}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Admin>
            }>
            </Route>
          </App>
        </HashRouter>
      </div>
    )
  }
}
