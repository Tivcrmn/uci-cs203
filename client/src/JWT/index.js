import React, { Component } from "react";
import axios from "axios";
import Login from "../Login";

class JWT extends Component{
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      loading: true
    };
  }

  componentWillMount() {
    let token = localStorage.getItem("token");
    if (token) {
      axios.post("http://127.0.0.1:5000/api-self/v1/jwt_auth", { token })
        .then(res => {
          const success = res.data.success;
          this.setState({ success, loading: false });
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
