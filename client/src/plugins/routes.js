import React from "react";
import JWT from "../JWT";
import CS from "../CS";
import Token from "../Token";
import OAuth from "../OAuth";
import F0F from "../F0F";
import Login from "../Login";

const routes = [
  {
    path: "/uci-cs203",
    exact: true,
    main: () => <h1>This is the dashboard</h1>,
    show: false,
  },
  {
    path: "/jwt",
    main: JWT,
    name: "JSON Web Token",
    show: true,
  },
  {
    path: "/cs",
    main: CS,
    name: "Cookie/Session",
    show: true,
  },
  {
    path: "/token",
    main: Token,
    name: "Token",
    show: true,
  },
  {
    path: "/oauth",
    main: OAuth,
    show: true,
    name: "OAuth",
  },
  {
    path: "/login",
    main: Login,
    show: false,
  },
  {
    path: "*",
    main: F0F,
    show: false,
  },
];

export default routes;
