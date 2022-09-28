import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import NavLeft from './components/navLeft/navLeft';
import Home from './pages/home/home'
import './style/common.less';

export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <NavLeft/>
        </Col>
        <Col span={20} className="main">
          <Header />
          <div className="content">
            {/* <Home/> */}
            {this.props.children}
          </div>
          <Footer />
        </Col>
      </Row>
    )
  }
}
