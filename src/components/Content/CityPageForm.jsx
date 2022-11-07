import React, { forwardRef } from "react";
import { Form, Select, Button, DatePicker, Input } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

function CityPageForm(props, ref) {
  const { queryButton, resetButton } = props;

  return (
    <Form ref={ref} layout="inline">
      {props.type === "user" ? (
        <>
          <Form.Item label="用户名" name="user_name">
            <Input style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="手机号" name="mobile_phone">
            <Input style={{ width: 120 }} />
          </Form.Item>
          <Form.Item label="入职日期" name="date_on_board">
            <DatePicker />
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item name="name" label="城市" initialValue="all">
            <Select style={{ width: 90 }}>
              <Option value="all">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          </Form.Item>
        </>
      )}
      {props.type === "order" ? (
        <>
          <Form.Item name="begin_time" label="订单时间">
            <RangePicker />
          </Form.Item>
          <Form.Item name="status" label="订单状态" initialValue="all">
            <Select style={{ width: 100 }}>
              <Option value="all">全部</Option>
              <Option value={1}>进行中</Option>
              <Option value={2}>结束行程</Option>
            </Select>
          </Form.Item>
        </>
      ) : (
        ""
      )}
      {props.type === "bikeMap" ? (
        <>
          <Form.Item name="begin_time" label="订单时间">
            <RangePicker />
          </Form.Item>
          <Form.Item name="status" label="订单状态" initialValue="all">
            <Select style={{ width: 100 }}>
              <Option value="all">全部</Option>
              <Option value={1}>进行中</Option>
              <Option value={2}>结束行程</Option>
            </Select>
          </Form.Item>
        </>
      ) : (
        ""
      )}
      {props.type === "city" ? (
        <>
          <Form.Item name="mode" label="用车模式" initialValue="all">
            <Select style={{ width: 140 }}>
              <Option value="all">全部</Option>
              <Option value={1}>指定停车点模式</Option>
              <Option value={2}>禁停区模式</Option>
            </Select>
          </Form.Item>
          <Form.Item name="op_mode" label="营运模式" initialValue="all">
            <Select style={{ width: 80 }}>
              <Option value="all">全部</Option>
              <Option value={1}>自营</Option>
              <Option value={2}>加盟</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="franchisee_state"
            label="加盟授权状态"
            initialValue="all"
          >
            <Select style={{ width: 90 }}>
              <Option value="all">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
            </Select>
          </Form.Item>
        </>
      ) : (
        ""
      )}

      <Button type="primary" style={{ marginLeft: 10 }} onClick={queryButton}>
        查询
      </Button>
      <Button onClick={resetButton}>重置</Button>
    </Form>
  );
}

export default forwardRef(CityPageForm);
