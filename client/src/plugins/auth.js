import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

class AuthRoute extends Component {
  state = {
    token: []
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const token = res.data;
        this.setState({ token });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    let token = localStorage.getItem("token");
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
};

export default AuthRoute;
