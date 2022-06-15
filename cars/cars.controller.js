const express = require("express");
const router = express.Router()
const carsDb = require("./cars.service")
router.get("/", (req, res) => {
  carsDb.getAllCars(req,res)
})
router.post("/", (req, res) => {
  return  carsDb.createCar(req,res)
})
router.delete("/:id", (req, res) => {
    return carsDb.deleteCar(req,res)
})



module.exports = router