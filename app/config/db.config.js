//Config .ENV file

require("dotenv").config()

// const DB_HOST = process.env.DB_HOST
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_NAME = process.env.DB_NAME
// const DB_PORT = process.env.DB_PORT
// const DB_DIALECT = process.env.DB_DIALECT,


// const db = mysql.createPool({
//     connectionLimit: 100,
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_NAME,
//     port: DB_PORT,
//     dialect: DB_DIALECT

// })



// Old connection
module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        max: parseInt(process.env.DB_POOL_MAX),
        min: parseInt(process.env.DB_POOL_MIN),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE),
        idle: parseInt(process.env.DB_POOL_IDLE)
    }
}