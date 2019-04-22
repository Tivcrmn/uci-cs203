import { Router } from "express";
import apiResult from "@/common/result";
import tokenAuth from "./tokenAuth";

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

// user
router.post("/token_login", tokenAuth.login);
router.post("/token_register", tokenAuth.register);

export default router;
