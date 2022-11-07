import React, { forwardRef } from "react";
import {
  Form,
  Modal,
  Select,
  Input,
  Radio,
  DatePicker,
  Descriptions
} from "antd";

const { Option } = Select;

function openCityForm(props, ref) {
  let {
    handleCancel,
    handleOk,
    title,
    okText,
    cancelText,
    visible,
    modalType,
    selectedRows
  } = props;

  const userState = {
    1: "咸鱼一条",
    2: "风华浪子",
    3: "北大才子",
    4: "百度FE",
    5: "创业者"
  };

  console.log("selectedRows", selectedRows);
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {modalType === "addOrEditUser" ? (
        <Form
          // form={form}
          ref={ref}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                message: "用户名不能为空"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sex"
            label="性别"
            rules={[
              {
                required: true,
                message: "请选择性别"
              }
            ]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="state"
            label="状态"
            rules={[
              {
                required: true,
                message: "请选择状态"
              }
            ]}
          >
            <Select placeholder="全部">
              <Option value="">全部</Option>
              <Option value={1}>咸鱼一条</Option>
              <Option value={2}>风华浪子</Option>
              <Option value={3}>北大才子一枚</Option>
              <Option value={4}>百度FE</Option>
              <Option value={5}>创业者</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="birthday"
            label="生日"
            rules={[
              {
                required: true,
                message: "请记录生日"
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="address"
            label="联系地址"
            rules={[
              {
                required: true,
                message: "请输入练习地址"
              }
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Form>
      ) : (
        ""
      )}

      {modalType === "detailsOrDeleteUser" ? (
        <Descriptions layout="vertical">
          <Descriptions.Item label="用户名">
            {selectedRows[0]?.username}
          </Descriptions.Item>
          <Descriptions.Item label="性别">
            {selectedRows[0]?.sex === 1 ? "男" : "女"}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            {userState[selectedRows[0]?.state]}
          </Descriptions.Item>
          <Descriptions.Item label="生日">
            {selectedRows[0]?.birthday}
          </Descriptions.Item>
          <Descriptions.Item label="联系地址">
            {selectedRows[0]?.address}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        ""
      )}
    </Modal>
  );
}

export default forwardRef(openCityForm);
