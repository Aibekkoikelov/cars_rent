
const pgTools = require("pgtools");
const {Pool} = require("pg");


 async function createDB (dbName){
    const config = {
        user: "postgres",
        host: "localhost",
        database: "cars",
        password: "1234",
        port: 5432
    };

   await pgTools.createdb(config, dbName, function(err, res) {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
           console.log(res);
    });
    let pool;
          pool = new Pool({
             user: 'postgres',
             host: 'localhost',
             database: dbName,
             password: '1234',
             port: 5432,
         })
        await pool.query('CREATE TABLE cars (id SERIAL PRIMARY KEY, model VARCHAR(255) NOT NULL, registerNumber INT NOT NULL, status BOOLEAN )',

             (error, results) => {
             if (error) {
                 throw error
             }
             return console.log("Table cars created")
         })
        await pool.query('CREATE TABLE client (id SERIAL  PRIMARY KEY ,name TEXT,age INTEGER,phoneNumber INTEGER)',
            (error, results) => {
                     if (error) {
                         throw error
                     }
                     return console.log("Table client created")
         })

        await pool.query('CREATE TABLE reservation (id SERIAL PRIMARY KEY ,clientId INTEGER,carId INTEGER,startDate DATE,endDate DATE,FOREIGN KEY(clientId) REFERENCES client(id),FOREIGN KEY(carId) REFERENCES cars(id))',
                 (error, results) => {
                     if (error) {
                         throw error
                     }
                     return console.log("Table reservation  created")
                 })
}

createDB("test")



