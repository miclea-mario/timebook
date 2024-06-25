const { Schema, model, Types } = require('mongoose');
const { paginate } = require('express-goodies/mongoose');
/**
 * Productive activities details
 */
const name = 'activity';
const schema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    project: {
      type: Types.ObjectId,
      required: true,
      ref: 'project',
    },
    description: {
      type: String,
    },
    editedBy: {
      type: Types.ObjectId,
      ref: 'identity',
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'identity',
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
  this.populate({ path: 'user editedBy project', options: { _recursed: true } });
  next();
});

module.exports = model(name, schema);
