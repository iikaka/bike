import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class main extends Component {
  render() {
    return (
      <div>
        <p>main</p>
            <Link to='/main/test'>嵌套1</Link>
            <br />
            <Link to='/main/okk'>嵌套2</Link>
        <hr />
        {this.props.children}
      </div>
    )
  }
}
