import React from "react";
import ReactDOM from "react-dom";
import { URL } from "plugins/axios";
import "./index.css";
import App from "./App";
import io from "socket.io-client";

window.io = io(URL);
ReactDOM.render(<App />, document.getElementById("root"));
