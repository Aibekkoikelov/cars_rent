



 function gerRentDays (startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    return days;
}


module.exports = {
    gerRentDays
}