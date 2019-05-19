import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const token = res.data;
        this.setState({ token, loading: false });
      });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>loading...</div>;
    }
    return (
      <Route
        {...rest}
        render={props =>
          this.state.token.length === 10 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
};

export default AuthRoute;
