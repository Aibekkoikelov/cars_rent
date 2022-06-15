const {parseTimeToMilliseconds} = require("./parseTimeToMilliseconds");


function sortCarsWithReservationInfo (cars){
    const allCars = {}
     cars.forEach(cars => {
        let carsId =  cars.carid
         !allCars.hasOwnProperty(carsId) ? allCars[carsId] = [cars] :  allCars[carsId] = [...allCars[carsId], cars]
     })
    return Object.values(allCars).map(item =>{
         return getAllDaysInReservation(item)
     })

 }

 function getAllDaysInReservation (car){
     console.log(car)
     const allSumDays = []
     car.forEach(item =>{
        allSumDays.push((parseTimeToMilliseconds(item.enddate) - parseTimeToMilliseconds(item.startdate))/86400000)
     })
     const percent = Math.floor((100/30) * allSumDays.reduce((acum, next)=>{
         return acum + next
     },0))
      return {percent:percent, carID: car[0].carid}
 }


 module.exports = {
     sortCarsWithReservationInfo
 }