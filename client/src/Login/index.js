import React, { Component } from "react";
import history from "plugins/history";
import API from "plugins/axios";
import "./index.css";

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
    this.handlInputChange = this.handlInputChange.bind(this);
    this.login = this.login.bind(this);
  }

  handlInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login() {
    let {userName, password} = this.state;
    if (this.props.authType === "JWT") {
      API.post("api-self/v1/jwt_login", {userName, password})
        .then(res => {
          if (res.data.success) {
            localStorage.setItem("jwtToken", res.data.data.token);
            history.push(window.location.pathname, {login: true});
          } else {
            alert(res.data.error);
          }
        });
    } else if (this.props.authType === "CS") {
      API.post("api-self/v1/cs_login",
        {userName, password},
        {withCredentials: true})
        .then(res => {
          // TODO
        });
    } else if (this.props.authType === "Token") {
      API.post("api-self/v1/token_login",
        {userName, password})
        .then(res => {
          if (res.data.success) {
            localStorage.setItem("token", res.data.data.token);
            history.push(window.location.pathname, {login: true});
          } else {
            alert(res.data.error);
          }
        });
    }
  }

  render() {
    return (
      <div className="login-page">
        <p>Web Authentication Demo</p>
        <input type="text" value={this.state.userName} name="userName" onChange={this.handlInputChange}></input>
        <input type="password" value={this.state.password} name="password" onChange={this.handlInputChange}></input>
        <button type="button" onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login;
