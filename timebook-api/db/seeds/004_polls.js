/* eslint-disable no-console */
const { Poll } = require('../../models');
const pollFunc = require('../resources/poll');

exports.seed = async (identities) => {
  try {
    console.log('Planting seeds for polls');
    const polls = await pollFunc(identities);
    await Poll.insertMany(polls);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert polls');
    console.error(err);
  }
};
