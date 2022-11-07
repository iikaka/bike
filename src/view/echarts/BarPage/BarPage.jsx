import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import * as echarts from "echarts";

export default function BarPage() {
  // 需要使用ref，因为获取不到DOM对象
  const barRef = useRef(null);

  useEffect(() => {
    var myChart = echarts.init(barRef.current);
    var option;

    option = {
      // 图表的标题
      title: {
        text: "用户骑行订单"
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      // 鼠标划入表格提示信息
      tooltip: {
        trigger: "axis"
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar"
        }
      ]
    };

    option && myChart.setOption(option);

    setTimeout(() => {
      myChart.resize();
    }, 0);

    // 当窗口发生变化的时候触发
    window.onresize = () => {
      // 图表发生变化
      myChart.resize();
    };
  }, []);

  return (
    <div>
      <Card title="柱形图表之一">
        <div ref={barRef} style={{ height: 400 }}></div>
      </Card>
    </div>
  );
}
