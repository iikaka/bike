import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../../../view/home/Home";
import NoMatch from "../../../view/nomatch/NoMatch";
import BasicPage from "../../../view/tablePage/BasicPage/BasicPage";
import HighPage from "../../../view/tablePage/HighPage/HighPage";
import RichPage from "../../../view/rich/RichPage";
import CityPage from "../../../view/city/CityPage";
import OrderPage from "../../../view/order/OrderPage";
import BikeMapPage from "../../../view/bikeMap/BikeMapPage";
import UserPage from "../../../view/user/UserPage";
import BarPage from "../../../view/echarts/BarPage/BarPage";
import PiePage from "../../../view/echarts/PiePage/PiePage";
import LinePage from "../../../view/echarts/LinePage/LinePage";

export default function NavLiftRouter() {
  // 创建路由表
  const routerList = {
    "/home": Home,
    "/table/basic": BasicPage,
    "/table/high": HighPage,
    "/rich": RichPage,
    "/city": CityPage,
    "/order": OrderPage,
    "/user": UserPage,
    "/bikeMap": BikeMapPage,
    "/charts/bar": BarPage,
    "/charts/pie": PiePage,
    "/charts/line": LinePage
  };

  return (
    <HashRouter>
      <Switch>
        {Object.entries(routerList).map((item) => {
          return (
            <Route path={item[0]} component={item[1]} exact key={item[0]} />
          );
        })}
        <Redirect path="/" to="home" exact />
        <Route path="*" component={NoMatch} />
      </Switch>
    </HashRouter>
  );
}
