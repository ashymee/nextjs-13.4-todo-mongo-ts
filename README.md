# TODO APP

this is todo app using NextJS v13.4 [serverAction], Typescript and MongoDB

### Run MongoDB using docker

pull mongodb images

```bash
docker pull mongodb/mongodb-community-server
```

create container

```bash
docker run \
  -d \
  -n local-mongo \
  -e MONGO_INITDB_ROOT_USERNAME=[username] \
  -e MONGO_INITDB_ROOT_PASSWORD=[password] \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  --restart always \
  mongodb/mongodb-community-server:latest
```

create `.env.local` and use uri below:

```bash
MONGO_URI="mongodb://[username]:[password]@localhost:27017/todos-app"
```

### Run App

use can use `npm` or `yarn` or `pnpm`:

```bash
pnpm dev
```

go to the browser and go to `http://localhost:3000`

---

happy coding
