const { Schema } = require('mongoose');
const Identity = require('./identity');

/**
 * Admins are identities who have extended permissions
 */
const name = 'admin';
const schema = new Schema({
  role: {
    type: String,
    default: 'admin',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = Identity.discriminator(name, schema);
