CS203 Web Authentication Project
============

### How to run

### Redis in GCP
1. start the vm
2. open the ssh window
3. run "redis-server" in one window
4. run "redis-cli" in another window
5. type "CONFIG SET protected-mode no" to disable protected-mode

#### Server

```bash
cd server/
npm i
npm run postinstall
npm run dev
```

#### Client

```bash
cd client/
npm i
npm start
```
