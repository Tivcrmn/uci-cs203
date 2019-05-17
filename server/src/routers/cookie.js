import conext from "@/middlewares/conext";

export const cookielogin = conext(async (req, res, next) => {
  if (req.signedCookies.isFirst) {
    return res.send("welcome back!");
  } else {
    res.cookie("isFirst", 1, { maxAge: 60 * 1000, signed: true });
    return res.send("welcome for the first time!");
  }
});

export default {
  cookielogin
};
