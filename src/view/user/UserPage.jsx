import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Button, Table, Modal } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import CityPageForm from "../../components/Content/CityPageForm";
import UserPageModal from "../../components/Content/UserPageModal";

export default function CityPage() {
  const [dataSource, setDataSource] = useState([]);

  // 选择对应的id
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 选择对应的item
  const [selectedRows, setSelectedRows] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  // 设置title
  const [modalTitle, setModalTitle] = useState("");

  const [modalType, setModalType] = useState("");

  useEffect(() => {
    axios.get("/user/list").then((res) => {
      // console.log("res.data.result.item_list", res.data.result.item_list);
      setDataSource(res.data.result.item_list);
    });
  }, []);

  // 创建ref发送到子组件拿到子组件dom对象
  const openCityForm = useRef(null);

  // 模态框Form表单
  const userModelForm = useRef(null);

  const columns = [
    {
      title: "id",
      dataIndex: "id"
    },
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女";
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      render(state) {
        return {
          1: "咸鱼一条",
          2: "风华浪子",
          3: "北大才子一枚",
          4: "百度FE",
          5: "创业者"
        }[state];
      }
    },
    {
      title: "爱好",
      dataIndex: "interest",
      render(interest) {
        return {
          1: "游泳",
          2: "打篮球",
          3: "踢足球",
          4: "跑步",
          5: "爬山",
          6: "骑行",
          7: "桌球",
          8: "麦霸"
        }[interest];
      }
    },
    {
      title: "生日",
      dataIndex: "birthday"
    },
    {
      title: "联系地址",
      dataIndex: "address"
    },
    {
      title: "早起时间",
      dataIndex: "time"
    }
  ];

  // 点击添加员工
  const handleAddUser = () => {
    setIsVisible(true);
    setModalTitle("添加员工");
    setModalType("addOrEditUser");
  };
  // 点击编辑员工
  const handleEditUser = () => {
    if (!selectedRowKeys[0]) {
      Modal.info({
        title: "请选择员工"
      });
      return;
    }
    setIsVisible(true);
    setModalTitle("编辑员工");
    setModalType("addOrEditUser");

    // 需要改为异步执行，否则第一次点击拿不到值
    setTimeout(() => {
      if (selectedRows[0]) {
        const { address, birthday, sex, username, state } = selectedRows[0];
        userModelForm.current.setFieldsValue({
          username,
          address,
          birthday: moment(birthday),
          sex,
          state
        });
      }
    }, 0);
  };

  // 点击员工详情
  const handleUserDetails = () => {
    if (!selectedRowKeys[0]) {
      Modal.info({
        title: "请选择员工"
      });
      return;
    }
    setIsVisible(true);
    setModalTitle("员工详情");
    setModalType("detailsOrDeleteUser");
  };
  // 点击删除员工
  const handleDeleteUser = () => {
    if (!selectedRowKeys[0]) {
      Modal.info({
        title: "请选择员工"
      });
      return;
    }
    setIsVisible(true);
    setModalTitle("删除员工");
    setModalType("detailsOrDeleteUser");
  };

  // 取消按钮
  const handleCancel = () => {
    setIsVisible(false);
    if (modalType === "addOrEditUser") {
      userModelForm.current.resetFields();
    }
    setModalType("");
  };

  // 确认按钮
  const handleOk = () => {
    if (modalTitle === "添加员工") {
      userModelForm.current.validateFields().then((res) => {
        console.log("res", res);
        console.log("dataSource", dataSource);
        const newUser = {
          id: dataSource[dataSource.length - 1].id + 1,
          birthday: moment(res.birthday).format("YYYY-MM-DD"),
          address: res.address,
          interest: 6,
          time: "09:00:00",
          username: res.username,
          sex: res.sex,
          state: res.state,
          isMarried: 0
        };

        setDataSource([...dataSource, newUser]);
        userModelForm.current.resetFields();
      });
    }

    if (modalTitle === "编辑员工") {
      userModelForm.current.validateFields().then((res) => {
        console.log("res", res);
        setDataSource(
          dataSource.map((item) => {
            if (selectedRowKeys[0] === item.id) {
              // 找到要修改的对象后更改选中对象的状态
              setSelectedRows([
                {
                  ...item,
                  username: res.username,
                  sex: res.sex,
                  state: res.state,
                  address: res.address,
                  birthday: moment(res.birthday).format("YYYY-MM-DD")
                }
              ]);
              // 找到要修改的对象后更改页面的状态
              return {
                ...item,
                username: res.username,
                sex: res.sex,
                state: res.state,
                address: res.address,
                birthday: moment(res.birthday).format("YYYY-MM-DD")
              };
            }
            return item;
          })
        );
        userModelForm.current.resetFields();
      });
    }

    if (modalTitle === "删除员工") {
      setDataSource(
        dataSource.filter((item) => {
          if (item.id === selectedRowKeys[0]) {
            return false;
          }
          return true;
        })
      );
      setSelectedRows([]);
      setSelectedRowKeys([]);
    }
    setIsVisible(false);
    setModalType("");
  };

  // 点击查询按钮
  const queryButton = useCallback(() => {
    openCityForm.current.validateFields().then((res) => {
      // console.log("res", res);
    });
  }, []);

  // 点击重置按钮
  const resetButton = useCallback(() => {
    openCityForm.current.resetFields();
  }, []);

  return (
    <div>
      <Card>
        <CityPageForm
          type="user"
          ref={openCityForm}
          queryButton={queryButton}
          resetButton={resetButton}
        />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          添加员工
        </Button>
        <Button type="primary" icon={<EditOutlined />} onClick={handleEditUser}>
          编辑员工
        </Button>
        <Button
          type="primary"
          icon={<CopyOutlined />}
          onClick={handleUserDetails}
        >
          员工详情
        </Button>
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={handleDeleteUser}
        >
          删除员工
        </Button>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowSelection={{
            type: "radio",
            onChange(selectedRowKeys, selectedRows) {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
            selectedRowKeys
          }}
          onRow={(record) => {
            return {
              onClick() {
                // console.log("record.id", record.id);
                setSelectedRowKeys([record.id]);
                setSelectedRows([record]);
              }
            };
          }}
          bordered={true}
          pagination={{
            pageSize: 10
          }}
          rowKey={(item) => item.id}
        />
      </Card>

      <UserPageModal
        ref={userModelForm}
        visible={isVisible}
        title={modalTitle}
        selectedRows={selectedRows}
        modalType={modalType}
        okText="确认"
        cancelText="取消"
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}
