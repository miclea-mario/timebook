/* eslint-disable no-console */
const { Activity } = require('../../models');
const activityFunc = require('../resources/activity');

exports.seed = async () => {
  try {
    console.log('Planting seeds for activities');
    const activities = await activityFunc();
    await Activity.insertMany(activities);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert activities');
    console.error(err);
  }
};
