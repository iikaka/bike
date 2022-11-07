import React from "react";
import { Layout } from "antd";
import "./Admin.css";
import NavLift from "../components/NavLift";
import TopHeader from "../components/TopHeader";
import NavLiftRouter from "../components/NavLift/NavLiftRouter";

const { Content } = Layout;

export default function Admin() {
  return (
    <Layout>
      <NavLift />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto"
          }}
        >
          <NavLiftRouter />
        </Content>
      </Layout>
    </Layout>
  );
}
