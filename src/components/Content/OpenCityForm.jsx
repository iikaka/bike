import React, { forwardRef } from "react";
import { Form, Select } from "antd";

const { Option } = Select;

function openCityForm(props, ref) {
  return (
    <Form
      // form={form}
      ref={ref}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ modifier: "public" }}
    >
      <Form.Item
        name="name"
        label="选择城市"
        rules={[
          {
            required: true,
            message: "请选择城市"
          }
        ]}
      >
        <Select placeholder="全部">
          <Option value="">全部</Option>
          <Option value="1">北京市</Option>
          <Option value="2">天津市</Option>
          <Option value="3">深圳市</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="op_mode"
        label="运营模式"
        rules={[
          {
            required: true,
            message: "请选择运营模式"
          }
        ]}
      >
        <Select placeholder="全部">
          <Option value="">全部</Option>
          <Option value="1">指定停车点模式</Option>
          <Option value="2">禁停区模式</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="mode"
        label="用车模式"
        rules={[
          {
            required: true,
            message: "请选择用车模式"
          }
        ]}
      >
        <Select placeholder="全部">
          <Option value="">全部</Option>
          <Option value="1">自营</Option>
          <Option value="2">加盟</Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default forwardRef(openCityForm);
