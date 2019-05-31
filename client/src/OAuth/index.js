import React, {Component} from "react";
import { URL } from "plugins/axios";

class OAuth extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    window.io.on("google", user => {
      this.popup.close();
      this.setState({user});
    });
  }

  openPopup = () => {
    const width = 600, height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);
    const url = `${URL}api-self/v1/auth_google`;

    return window.open(url, "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width},
      height=${height}, top=${top}, left=${left}`
    );
  }

  checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
      }
    }, 1000);
  }

  startAuth = () => {
    this.popup = this.openPopup();
    this.checkPopup();
  }

  render() {
    return (
      <div>
        <button className="google-btn" onClick={this.startAuth}>google +</button>
        {
          this.state.user && this.state.user.userName ? <span>Hello, { this.state.user.userName }. Welcome back!</span> : "You have not login"
        }
      </div>
    );
  }
}

export default OAuth;
