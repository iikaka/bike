import React, { Component } from 'react'
import { HashRouter, Route, Switch, Link } from 'react-router-dom'
import Home from './pages/router/home'
import Main from './pages/router/main'
import Info from './pages/router/info'
import About from './pages/router/about'
import Content from './pages/router/content'
import Value from './pages/router/value'
import NoMatch from './pages/router/noMatch'
export default class IRouter extends Component {
  render() {
    return (
      <div>
        <HashRouter>
              <Home>
                <Switch>
                <Route path='/main'  render={ ()=>
                  <Main>
                     <Route path='/main/:value' component={Info}></Route>
                  </Main>
                }>
                </Route>
                <Route path='/about' component={About}></Route>
                <Route path='/content' render={ ()=>
                <Content>
                     <Route path='/content' component={Value}></Route>
                </Content>
              }></Route>
              <Route  component={NoMatch}></Route>
              </Switch>
              </Home>
        </HashRouter>
      </div>
    )
  }
}
