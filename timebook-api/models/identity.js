const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { hashPasswords, validate } = require('express-goodies/mongoose');

/**
 * Identities manage login related operations
 */
const name = 'identity';
const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail(value),
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    retries: {
      type: Number,
      default: 0,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
    },
    job: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    hoursPerDay: {
      type: Number,
      default: 8,
    },
    lastLoginAt: {
      type: Date,
    },
    points: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        name: {
          type: String,
          required: true,
        },
        dateEarned: {
          type: Date,
          default: Date.now,
        },
      }
    ],
  },
  { timestamps: true }
);

/**
 * Schema plugins
 */
schema.plugin(hashPasswords);
schema.plugin(validate);

module.exports = model(name, schema);
