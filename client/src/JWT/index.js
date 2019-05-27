import React, { Component } from "react";
import API from "plugins/axios";
import history from "plugins/history";

class JWT extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    let token = localStorage.getItem("jwt");
    if (token) {
      API.post("api-self/v1/jwt_auth", { token })
        .then(res => {
          const response = res.data;
          if (response.success) {
            this.setState({ loading: false });
          } else {
            alert("jwtToken invalid");
            localStorage.removeItem("jwt");
            this.setState({ loading: false });
            history.push("/login", {authType: "JWT"});
          }
        });
    } else {
      history.push({
        pathname: "/login",
        state: {authType: "JWT"},
      });
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>JWT loading....</h1>;
    }
    return <h1>{`${window.location.pathname}`} success....</h1>;
  }
}

export default JWT;
