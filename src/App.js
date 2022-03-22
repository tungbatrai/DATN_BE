/** @format */

import { ConnectedRouter } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "./component/common/Header";
import NavigationBar from "./component/common/NavigationBar";
import { userConstants } from "./constants/user.constants";
import { routes } from "./routes";
import "./styles/custom.scss";
import configureStore, { history } from "./utils/store";

const store = configureStore();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    var strToken = localStorage.getItem("token");
   if (strToken) {
      var token = JSON.parse(strToken);
    }
    if (token) {
      dispatch({ type: userConstants.LOGIN_SUCCESS, token });
    }
  }, []);

  return (
    <ConnectedRouter history={history}>
      <Header />
      <div id="layoutSidenav">
        <NavigationBar />
        <div id="layoutSidenav_content">
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    </ConnectedRouter>
  );
}

export default App;
