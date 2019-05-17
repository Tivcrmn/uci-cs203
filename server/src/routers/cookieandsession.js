import conext from "@/middlewares/conext";

export const cookiesessionlogin = conext(async (req, res, next) => {
  if (req.session.isFirst || req.cookies.isFirst) {
    return res.send("welcome back!");
  } else {
    req.session.isFirst = 1;
    res.cookie("isFirst", 1, { maxAge: 60 * 1000, singed: true });
    return res.send("welcome for the first time!");
  }
});

export default {
  cookiesessionlogin
};
