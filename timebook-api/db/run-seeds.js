const seeds = require('./seeds');
const { Identity } = require('../models');

const runSeeds = async () => {
  // Add all collection seeds below
  await seeds.identities.seed();
  const globalIdentities = await Identity.find().limit(15).lean();

  await seeds.polls.seed(globalIdentities);
  await seeds.projects.seed();
  await seeds.activities.seed();
};

module.exports = runSeeds;
