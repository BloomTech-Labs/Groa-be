require("dotenv").config();

const dbConnection = process.env.DATABASE_URL;

const dbObj = {
  client: "postgresql",
  connection: dbConnection,
  migrations: {
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds"
  },
  pool: {
    min: 2,
    max: 10,
  },

};
// The different DB environment setups
module.exports = {
  development: {
    ...dbObj
  },
  testing: {
    ...dbObj,
    connection: process.env.TESTING_DB_URL,
    pool: {
      // closes hanging database connections populated during testing
      min: 0,
      max: 10,
      idleTimeoutMillis: 500
    },
  },
  production: {
    ...dbObj
  }
};