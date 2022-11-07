import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "antd";
import axios from "axios";
import CityPageForm from "../../components/Content/CityPageForm";

export default function CityPage() {
  const [backInfo, setBackInfo] = useState([]);

  useEffect(() => {
    axios.get("/map/bike_list").then((res) => {
      // console.log("res", res);
      setBackInfo(res.data.result);
    });
  }, []);

  // 创建ref发送到子组件拿到子组件dom对象
  const openCityForm = useRef(null);

  // 点击查询按钮
  const queryButton = useCallback(() => {
    openCityForm.current.validateFields().then((res) => {
      console.log("res", res);
    });
  }, []);

  // 点击重置按钮
  const resetButton = useCallback(() => {
    openCityForm.current.resetFields();
  }, []);

  // 初始化地图
  useEffect(() => {
    let map = new window.BMapGL.Map("container"); // 创建地图实例
    let point = new window.BMapGL.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // 绘制服务区
    if (backInfo.service_list) {
      let serviceList = backInfo.service_list.map((item) => {
        return new window.BMapGL.Point(item.lon, item.lat);
      });
      console.log("serviceList", serviceList);
      var polygon = new window.BMapGL.Polygon(serviceList, {
        strokeColor: "red",
        strokeWeight: 2,
        strokeOpacity: 0.5
      });
      map.addOverlay(polygon);
    }

    // 车辆停放点
    if (backInfo.bike_list) {
      var myIcon = new window.BMapGL.Icon(
        "/assets/bike.jpg",
        new window.BMapGL.Size(36, 42),
        {
          // 指定定位位置。
          // 当标注显示在地图上时，其所指向的地理位置距离图标左上
          // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
          // 图标中央下端的尖角位置。
          anchor: new window.BMapGL.Size(18, 42),
          // 设置图片偏移。
          // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
          // 需要指定大图的偏移位置，此做法与css sprites技术类似。
          imageOffset: new window.BMapGL.Size(0, 0) // 设置图片偏移
        }
      );
      // 创建标注对象并添加到地图
      backInfo.bike_list.forEach((item) => {
        let arr = item.split(",");
        let point = new window.BMapGL.Point(arr[0], arr[1]); // 创建点坐标
        var marker = new window.BMapGL.Marker(point, { icon: myIcon });
        map.addOverlay(marker);
      });
    }
  }, [backInfo]);

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
        <div>共100辆车</div>
        <div id="container" style={{ height: 500, marginTop: 20 }}>
          111222
        </div>
      </Card>
    </div>
  );
}
