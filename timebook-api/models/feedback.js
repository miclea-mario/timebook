const { Schema, model, Types } = require('mongoose');

/**
 * Feedback details
 */
const name = 'feedback';
const schema = new Schema(
  {
    type: {
      type: String,
      default: 'bug',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    solved: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'identity',
    },
  },
  { timestamps: true }
);

schema.pre('save', function () {
  this.set({ updatedAt: Date.now() });
});

schema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

module.exports = model(name, schema);
