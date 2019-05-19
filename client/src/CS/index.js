import React, { Component } from "react";
import API from "plugins/axios";
import Login from "../Login";

class CS extends Component{
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      loading: true,
    };
  }

  componentWillMount() {
    API.post("api-self/v1/cs_auth")
      .then(res => {
        const response = res.data;
        if (response.success) {
          this.setState({ success: true, loading: false });
        } else {
          alert("cookie invalid");
          this.setState({ loading: false });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>CS loading....</h1>;
    }
    return this.state.success ||
          (this.props.location.state &&
            this.props.location.state.login) ? <h1>{`${window.location.pathname}`} sucess....</h1> : <Login authType={"CS"} />;
  }
}

export default CS;
