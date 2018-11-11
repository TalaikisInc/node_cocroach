import { Pool, Client } from 'pg'
import fs from 'fs'

const cfg = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  /*ssl: {
    ca: fs.readFileSync('certs/ca.crt').toString(),
    key: fs.readFileSync(`certs/client.${process.env.PGUSER}.key`).toString(),
    cert: fs.readFileSync(`certs/client.${process.env.PGUSER}.crt`).toString()
  }*/
}

const pool = new Pool(cfg)

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const client = new Client(cfg)

export {
  pool,
  client
}
