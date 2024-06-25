const connectToMongo = require('../../functions/connect');
const identities = require('./seeds/001_identities');
const projects = require('./seeds/002_projects.js');
const activities = require('./seeds/003_activities');

const seed = async (params) => {
  // if (process.env.MONGODB_URI.includes('mongodb+srv') && params !== '--force') {
  //   throw new Error("You can't run this seed on a live database");
  // }

  await connectToMongo();

  await identities.seed();
  await projects.seed();
  await activities.seed();
};

(async () => {
  try {
    const params = process.argv;
    await seed(params[2]); // invoke function
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports.seed = seed;
