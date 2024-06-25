const { Schema, model, Types } = require('mongoose');
const { paginate } = require('express-goodies/mongoose');
/**
 * Point logs details
 */
const name = 'point_logs';
const schema = new Schema(
  {
    description: {
      type: String,
      required: true,
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
module.exports = model(name, schema);
