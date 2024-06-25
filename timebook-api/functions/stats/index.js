const durationsByDate = require('./durations-by-date');
const durationsByMonth = require('./durations-by-month');
const durationsByUser = require('./durations-by-user');
const specificMonth = require('./specific-month');
const totalDurations = require('./total-durations');
const getTotalHoursWorked = require('./get-total-hours-worked');

module.exports = {
  durationsByDate,
  durationsByMonth,
  durationsByUser,
  specificMonth,
  totalDurations,
  getTotalHoursWorked,
};
