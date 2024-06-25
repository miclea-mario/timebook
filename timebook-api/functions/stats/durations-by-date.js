const { groupBy } = require('lodash');
const totalDurations = require('./total-durations');

module.exports = (activities) => {
  const byMonth = groupBy(activities, 'date');

  let result = Object.values(byMonth).map((monthActivities) => {
    const name = monthActivities[0].date;
    const durations = totalDurations(monthActivities);

    return {
      name,
      ...durations,
    };
  });

  return result;
};
