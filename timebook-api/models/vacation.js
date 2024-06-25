const { Schema, model, Types } = require('mongoose');
const { paginate } = require('express-goodies/mongoose');

/**
 * Vacation details
 */

const name = 'vacation';
const schema = new Schema(
  {
    startDate: {
      type: String,
      required: false,
    },
    endDate: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'identity',
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    type: {
      type: String,
      required: true,
      enum: ['annual', 'extra-time', 'vacation', 'bonus'],
      default: 'vacation',
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
