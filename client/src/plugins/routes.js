import React from "react";
import JWT from "../JWT";
import CS from "../CS";
import F0F from "../F0F";
import Token from "../Token";

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <h1>This is the dashboard</h1>,
    show: false
  },
  {
    path: "/jwt",
    main: JWT,
    name: "JSON Web Token",
    show: true
  },
  {
    path: "/cs",
    main: CS,
    name: "Cookie/Session",
    show: true
  },
  {
    path: "/token",
    main: Token,
    name: "Token",
    show: true
  },
  {
    path: "*",
    main: F0F,
    show: false
  }
];

export default routes;
