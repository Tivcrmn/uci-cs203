import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import history from "./plugins/history";
import routes from "./plugins/routes";
import logo from "./assets/logo.svg";

const App = () => (
  <div className="Main">
    <Router history={history}>
      <div id="navigation">
        <img src={logo} className="Main-logo" alt="logo"/>
        <ul>
          {routes.filter(v => v.show).map((route, index) => (
            <li key={index}>
              <Link className="link" to={route.path}>
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
