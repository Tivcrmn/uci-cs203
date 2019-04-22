import { merge } from "lodash";
import User from "@/middlewares/model";

export const save = newUser => {
  let user = new User();
  user = merge(user, newUser);
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

export const getById = (id, callback) => User.findOne({ _id: id }, callback);

export const getByUserName = userName => User.findOne({ userName }).exec();
