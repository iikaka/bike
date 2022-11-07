import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Button, Table, Modal, Descriptions } from "antd";
import axios from "axios";
import CityPageForm from "../../components/Content/CityPageForm";

export default function CityPage() {
  const [dataSource, setDataSource] = useState([]);

  // 车辆信息
  const [bikeInfo, setBikeInfo] = useState({});

  // 查询按钮状态
  const [selectDataSource, setSelectDataSource] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  // 选中状态
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios.get("/order/list").then((res) => {
      setDataSource(res.data.result.item_list);
      setSelectDataSource(res.data.result.item_list);
    });
  }, []);

  // 创建ref发送到子组件拿到子组件dom对象
  const openCityForm = useRef(null);

  const columns = [
    {
      title: "订单编号",
      dataIndex: "order_sn"
    },
    {
      title: "车辆编号",
      dataIndex: "bike_sn"
    },
    {
      title: "用户名",
      dataIndex: "user_name"
    },
    {
      title: "手机号",
      dataIndex: "mobile"
    },
    {
      title: "里程",
      dataIndex: "distance",
      render(distance) {
        return distance / 1000 + "Km";
      }
    },
    {
      title: "行驶时长",
      dataIndex: "total_time"
    },
    {
      title: "状态",
      dataIndex: "status",
      render(status) {
        return status === 1 ? "进行中" : "结束行程";
      }
    },
    {
      title: "开始时间",
      dataIndex: "start_time"
    },
    {
      title: "结束时间",
      dataIndex: "end_time"
    },
    {
      title: "订单金额",
      dataIndex: "total_fee"
    },
    {
      title: "实付金额",
      dataIndex: "user_pay"
    }
  ];

  // 点击结束订单
  const handleOpenCity = () => {
    if (!selectedRows[0]) {
      Modal.info({
        title: "请选择用户"
      });
      return;
    }
    axios.get("/order/ebike_info").then((res) => {
      setBikeInfo(res.data.result);
    });
    setIsVisible(true);
  };

  // 开通城市Modal取消按钮
  const handleCancel = () => {
    setIsVisible(false);
  };

  // 确认按钮
  const handleOk = () => {
    setIsVisible(false);
  };

  // 点击查询按钮
  const queryButton = useCallback(() => {
    openCityForm.current.validateFields().then((res) => {
      console.log("res", res);
      setSelectDataSource(
        dataSource.filter((item) => {
          return res.status === item.status;
        })
      );
    });
  }, [dataSource]);

  // 点击重置按钮
  const resetButton = useCallback(() => {
    openCityForm.current.resetFields();
  }, []);

  // 点击行触发
  const onRowClick = (record) => {
    setSelectedRowKeys([record.id]);
    setSelectedRows([record]);
  };

  // 订单详情
  const handleOrderForm = () => {
    if (!selectedRows[0]) {
      Modal.info({
        title: "请选择用户"
      });
      return;
    }
    window.open(`#/common/order/detail/${selectedRows[0].id}`, "_blank");
  };

  return (
    <div>
      <Card>
        <CityPageForm
          type="order"
          ref={openCityForm}
          queryButton={queryButton}
          resetButton={resetButton}
        />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Button type="primary" onClick={handleOrderForm}>
          订单详情
        </Button>
        <Button type="primary" onClick={handleOpenCity}>
          结束订单
        </Button>
      </Card>
      <Card>
        <Table
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectedRows(selectedRows);
            },
            selectedRowKeys
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                onRowClick(record);
              }
            };
          }}
          columns={columns}
          dataSource={selectDataSource}
          bordered={true}
          pagination={{
            pageSize: 10
          }}
          rowKey={(item) => item.id}
        />
      </Card>
      <Modal
        visible={isVisible}
        title="结束订单"
        okText="确认"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="车辆编号">
            {bikeInfo.bike_sn}
          </Descriptions.Item>
          <Descriptions.Item label="剩余电量">
            {bikeInfo.battery}
          </Descriptions.Item>
          <Descriptions.Item label="行程开始时间">
            {bikeInfo.start_time}
          </Descriptions.Item>
          <Descriptions.Item label="当前位置">
            {bikeInfo.location}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}
