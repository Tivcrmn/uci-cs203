import { sha256 } from "@/common/utils";
import conext from "@/middlewares/conext";
import { Base64 } from "js-base64";
import apiResult from "@/common/result";

export const auth = conext(async (req, res, next) => {
  const { header, payload } = req.body;
  const headerBase64 = Base64.encodeURI(JSON.stringify(header));
  const payloadBase64 = Base64.encodeURI(JSON.stringify(payload));
  const sign = sha256(`${headerBase64}.${payloadBase64}`, "your-256-bit-secret");
  const jwt = `${headerBase64}.${payloadBase64}.${sign}`;
  res.setHeader("JWT", jwt);
  return res.send(apiResult({ data: jwt }));
});

export default {
  auth
};
