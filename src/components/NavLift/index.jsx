import React from "react";
import {
  RightOutlined,
  HomeOutlined,
  BorderlessTableOutlined,
  FormOutlined,
  FileTextOutlined,
  CarOutlined,
  AreaChartOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import menuConfig from "../../config/menuConfig";
import { useHistory } from "react-router-dom";

const { Sider } = Layout;

export default function NavLift() {
  // icon与导航项映射表
  const iconList = {
    "/home": <HomeOutlined />,
    "/form": <FormOutlined />,
    "/table": <BorderlessTableOutlined />,
    "/rich": <FileTextOutlined />,
    "/city": <RightOutlined />,
    "/order": <RightOutlined />,
    "/user": <RightOutlined />,
    "/bikeMap": <CarOutlined />,
    "/echarts": <AreaChartOutlined />,
    "/permission": <RightOutlined />
  };

  // 创建history对象
  const history = useHistory();
  console.log('history',history);
  // 点击menu时触发
  // 点击时会传入一个当前点击的对象
  const handleMenuClick = (item) => {
    history.push(item.key);
  };

  // 将地址储存到变量中
  let menuPath = [history.location.pathname];
  console.log('@@@',menuPath);
  // 自动展开选中项，需要获取到第一次菜单内容
  let openMenuPath = ["/" + menuPath[0].split("/")[1]];

  // 封装一个递归函数遍历侧边栏的导航
  const navMenuList = (menuList) => {
    return menuList.map((item) => {
      if (item.children) {
        return {
          key: item.key,
          label: item.title,
          icon: iconList[item.key],
          children: navMenuList(item.children)
        };
      }
      return { key: item.key, label: item.title, icon: iconList[item.key] };
    });
  };

  const items = navMenuList(menuConfig);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={false}
      style={{ overflow: "auto" }}
    >
      <div className="logo">kk主页</div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={menuPath}
        defaultOpenKeys={openMenuPath}
        items={items}
        onClick={handleMenuClick}
      />
    </Sider>
  );
}
