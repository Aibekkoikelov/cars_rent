const {pool} = require("../queries");
const {checkStartDayAndEndDay} = require("../utils/checkStartDayAndEndDay");
const {sumAllRentDays} = require("../utils/sumAllRentDAys");
const {parseTimeToMilliseconds} = require("../utils/parseTimeToMilliseconds");
const {sortCarsWithReservationInfo} = require("../utils/sortCarsWithReservationInfo");



 class  ReservationRepository {
     static async getAllReservations(req, res) {
         try{
             pool.query('SELECT * FROM reservation ORDER BY id ASC', (error, results) => {
                 if (error) {
                     throw error
                 }
                 res.status(200).json(results.rows)
             })
         }catch (e){
             return res.status(500).json({message: e.message})
         }
     }
     static async  createReservation(req, res) {
         try{
             const {client_id, car_id, startDate, endDate} = req.body
             const checkDate = await checkStartDayAndEndDay(startDate, endDate)
             const checkFreeDay = await checkCarsOnDate(car_id, startDate, endDate)
             const checkClient = await checkClientReservation(client_id, startDate)

             if (!checkDate.data && !checkFreeDay.data){
                 return  res.status(400).json(checkDate.message + " " + checkFreeDay.message)
             }else if (checkDate.data && !checkFreeDay.data){
                 return res.status(400).json(checkFreeDay.message)
             }
             else if (!checkDate.data && checkFreeDay.data){
                 return res.status(400).json(checkDate.message)
             }
             else if (checkDate.data && checkFreeDay.data){
                 if(!checkClient.data){
                     return  res.status(400).json(checkClient.message)
                 }
                 const rentSum = sumAllRentDays(startDate, endDate)
                 const result = await  pool.query('INSERT INTO reservation (clientId, carId, startDate, endDate) VALUES ($1, $2, $3, $4) RETURNING *', [client_id, car_id, startDate, endDate])
                 res.json({data:result.rows[0], rentSum: rentSum})
             }

         }  catch (e){
             return res.status(500).json({message: e.message})
         }
     }
     static async checkReservation(req, res) {
         const {id} = req.params
         if (id > 5){
           return  res.status(404).join("Нет машины с id "+ id)
         }
         try {
             const response = await  pool.query('SELECT * FROM reservation WHERE carId = $1', [id])
             if (response.rows.length <= 0) {
               return   res.status(200).json(`Car with id ${id} is free`)
             }else{
                 return   res.status(200).json(response.rows)
             }
         } catch (e) {
             return res.status(500).json({message: e.message})
         }
     }
        static async deleteReservation(req, res) {
            const {id} = req.params
            try {
                const result =  await  pool.query('DELETE FROM reservation WHERE id = $1', [id])
                if (result.rowCount === 0) {
                    return  res.status(404).json({message: `Reservation with id ${id} not found`})
                }
                return res.status(200).json({message: "Reservation deleted"})
            } catch (e) {
                return res.status(500).json({message: e.message})
        }}

       static async getAllCarsReservationInfo(req, res) {
           const allCars = await pool.query(`SELECT * FROM reservation ORDER BY id ASC`)

           const allReport =  sortCarsWithReservationInfo(allCars.rows)
           return res.json(allReport)
       }
 }
   const checkCarsOnDate = async (carId, start, end) =>{
    const cars = await pool.query('SELECT * FROM reservation WHERE carId = $1', [carId])
    let startDateCheck;
    let endDateCheck;
    let  startCheck;
    let endCheck;
    if (cars.rows.length <= 0){
        return {data: true, message: "Car is free"}
    }else{

        for(let i = 0; i < cars.rows.length; i++){
            const {startdate, enddate} = cars.rows[i]
            startDateCheck = parseTimeToMilliseconds(startdate)
            endDateCheck = parseTimeToMilliseconds(enddate)
            startCheck = parseTimeToMilliseconds(start)
            endCheck = parseTimeToMilliseconds(end)
            if ( startCheck>= startDateCheck && startCheck <= endDateCheck){
                return {data: false, message: "Нельзя забронировать машину в это время"}
            }else if(endCheck >= startDateCheck && endCheck <= endDateCheck){
                return {data: false, message: "Нельзя забронировать машину в это время"}
            }
        }
        if(startCheck < startDateCheck || startCheck > endDateCheck &&
            endCheck < startDateCheck || endCheck > endDateCheck &&
            (endCheck-startCheck) <= 2592000000){
            return {data: true, message: "Машина свободна"}
        }
        else {
            return {data: false, message: "Нельзя забронировать машину больше 30 дней"}
        }
    }
}
 async function checkClientReservation (clientId, start, end) {
    const clients = await pool.query('SELECT * FROM reservation WHERE clientId = $1', [clientId])
    if (clients.rows.length <= 0){
        return {data: true, message: "Нет резервов на данный авто"}
    }else{
        const getLastReservation = clients.rows[clients.rows.length-1]
        const {enddate} = getLastReservation
        const  endDate = parseTimeToMilliseconds(enddate)
        const  startCheck = parseTimeToMilliseconds(start)
        const different = startCheck - endDate
        if (different < 86400000){
            return {data: false, message: "Должно быть не меньше трех дней между бронированиями"}
        }
        else{
            return  {data: true, message: "Можно забронировать"}
        }
    }
}

 module.exports = ReservationRepository;


