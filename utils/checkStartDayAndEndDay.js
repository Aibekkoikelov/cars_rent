const {checkWeekdays} = require("./checkWeekdays") ;
const {parseTimeToMilliseconds} = require("./parseTimeToMilliseconds") ;


function checkStartDayAndEndDay(startDay, endDay) {
        const startDayNumber = checkWeekdays(parseTimeToMilliseconds(startDay));
        const endDayNumber = checkWeekdays(parseTimeToMilliseconds(endDay));
        if(!startDayNumber && !endDayNumber) {
            return {data: false, message:"Начало и конец аренды должно быть в будние дни"}
        }else if (!startDayNumber && endDayNumber) {
            return {data: false, message:"Начало аренды должно быть в будние дни"};
        }else if (startDayNumber && !endDayNumber) {
            return {data: false, message:"Конец аренды должно быть в будние дни"};
        }else{
            return {data:  true, message:"Аренда возможна"};
        }
}

module.exports = {
    checkStartDayAndEndDay
}