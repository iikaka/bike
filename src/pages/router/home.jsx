import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class home extends Component {
  render() {
    return (
      <div>
        <ul>
            <li>
                <Link to='/main' >首页</Link>
            </li>
            <li>
                <Link to='/about'>about页</Link>
            </li>
            <li>
                <Link to='/content'>content页</Link>
            </li>
            
        </ul>
        <hr />
        {this.props.children}
      </div>
    )
  }
}
