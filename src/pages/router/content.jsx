import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class content extends Component {
  render() {
    return (
      <div>
        <p>content</p>
        <Link to="/content?a=1&b=2">嵌套路由</Link>
        <hr />
        {this.props.children}
    </div>
    )
  }
}
