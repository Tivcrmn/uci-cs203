import mongoose from "mongoose";
import config from "config";
import logger from "@/common/logger";
import bluebird from "bluebird";

mongoose.Promise = bluebird;

const options = {
  useMongoClient: true,
  poolSize: 20
};

const Model = schema => {
  /*
  schema.methods.someMethod = () => {
    return some-value
  }
  */
};

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  createTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now }
});

mongoose.connect(config.db, options)
  .then(res => mongoose.connection)
  .catch(err => {
    logger.error("connect to %s error: ", config.db, err.message);
    process.exit(1);
  });

UserSchema.plugin(Model);
UserSchema.index({ userName: 1 }, { unique: true });
mongoose.model("User", UserSchema);

export default mongoose.model("User");
