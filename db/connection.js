const { Pool } = require("pg")

const ENV = process.env.NODE_ENV || "development"

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` })

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set")
}

const config = {}

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL
  config.max = 2
  config.ssl = {
    rejectUnauthorized: false,
}
}

const pool = new Pool(config)
console.log(`Connected to ${process.env.PGDATABASE || process.env.DATABASE_URL}`)

module.exports = pool;