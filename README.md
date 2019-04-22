CS203 Web Authentication Project
============

### How to run

#### Server

add default.js in config directory
```javascript
module.exports = {
  port: 5000,
  redis: {
    host: "a.b.c.d",
    port: 6379,
    db: 0
  },
  db: "mongodb://xxx",
  tokenName: "access_token",
  tokenExpireSeconds: 60 * 60 // one hour
};
```

```bash
cd server/

npm run postinstall

npm i

npm run dev
```
