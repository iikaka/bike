import React, { Component } from 'react'

export default class info extends Component {
  render() {
    return (
      <div>
        <p>动态路由跳转</p>
        <p>动态路由的值：{this.props.match.params.value}</p>
    </div>
    )
  }
}
   