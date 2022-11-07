import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../view/login/LoginPage";
import Admin from "../view/Admin";
import DetailPage from "../view/order/DetailPage";

export default function IndexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/common/order/detail/:id" component={DetailPage} />
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? <Admin /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </HashRouter>
  );
}
