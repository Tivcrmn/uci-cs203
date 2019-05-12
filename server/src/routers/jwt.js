import { bcompare } from "@/common/utils";
import conext from "@/middlewares/conext";
import apiResult from "@/common/result";
import * as User from "@/middlewares/method";
import jwt from "jsonwebtoken";

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
  const token = jwt.sign(req.body, "your-256-bit-secret");
  // res.setHeader("JWT", jwt);
  return res.send(apiResult({ data: { token } }));
});

export const auth = conext(async (req, res, next) => {
  let { token } = req.body;
  const { userName, password } = jwt.verify(token, "your-256-bit-secret");
  let user = await User.getByUserName(userName);
  if (!user) {
    return res.send(apiResult({ error: "NO_SUCH_USER" }));
  }
  let compare = await bcompare(password, user.password);
  if (!compare) {
    return res.send(apiResult({ error: "WRONG_PASSWORD" }));
  }
  return res.send(apiResult({ data: "token valid" }));
});

export default {
  login,
  auth
};
