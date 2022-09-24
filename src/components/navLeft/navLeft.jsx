import React, { Component } from 'react'
import { Menu } from 'antd'
import './navLeft.less'
import MenuList from '../../config/menuConfig'
const {SubMenu} =Menu


export default class navLeft extends Component {
    state={
        menuTreeNode:''
    }
    //获得菜单列表
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuList)
        this.setState({
            menuTreeNode
        })
    }
    //渲染菜单
    renderMenu=data=>{
        return data.map((item)=>{
            if(item.children){
                return (
                   <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                   </SubMenu> 
                )
            }
            return(
                <Menu.Item key={item.key} title={item.title}>
                    {item.title}
                </Menu.Item>
            )
        })
    }
  render() {
    return (
      <div>
        <div className='logo'>
            <img src="/assets/logo-1.svg" />
            <h1>小牧童智能垃圾桶</h1>
        </div>
        <Menu theme="dark">
            {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
