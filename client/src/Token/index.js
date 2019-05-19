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
    let token = localStorage.getItem("token");
    if (token) {
      API.post("api-self/v1/token_auth", { token })
        .then(res => {
          const success = res.data.success;
          if (success) {
            this.setState({ success, loading: false });
          } else {
            alert("token invalid");
            localStorage.removeItem("token");
            this.setState({ loading: false });
          }
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <h1>Token loading....</h1>;
    }
    return this.state.success ||
          (this.props.location.state &&
            this.props.location.state.login) ? <h1>{`${window.location.pathname}`} sucess....</h1> : <Login authType={"Token"} />;
  }
}

export default JWT;
