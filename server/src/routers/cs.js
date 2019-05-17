import { bcompare } from "@/common/utils";
import conext from "@/middlewares/conext";
import apiResult from "@/common/result";
import * as User from "@/middlewares/method";
// import { get } from "@/common/token";

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
  req.session.user = req.body;
  return res.send(apiResult({ data: "login success" }));
});

export const auth = conext(async (req, res, next) => {
  if (!req.session.user) return res.send(apiResult({ data: "not valid" }));
  return res.send(apiResult({ data: "token valid" }));
});

export default {
  login,
  auth
};
