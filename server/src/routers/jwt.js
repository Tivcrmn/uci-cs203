import { bcompare } from "@/common/utils";
import conext from "@/middlewares/conext";
import apiResult from "@/common/result";
import * as User from "@/middlewares/method";
import jwt from "jsonwebtoken";
import config from "config";

export const login = conext(async (req, res, next) => {
  let { userName, password } = req.body;
  let user = await User.getByUserName(userName);
  if (!user) {
    return res.send(apiResult({ error: "NO_SUCH_USER" }));
  }
  let compare = await bcompare(password, user.password);
  if (!compare) {
    return res.send(apiResult({ error: "WRONG_PASSWORD" }));
  }
  const expireTime = Math.floor(Date.now() / 1000) + config.expireSeconds;
  const token = jwt.sign({ exp: expireTime, data: req.body }, config.jwtSecret);
  res.setHeader("JWT", token);
  return res.send(apiResult({ data: "login success" }));
});

export const auth = conext(async (req, res, next) => {
  const jwtToken = req.body.token;
  try {
    const decoded = jwt.verify(jwtToken, config.jwtSecret);
    console.log(decoded);
  } catch (err) {
    return res.send(apiResult({ error: err }));
  }
  return res.send(apiResult({ data: "token valid" }));
});

export default {
  login,
  auth,
};
