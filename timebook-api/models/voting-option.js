const { Schema } = require('mongoose');
const { reference } = require('express-goodies/mongoose');

module.export = new Schema(
  {
    _id: Schema.Types.ObjectId,
    answer: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
    },
    voters: [reference],
  },
  { timestamps: true }
);
