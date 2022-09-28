import React, { Component } from 'react'
import { Card, Button, Dropdown, Menu } from 'antd'
import { SearchOutlined, DownloadOutlined, EditOutlined, DeleteOutlined, PoweroffOutlined } from '@ant-design/icons';
import './ui.less'
export default class Buttons extends Component {
    state={
        loadings:'',
        iconLoading: false,
    }
  render() {
    const enterLoading=()=>{
        this.setState({iconLoading:true})
    }
    const onMenuClick = (e) => {
        console.log('click', e);
      };
      const menu = (
        <Menu
          onClick={onMenuClick}
          items={[
            {
              key: '1',
              label: '1st item',
            },
            {
              key: '2',
              label: '2nd item',
            },
            {
              key: '3',
              label: '3rd item',
            },
          ]}
        />
      );
    return (
      <div>
        <Card title="按钮类型" extra={<a href="#">More</a>} className='card-wrap'>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <Button type="link">Link</Button>
        </Card>
        <Card title="图标按钮" extra={<a href="#">More</a>} className='card-wrap'>
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            <Button icon={<EditOutlined />}>编辑</Button>
            <Button icon={<DeleteOutlined />}>删除</Button>
            <Button type='primary' icon={<SearchOutlined />}>搜索</Button>
            <Button type='primary' icon={< DownloadOutlined />}>下载</Button>
        </Card>
        <Card title="加载中按钮" extra={<a href="#">More</a>} className='card-wrap'>
            <Button type="primary" loading >
                Loading
            </Button>
            <Button type="primary" icon={< PoweroffOutlined />} loading={this.state.iconLoading} onClick={() => enterLoading(0)}>
                Click me!
            </Button>
        </Card>
        <Card title="不可用类型" extra={<a href="#">More</a>} className='card-wrap'>
            <Button type="text">Text</Button>
            <Button type="text" disabled>
            Text(disabled)
            </Button>
            <Button ghost>Ghost</Button>
            <Button ghost disabled>
                Ghost(disabled)
            </Button>
        </Card>
        <Card title="幽灵按钮" extra={<a href="#">More</a>} className='card-wrap' style={{background:"gray"}}>
            <Button type="primary" ghost>
                Primary
            </Button>
            <Button ghost>Default</Button>
            <Button type="dashed" ghost>
                Dashed
            </Button>
            <Button type="primary" danger ghost>
                Danger
            </Button>
        </Card>
        <Card title="block按钮" extra={<a href="#">More</a>} className='card-wrap'>
            <Button type="primary" block>
            Primary
            </Button>
            <Button block>Default</Button>
            <Button type="dashed" block>
            Dashed
            </Button>
        </Card>
        <Card title="多个按钮组合" extra={<a href="#">More</a>} className='card-wrap'>
            {/* 按钮组合使用时，推荐使用 1 个主操作 + n 个次操作，3 个以上操作时把更多操作放到 */}
            <Button type="primary">primary</Button>
            <Button>secondary</Button>
            <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
        </Card>
      </div>
    )
  }
}
