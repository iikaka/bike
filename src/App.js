import React, { Component } from 'react';

export default class App extends Component{
  render(){
    return (
      <div>
        {/* 可以加载所有的组件 */}
        {this.props.children}
      </div>
    )
  }
}