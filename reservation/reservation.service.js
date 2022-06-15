
const ReservationRepository = require("./reservation.repository");

const getAllReservations = async (req, res) => {
   await ReservationRepository.getAllReservations(req, res)
}
const createReservation = async (req, res) => {
    await ReservationRepository.createReservation(req, res)
}
const checkReservation = async (req, res)=> {
   await ReservationRepository.checkReservation(req, res)
}
const  deleteReservation =async (req, res)=> {
     await ReservationRepository.deleteReservation(req, res)
    }
const getAllCarsReservationInfo =async (req ,res) => {
    await ReservationRepository.getAllCarsReservationInfo(req, res)
}
module.exports = {
    getAllReservations,
    createReservation,
    deleteReservation,
    checkReservation,
    getAllCarsReservationInfo
}