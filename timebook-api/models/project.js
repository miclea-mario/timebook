const { Schema, model } = require('mongoose');

/**
 * Project details
 */
const name = 'project';
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
    important: {
      type: Boolean,
    },
    urgent: {
      type: Boolean,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    icon: {
      type: String,
      default: 'fa-solid fa-building-shield',
    },
    design_color: {
      type: String,
      default: '#0F4C81',
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
