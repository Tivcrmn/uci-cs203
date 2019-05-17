import conext from "@/middlewares/conext";

export const sessionlogin = conext(async (req, res, next) => {
  if (req.session.isFirst) {
    return res.send("welcome back!");
  } else {
    req.session.isFirst = 1;
    return res.send("welcome for the first time!");
  }
});

export default {
  sessionlogin
};
