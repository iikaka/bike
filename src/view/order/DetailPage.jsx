import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styles from "./DetailPage.module.scss";
import axios from "axios";

export default function DetailPage() {
  const [orderInfo, setOrderInfo] = useState({});

  useEffect(() => {
    axios.get("/order/detail").then((res) => {
      console.log("res", res.data.result);
      setOrderInfo(res.data.result);
    });
  }, []);

  // 初始化地图
  useEffect(() => {
    let map = new window.BMapGL.Map("orderDetailMap"); // 创建地图实例
    let point = new window.BMapGL.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);
    // 地球模式
    // map.setMapType(window.BMAP_EARTH_MAP);
    let scaleCtrl = new window.BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    let zoomCtrl = new window.BMapGL.ZoomControl(); // 添加缩放控件
    map.addControl(zoomCtrl);

    let area = orderInfo.area;

    let setShroud = area?.map((item) => {
      return new window.BMapGL.Point(item.lon, item.lat);
    });

    if (setShroud) {
      // 绘制覆盖物
      let polygon = new window.BMapGL.Polygon(setShroud, {
        strokeColor: "red",
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: "#ff8605",
        fillOpacity: 0.4
      });
      map.addOverlay(polygon);
    }

    // 路径动画

    let position_list = orderInfo.position_list;

    let path = position_list?.map((item) => {
      return new window.BMapGL.Point(item.lon, item.lat);
    });

    if (path) {
      let point = [];
      for (var i = 0; i < path.length; i++) {
        point.push(new window.BMapGL.Point(path[i].lng, path[i].lat));
      }
      let pl = new window.BMapGL.Polyline(point);

      let trackAni = new window.BMapGLLib.TrackAnimation(map, pl, {
        overallView: true, // 动画完成后自动调整视野到总览
        tilt: 30, // 轨迹播放的角度，默认为55
        duration: 2000, // 动画持续时长，默认为10000，单位ms
        delay: 3000 // 动画开始的延迟，默认0，单位ms
      });
      trackAni.start();
      // trackAni.cancel();

      // 起始点位
      let startPoint = new window.BMapGL.Point(path[0].lng, path[0].lat);
      let startIcon = new window.BMapGL.Icon(
        "/assets/start_point.png",
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
      let startmarker = new window.BMapGL.Marker(startPoint, {
        icon: startIcon
      });
      map.addOverlay(startmarker);

      // 结束点位
      let endPoint = new window.BMapGL.Point(
        path[path.length - 1].lng,
        path[path.length - 1].lat
      );

      let endIcon = new window.BMapGL.Icon(
        "/assets/end_point.png",
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
      let endmarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endmarker);
    }
  }, [orderInfo]);

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <span>通用管理系用</span>
          <span className={styles.rightText}>
            <span>欢迎孙京生</span>
            <a className={styles.hrefText} href="#/home">
              退出
            </a>
          </span>
        </div>
      </Card>
      <div className={styles.order_content}>
        <div id="orderDetailMap" className={styles.order_map}></div>
        <div className={styles.order_items}>
          <div className={styles.order_title}>基础信息</div>
          <ul className={styles.item_list}>
            <li>
              <div className={styles.detail_form_left}>用车模式</div>
              <div className={styles.detail_form_content}>
                {orderInfo.mode === 1 ? "服务区" : "停车点"}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>订单编号</div>
              <div className={styles.detail_form_content}>
                {orderInfo.order_sn}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>车辆编号</div>
              <div className={styles.detail_form_content}>
                {orderInfo.bike_sn}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>用户姓名</div>
              <div className={styles.detail_form_content}>
                {orderInfo.user_name}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>手机号码</div>
              <div className={styles.detail_form_content}>
                {orderInfo.mobile}
              </div>
            </li>
          </ul>

          <div className={styles.order_title_border}>行驶轨迹</div>
          <ul className={styles.item_list}>
            <li>
              <div className={styles.detail_form_left}>行程起点</div>
              <div className={styles.detail_form_content}>
                {orderInfo.start_location}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>行程终点</div>
              <div className={styles.detail_form_content}>
                {orderInfo.end_location}
              </div>
            </li>
            <li>
              <div className={styles.detail_form_left}>行驶里程</div>
              <div className={styles.detail_form_content}>
                {orderInfo.distance / 1000}公里
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
