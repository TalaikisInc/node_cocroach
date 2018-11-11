# Node CocroachDB

## TODO

* user cocroach does not have SELECT privilege on relation posts
* ssl problems under Windows
* Autodeployment

## Install / Prepare

```bash
npm i
chmod +x keygen.sh
./keygen.sh
npm run db:dev
cockroach sql --insecure
```

## Add DB node

```bash
cockroach start --insecure --store=node --listen-addr=localhost:26258 --http-addr=localhost:8081 --join=localhost:26257
```

## Run in development

```bash
npm run start
```

## Deploy

```bash
chmod +x deploy.sh
./deploy.sh
```
