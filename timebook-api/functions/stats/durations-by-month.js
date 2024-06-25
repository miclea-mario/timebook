const { groupBy } = require('lodash');
const totalDurations = require('./total-durations');

const getMonth = ({ date }) => date.split('-')[1];

module.exports = (activities) => {
  const byMonth = groupBy(activities, getMonth);

  let result = Object.values(byMonth).map((monthActivities) => {
    const name = getMonth(monthActivities[0]);
    const durations = totalDurations(monthActivities);

    return {
      name,
      ...durations,
    };
  });

  return result;
};
