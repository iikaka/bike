import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import NavLeft from './components/navLeft/navLeft';
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
         content
          <Footer />
        </Col>
      </Row>
    )
  }
}
