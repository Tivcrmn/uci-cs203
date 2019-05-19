import React, { Component } from "react";
import API from "plugins/axios";
import Login from "../Login";

class JWT extends Component{
  constructor(props) {
    super(props);
    this.state = {
      success: false,
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
            this.setState({ success: true, loading: false });
          } else {
            alert("jwtToken invalid");
            localStorage.removeItem("jwt");
            this.setState({ loading: false });
          }
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>JWT loading....</h1>;
    }
    return this.state.success ||
          (this.props.location.state &&
            this.props.location.state.login) ? <h1>{`${window.location.pathname}`} sucess....</h1> : <Login authType={"JWT"} />;
  }
}

export default JWT;
