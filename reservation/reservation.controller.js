const express = require("express");
const router = express.Router()
const reservationDB = require("./reservation.service")
router.get("/", async (req, res) => {
    await  reservationDB.getAllReservations(req,res)
})
router.get("/info", async(req, res) => {
   await  reservationDB.getAllCarsReservationInfo(req,res)
})
router.get("/:id", async (req, res) => {
    await  reservationDB.checkReservation(req,res)
})
router.post("/add", async (req, res) => {
    await reservationDB.createReservation(req,res)
})
router.delete("/delete/:id", async (req, res) => {
    await  reservationDB.deleteReservation(req,res)
})



module.exports = router