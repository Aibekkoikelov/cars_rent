const express = require('express');
const cors = require("cors");
const bodyParser = require("express");
const app = express();
const carsRouter = require("./cars/cars.controller") ;
const reservationRouter = require("./reservation/reservation.controller") ;
const clientRouter = require("./client/client.controller") ;
const swaggerDocument = require('./swagger.json');
const swaggerUi = require("swagger-ui-express");
const PORT = +process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }))
app.use("/cars", carsRouter);
app.use("/reservation", reservationRouter);
app.use("/client", clientRouter);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
})