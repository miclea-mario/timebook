const { groupBy } = require('lodash');
const formatPersonName = require('../format-person-name');
const totalDurations = require('./total-durations');

module.exports = (activities) => {
  const byUser = groupBy(activities, 'user._id');

  let result = Object.values(byUser).map((userActivities) => {
    const name = formatPersonName(userActivities[0].user);
    const durations = totalDurations(userActivities);

    return {
      name,
      ...durations,
    };
  });
  // for (const userActivities of Object.values(byUser)) {
  //   result.push({
  //     name,
  //     ...durations,
  //   });
  // }

  return result;
};
