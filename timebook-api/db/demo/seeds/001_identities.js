/* eslint-disable no-console */
const { Admin, User } = require('../../../models');
const admin = require('../resources/admin');
const user = require('../resources/user');
exports.seed = async () => {
  try {
    console.log('Planting seeds for identities');
    const admins = await admin();
    const users = await user();

    await Admin.insertMany(admins);
    await User.insertMany(users);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert identities');
    console.error(err);
  }
};
