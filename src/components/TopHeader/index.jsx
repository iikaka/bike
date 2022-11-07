import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";

const { Header } = Layout;

export default function TopHeader() {
  // 控制小按钮的状态
  const [collapsed, setCollapsed] = useState(false);

  // 点击控制小按钮状态
  const handleCollapsedClick = () => {
    setCollapsed(!collapsed);
  };

  // 创建history对象
  const history = useHistory();

  // 点击退出
  const handleBackClick = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px"
      }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={handleCollapsedClick} />
      ) : (
        <MenuFoldOutlined onClick={handleCollapsedClick} />
      )}

      <div className={styles.text_right}>
        <span>欢迎kk</span>
        <a href="#/home" style={{ marginLeft: 10 }} onClick={handleBackClick}>
          退出
        </a>
      </div>
    </Header>
  );
}
