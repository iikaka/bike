import { Row, Col } from 'antd'
import React, { Component } from 'react'
import  Utils from '../../utils/utils'
import axios from '../../axios/axios'
import './header.less'
export default class header extends Component {
    state={
        userName:'kk',
        sysTime:'',
        wea:'',
        wea_img:''
    }
    // 渲染出时间和天气
    componentWillMount(){
        this.getTime()
        this.getWeatherAPIData()
    }
    //获得时间
    getTime(){
        setInterval(()=>{
            let sysTime=Utils.formateDate(new Date())
            this.setState({
                sysTime
            })
        },1000)
    }
    //获得天气 S1Bbcgwi6OXqJz9Sa
    getWeatherAPIData(){
        let city='石家庄'
        axios.jsonp({
            url: `https://www.tianqiapi.com/api?version=v1&appid=21375891&appsecret=fTYv7v5E&city=${encodeURIComponent(city)}`
        }).then(res=>{
            if(res){
                let wea=res.data[0].wea
                let wea_img=res.data[0].wea_img    
                console.log(res.data[0]);
                this.setState({
                    wea,
                    wea_img:"/assets/gif/"+wea_img+".gif"
                })
            }
        })
    }
    render() {
        return (
        <div className='header'>
            <Row className='header-top'>
                <Col span={24}>
                    <a href='#'>welcome ,{this.state.userName}</a>
                </Col>
            </Row>
            <Row className='breadcrumb'>
                <Col span={3} className='breadcrumb-title'>导航</Col>
                <Col span={21} className='breadcrumb-right'>
                    <span className='time'>{this.state.sysTime}</span>
                    <span className='weather'>{this.state.wea} </span>
                    <img src={this.state.wea_img}/>
                </Col>
            </Row>
        </div>
        )
    }
}
