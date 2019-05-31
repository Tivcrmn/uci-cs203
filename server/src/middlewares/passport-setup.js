import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "@/middlewares/model";
import config from "config";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new Strategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: "http://35.236.62.175.xip.io:5000/api-self/v1/auth_google/redirect",
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // console.log("user is: ", currentUser);
        done(null, currentUser);
      } else {
        new User({
          googleId: profile.id,
          userName: profile.displayName,
        }).save().then((newUser) => {
          // console.log("created new user: ", newUser);
          done(null, newUser);
        });
      }
    });
  })
);
