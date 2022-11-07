import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Button, Table, Modal } from "antd";
import axios from "axios";
import moment from "moment";
import CityPageForm from "../../components/Content/CityPageForm";
import OpenCityForm from "../../components/Content/OpenCityForm";

export default function CityPage() {
  const [dataSource, setDataSource] = useState([]);

  // 查询按钮状态
  const [selectDataSource, setSelectDataSource] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    axios.get("/open_city").then((res) => {
      // console.log("res.data.result.item_list", res.data.result.item_list);
      setDataSource(res.data.result.item_list);
      setSelectDataSource(res.data.result.item_list);
    });
  }, []);

  // 创建ref发送到子组件拿到子组件dom对象
  const openCityForm = useRef(null);

  // 模态框Form表单
  const cityModelForm = useRef(null);

  const columns = [
    {
      title: "城市ID",
      dataIndex: "id"
    },
    {
      title: "城市名称",
      dataIndex: "name",
      render(name) {
        const config = {
          1: "北京市",
          2: "天津市",
          3: "深圳市"
        };
        return config[name];
      }
    },
    {
      title: "用车模式",
      dataIndex: "mode",
      render(mode) {
        return mode === 1 ? "指定停车点" : "禁停区";
      }
    },
    {
      title: "运营模式",
      dataIndex: "op_mode",
      render(op_mode) {
        return op_mode === 1 ? "自营" : "加盟";
      }
    },
    {
      title: "授权加盟商",
      dataIndex: "franchisee_name"
    },
    {
      title: "城市管理员",
      dataIndex: "city_admins",
      render(city_admins) {
        return city_admins.map((item) => item.user_name).join(",");
      }
    },
    {
      title: "城市开通时间",
      dataIndex: "open_time",
      render(open_time) {
        return moment(open_time).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    {
      title: "操作时间",
      dataIndex: "update_time",
      render(update_time) {
        return moment(update_time).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    {
      title: "操作人",
      dataIndex: "sys_user_name"
    }
  ];

  // 点击开通城市
  const handleOpenCity = () => {
    setIsVisible(true);
  };

  // 开通城市Modal取消按钮
  const handleCancel = () => {
    setIsVisible(false);
    cityModelForm.current.resetFields();
  };

  // 确认按钮
  const handleOk = () => {
    cityModelForm.current.validateFields().then((res) => {
      // console.log("res", res);
      cityModelForm.current.resetFields();
      setIsVisible(false);
    });
  };

  // 点击查询按钮
  const queryButton = useCallback(() => {
    openCityForm.current.validateFields().then((res) => {
      setSelectDataSource(
        dataSource.filter((item) => {
          if (
            res.name === "all" &&
            res.mode === "all" &&
            res.op_mode === "all"
          ) {
            return true;
          }

          return (
            res.name === item.name &&
            res.mode === item.mode &&
            res.op_mode === item.op_mode
          );
        })
      );
    });
  }, [dataSource]);

  // 点击重置按钮
  const resetButton = useCallback(() => {
    openCityForm.current.resetFields();
  }, []);

  return (
    <div>
      <Card>
        <CityPageForm
          type="city"
          ref={openCityForm}
          queryButton={queryButton}
          resetButton={resetButton}
        />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Button type="primary" onClick={handleOpenCity}>
          开通城市
        </Button>
      </Card>
      <Card>
        <Table
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
        title="开通城市"
        okText="确认"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <OpenCityForm ref={cityModelForm} />
      </Modal>
    </div>
  );
}
