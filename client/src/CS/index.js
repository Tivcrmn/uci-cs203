import React, { Component } from "react";
import API from "plugins/axios";
import { withRouter } from "react-router-dom";

class CS extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    API.post("api-self/v1/cs_auth")
      .then(res => {
        const response = res.data;
        if (response.success) {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
          this.props.history.push("/login", {authType: "CS"});
        }
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>CS loading....</h1>;
    }
    return <h1>{`${window.location.pathname}`} success....</h1>;
  }
}

export default withRouter(CS);
