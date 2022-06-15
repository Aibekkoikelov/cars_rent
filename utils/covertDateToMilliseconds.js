


  function convertDateToMilliseconds (startDate, endDate) {
    const start = Date.parse(startDate)
    const end = Date.parse(endDate)
      return {
        start,
        end
      }
  }

  module.exports = {
    convertDateToMilliseconds
  }