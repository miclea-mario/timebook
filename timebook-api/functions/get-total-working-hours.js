const axios = require('axios');
const { isWeekend, isWithinInterval, differenceInDays } = require('date-fns');

module.exports = async (fromString, toString, vacationsApproved = 0, hoursPerDay = 8) => {
  const from = new Date(fromString);
  const to = new Date(toString);

  // Getting all bank holidays from 2023
  const { data } = await axios.get(
    `https://zilelibere.webventure.ro/api/${new Date().getFullYear()}`
  );

  // Computing all bank holidays between from and to dates, excluding weekends
  const totalBankHolidays = data.flatMap((holiday) => holiday.date);

  const totalHolidaysWoutWeekendsFiltered = totalBankHolidays
    .filter((freeDay) => {
      const freeDayFormated = new Date(freeDay.date.replaceAll('/', '-'));
      return (
        !isWeekend(freeDayFormated) && isWithinInterval(freeDayFormated, { start: from, end: to })
      );
    })
    .map((freeDay) => new Date(freeDay.date.replaceAll('/', '-')).toISOString().substring(0, 10));

  // Computing all days between from and to dates
  const totalDays = differenceInDays(to, from) + 1; // +1 because differenceInDays does not include the last day (to) in the calculation

  // Computing all weekend days between from and to dates
  let totalWeekendDays = 0;
  for (
    let currentDate = new Date(from);
    currentDate <= to;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    if (isWeekend(currentDate)) {
      totalWeekendDays++;
    }
  }

  // Computing all free days between from and to dates
  const totalFreeDays =
    totalWeekendDays + totalHolidaysWoutWeekendsFiltered.length + vacationsApproved;

  // Computing all working days between from and to dates
  const totalWorkingDays = totalDays - totalFreeDays;

  // Computing all working hours between from and to dates
  const totalWorkingHours = totalWorkingDays * hoursPerDay;

  return {
    totalWorkingDays,
    totalWorkingHours,
    totalBankHolidayDays: totalHolidaysWoutWeekendsFiltered.length,
    bankHolidayDays: totalHolidaysWoutWeekendsFiltered,
  };
};
