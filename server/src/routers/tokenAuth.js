import apiResult from "@/common/result";
import { bhash, bcompare, generateToken } from "@/common/utils";
import { merge, assign } from "lodash";
import * as User from "@/middlewares/method";
import conext from "@/middlewares/conext";
import { setToken } from "@/common/token";

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
  let r = await setToken(token, _user);
  return res.send(apiResult(r ? { data: {
    user: _user,
    token: token
  } } : {
    error: "CREATE_TOKEN_FAIL"
  }));
});

export const register = conext(async (req, res, next) => {
  let { userName, password } = req.body;
  let user = await User.getByUserName(userName);
  if (user) {
    return res.send(apiResult({ error: "USER_EXISTS" }));
  }
  let passhash = await bhash(password);
  let newUser = await User.save(merge(req.body, { password: passhash }));
  return res.send(apiResult({ data: newUser }));
});

export const list = conext(async (req, res) => {
  let users = await User.getByQuery({});
  res.send(apiResult({ data: users }));
});

export default {
  login,
  register
};
