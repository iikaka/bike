import React, { useEffect, useState, useLayoutEffect } from "react";
import { Card, Table, Modal, Button, message } from "antd";
import axios from "axios";

export default function BasicPage() {
  // 储存取回来的数据状态
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceTwo, setDataSourceTwo] = useState([]);

  // 储存选中的数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 复选框选中的数据
  const [selectedRowKeysTwo, setSelectedRowKeysTwo] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // 点击行时选中的id
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    axios.get("/table/list").then((res) => {
      // console.log("res", res.data.result);
      setDataSource(res.data.result);
      setDataSourceTwo(res.data.result);
    });
  }, []);

  // 单选列表表头配置
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "用户名",
      dataIndex: "userName",
      key: "id"
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "id",
      render(sex) {
        return sex === 1 ? "男" : "女";
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "id",
      render(state) {
        let config = {
          1: "咸鱼一条",
          2: "风华浪子",
          3: "北大才子",
          4: "百度FE",
          5: "创业者"
        };
        return config[state];
      }
    },
    {
      title: "爱好",
      dataIndex: "interest",
      key: "id",
      render(interest) {
        let config = {
          1: "游泳",
          2: "打篮球",
          3: "踢足球",
          4: "跑步",
          5: "骑行",
          6: "桌球",
          7: "麦霸",
          8: "爬山"
        };
        return config[interest];
      }
    },
    {
      title: "生日",
      dataIndex: "birthday",
      key: "id"
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "id"
    },
    {
      title: "早起时间",
      dataIndex: "time",
      key: "id"
    }
  ];

  const onRowClick = (record, index) => {
    // console.log("record", record);
    // console.log("index", index);
    Modal.info({
      title: "信息",
      content: `用户名:${record.userName},用户爱好:${record.interest}`
    });

    // 点击之后改变selectedRowKeys状态选中当前行的单选按钮
    setSelectedRowKeys([record.id]);
  };

  // 删除选中项
  const handleDeleteClick = () => {
    let userItem = selectedRows.map((item) => item.userName);

    // let userId = selectedRows.map((item) => item.id);

    // console.log("selectedRows", selectedRows);
    // console.log("dataSourceTwo", dataSourceTwo);

    Modal.info({
      title: "您确定要删除这些用户吗?",
      content: `用户名:${userItem}`,
      onOk() {
        setDataSourceTwo(
          dataSourceTwo.filter((item) => {
            return !selectedRowKeysTwo.includes(item.id);
          })
        );
        setTimeout(() => {
          setSelectedRows([]);
        }, 0);
        message.success("删除成功");
      }
    });
  };

  // 复选框onRow
  const handleOnRowClick = (record, index) => {
    // console.log("被调用了1");
    setSelectedId([...selectedId, record.id]);
    setSelectedRows([...selectedRows, record]);
  };

  // // 监控selectedId变化
  // useLayoutEffect(() => {
  //   // console.log("被调用了");
  //   setSelectedRowKeysTwo(selectedId);
  // }, [selectedId]);

  return (
    <div>
      <Card title="单选表格">
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered={true}
          pagination={{
            pageSize: 6
          }}
          rowKey={(item) => item.id}
          rowSelection={{
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
              // console.log("selectedRows", selectedRows);
              // console.log("selectedRowKeys", selectedRowKeys);
              setSelectedRowKeys(selectedRowKeys);
            },
            // 将状态传进来，使当前行选中
            selectedRowKeys
          }}
          onRow={(record, index) => {
            return {
              onClick: () => {
                onRowClick(record, index);
              }
            };
          }}
        />
      </Card>
      <Card title="多选表格" style={{ marginTop: 10 }}>
        <Button style={{ marginBottom: 20 }} onClick={handleDeleteClick}>
          删除
        </Button>
        <Table
          columns={columns}
          dataSource={dataSourceTwo}
          bordered={true}
          pagination={{
            pageSize: 6
          }}
          rowKey={(item) => item.id}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log("selectedRows", selectedRows);
              console.log("selectedRowKeys", selectedRowKeys);
              setSelectedRowKeysTwo(selectedRowKeys);

              // 将选中的数据存入状态中
              setSelectedRows(selectedRows);
            },
            // 将状态传进来，使当前行选中
            selectedRowKeys: selectedRowKeysTwo
          }}
          onRow={(record, index) => {
            return {
              onClick: () => {
                handleOnRowClick(record, index);
              }
            };
          }}
        />
      </Card>
    </div>
  );
}
