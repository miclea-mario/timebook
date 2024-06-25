const { Schema, model, Types } = require('mongoose');
const { paginate } = require('express-goodies/mongoose');

/**
 * Vacation details
 */

const name = 'vacation_request';
const schema = new Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    approved_duration: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'identity',
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

/**
 * Schema plugins
 */
schema.plugin(paginate);

/* @see https://mongoosejs.com/docs/populate.html#deep-populate */
schema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'user', options: { _recursed: true } });
  next();
});

module.exports = model(name, schema);
