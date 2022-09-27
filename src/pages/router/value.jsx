import React, { Component } from 'react'

export default class value extends Component {
  render() {
    return (
      <div>
        <p>Value</p>
        <p>动态路由的值:{this.props.location.search}</p>
      </div>
    )
  }
}
