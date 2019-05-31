import React, { Component } from "react";
import API from "plugins/axios";
import { withRouter } from "react-router-dom";

class Token extends Component{
  constructor(props) {
    super(props);
    this.state = {
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
            this.setState({loading: false });
          } else {
            alert("token invalid");
            localStorage.removeItem("token");
            this.setState({ loading: false });
            this.props.history.push("/login", {authType: "Token"});
          }
        });
    } else {
      this.props.history.push("/login", {authType: "Token"});
      this.setState({ loading: false });
    }
  }

  goToRandomAccess() {
    this.props.history.push(`/token/${Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5)}`);
  }

  render() {
    if (this.state.loading) {
      return <h1>Token loading....</h1>;
    }
    return (
      <div>
        <h1>{`${window.location.pathname}`} success....</h1>
        <button className="access" onClick={() => this.goToRandomAccess()}>Access a random resource</button>
      </div>
    );
  }
}

export default withRouter(Token);
