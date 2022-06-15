
const {Pool} = require("pg");


  const  pool = new Pool({
        user: "postgres",
        host: process.env.POSTGRES_HOST,
        database: "cars",
        password: "1234",
        port: +process.env.POSTGRES_PORT,
    })


module.exports = {
    pool
}
