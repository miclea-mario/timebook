const durationsByDate = require('./durations-by-date');

module.exports = (activities, monthNumber = new Date().getMonth()) => {
  const filtered = activities.filter((item) => {
    const itemMonth = new Date(item.date)?.getMonth();

    return Number(itemMonth) === Number(monthNumber);
  });

  if (!filtered) {
    return [];
  }

  return durationsByDate(filtered);
};
