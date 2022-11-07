import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <span style={{ fontSize: 20 }}>欢迎登陆</span>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        style={{ marginTop: 20 }}
        // onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            onClick={() => {
              localStorage.setItem("token", "111");
              history.push("/home");
            }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
