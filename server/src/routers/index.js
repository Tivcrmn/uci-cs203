import { Router } from "express";
import token from "./token";
import jwt from "./jwt";
import cs from "./cs";

const router = Router();

router.all("*", (req, res, next) => {
  console.log("pass-api-self:", req.url);
  next();
});

router.post("/token_login", token.login);
router.post("/token_auth", token.auth);
router.post("/jwt_login", jwt.login);
router.post("/jwt_auth", jwt.auth);
router.post("/cs_login", cs.login);
router.post("/cs_auth", cs.auth);

export default router;
