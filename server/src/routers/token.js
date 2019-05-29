import apiResult from "@/common/result";
import { bcompare, generateToken } from "@/common/utils";
import { assign } from "lodash";
import * as User from "@/middlewares/method";
import conext from "@/middlewares/conext";
import { setToken, getToken } from "@/common/token";

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
  let token = await generateToken();
  let _user = assign({}, user._doc);
  delete _user.password;
  delete _user.token;
  await setToken(token, _user);
  res.setHeader("Token", token);
  return res.send(apiResult({ data: "login success" }));
});

export const auth = conext(async (req, res, next) => {
  const token = req.body.token;
  let r = await getToken(token);
  return res.send(apiResult(r ? {
    data: "token valid",
  } : {
    error: "token invalid",
  }));
});

export default {
  login,
  auth,
};
