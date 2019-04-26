module.exports = {
  port: 5000,
  redis: {
    host: "35.236.62.175",
    port: 6379,
    db: 1
  },
  db: "mongodb://user:user123456@ds153709.mlab.com:53709/cs203",
  tokenName: "access_token",
  tokenExpireSeconds: 60 * 60 // one hour
};
