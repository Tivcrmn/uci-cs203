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
      [e.target.name]: e.target.value,
    });
  }

  login() {
    let {userName, password} = this.state;
    const type = this.props.location.state.authType.toLowerCase();
    API.post(`api-self/v1/${type}_login`, {userName, password})
      .then(res => {
        const response = res.data;
        if (response.success) {
          if (type !== "cs") {
            localStorage.setItem(type, res.headers[type]);
          }
          history.push(`/${type}`);
        } else {
          alert(res.data.error);
        }
      });
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
