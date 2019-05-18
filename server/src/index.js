import express from "express";
import bodyParser from "body-parser";
import config from "config";
import shelljs from "shelljs";
import cookieParser from "cookie-parser";
import errorHandle from "@/middlewares/errorHandle";
import routers from "@/routers";
import session from "express-session";
import RedisStore from "connect-redis";
import "colors";

const RS = RedisStore(session);

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser(config.sessionSecret));

app.use(session({
  name: config.sessionName,
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new RS({ ...config.redis })
}));

app.enable("trust proxy");

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/api-self/v1/", routers);

app.use(errorHandle);

const port = process.env.PORT || config.port;

shelljs.exec(`npx kill-port ${port}`);

app.listen(port, e => {
  console.log("\nAPI server listening at ".green);
  console.log(("=> http://127.0.0.1:" + port).cyan + "\n");
});
