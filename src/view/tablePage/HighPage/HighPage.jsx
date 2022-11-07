import React, { useEffect, useState } from "react";
import { Card, Table, Modal, Button, Badge } from "antd";
import axios from "axios";

export default function HighPage() {
  // 储存取回来的数据状态
  const [dataSource, setDataSource] = useState([]);
  const [dataSourceTwo, setDataSourceTwo] = useState([]);

  // 储存选中的数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    axios.get("/table/high/list").then((res) => {
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

  // 两侧固定
  const columnsTow = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left"
    },
    {
      title: "用户名",
      dataIndex: "userName",
      key: "id",
      width: 100,
      fixed: "left"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "id",
      width: 100,
      fixed: "left",
      sorter: (a, b) => a.age - b.age
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

        // 这些状态要首字母要小写
        let stateConfig = {
          1: "success",
          2: "error",
          3: "default",
          4: "processing",
          5: "warning"
        };

        return (
          <span>
            <Badge status={stateConfig[state]} />
            {config[state]}
          </span>
        );
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
      key: "id",
      width: 100,
      fixed: "right"
    },
    {
      title: "早起时间",
      dataIndex: "time",
      key: "id",
      width: 100,
      fixed: "right"
    },
    {
      title: "操作",
      render(item) {
        return (
          <Button
            onClick={() => {
              Modal.info({
                title: "您确定要删除这条数据吗?",
                content: `姓名:${item.userName},性别:${
                  item.sex === 1 ? "男" : "女"
                },年龄:${item.age}`,
                onOk() {
                  setDataSourceTwo(
                    dataSourceTwo.filter((data) => {
                      return item.id !== data.id;
                    })
                  );
                }
              });
            }}
          >
            删除
          </Button>
        );
      },
      width: 100,
      fixed: "right"
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
    setSelectedRowKeys([index + 1]);
  };

  return (
    <div>
      <Card title="头部固定">
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{
            y: 500
          }}
          bordered={true}
          pagination={false}
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
      <Card title="左右两侧固定" style={{ marginTop: 10 }}>
        <Table
          columns={columnsTow}
          dataSource={dataSourceTwo}
          scroll={{
            x: 1000
          }}
          bordered={true}
          pagination={false}
          rowKey={(item) => item.id}
        />
      </Card>
    </div>
  );
}
