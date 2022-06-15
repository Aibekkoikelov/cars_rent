const {parseTimeToMilliseconds} = require("./parseTimeToMilliseconds");

function sumAllRentDays (startDay, endDay) {
   const rentDays =(parseTimeToMilliseconds(endDay) - parseTimeToMilliseconds(startDay))/86400000
  let sum = [];
  let allSum = [];
  for (let i = 1; i <= rentDays; i++) {
    sum.push([i]);
  }
  if (sum.length >= 1 && sum.length <= 4) {
    allSum.push(sum.length*1000)
  }else if (sum.length >= 5 && sum.length <= 9) {
    allSum.push((4 * 1000) + (sum.length - 4) * 950)
  }else if (sum.length >= 10 && sum.length <= 17) {
    allSum.push((4 * 1000) + (5 * 950) + (sum.length - 9) * 900)
  }else if (sum.length >= 18 && sum.length <= 29) {
    allSum.push((4 * 1000) + (5 * 950) + (8 * 900) + (sum.length - 17) * 850)
  }

  return allSum[0];
}

module.exports = {sumAllRentDays};