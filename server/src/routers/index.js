import { Router } from "express";
import apiResult from "@/common/result";
import tokenAuth from "./tokenAuth";
import jwt from "./jwt";

const router = Router();

router.all("*", (req, res, next) => {
  console.log("pass-api-self:", req.url);
  next();
});

router.get("/ping", (req, res) => {
  res.send(apiResult({
    source: "api-self-server",
    params: req.params,
    method: req.method,
    url: req.url
  }));
});

router.post("/token_login", tokenAuth.login);
router.post("/token_register", tokenAuth.register);
router.post("/jwt_login", jwt.login);
router.post("/jwt_auth", jwt.auth);

export default router;
